'use strict';
/**
 * Shared helpers for workflow state. Used by scripts/state.js, scripts/review.js
 * and the hooks in .claude/hooks. Node built-ins only (no npm install needed).
 *
 * The workflow state file (runs/<run-id>/workflow-state.json) is the single source
 * of truth for resuming a run. It is written only by this library (via the
 * PostToolUse hook and scripts/state.js), never directly by the model.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..', '..');
const RUNS_DIR = path.join(ROOT, 'runs');
const MAX_RETRIES = 3;

// Execution graph. `needs` drives sequential vs. parallel scheduling:
// every stage whose needs are all satisfied can run in the same parallel wave.
const STAGE_ORDER = [
  'requirements', 'guidelines', 'exercises', 'training',
  'cardio', 'recovery', 'validation', 'draft', 'final',
];
const STAGES = {
  requirements: { agent: 'requirements-formalizer', artifact: 'artifacts/01-requirements.md', needs: [] },
  guidelines: { agent: 'guidelines-researcher', artifact: 'artifacts/02-guidelines.md', needs: ['requirements'] },
  exercises: { agent: 'exercise-selector', artifact: 'artifacts/03-exercise-selection.md', needs: ['requirements'] },
  training: { agent: 'training-planner', artifact: 'artifacts/04-training-plan.md', needs: ['requirements', 'guidelines', 'exercises'] },
  cardio: { agent: 'cardio-planner', artifact: 'artifacts/05-cardio-plan.md', needs: ['requirements', 'guidelines'], optional: true },
  recovery: { agent: 'recovery-planner', artifact: 'artifacts/06-recovery-plan.md', needs: ['requirements', 'guidelines', 'training', 'cardio'] },
  validation: { agent: 'validator', artifact: 'artifacts/07-validation-report.md', needs: ['requirements', 'guidelines', 'exercises', 'training', 'cardio', 'recovery'] },
  draft: { agent: 'program-synthesizer', artifact: 'artifacts/08-draft-program.md', needs: ['validation'] },
  final: { agent: 'markdown-builder', artifact: 'final/training-program.md', needs: ['draft'] },
};

// Quality gates evaluated by the validator. `owners` are the stages that may be
// responsible for a failure; the validator names the exact owners per finding.
const GATES = {
  G1: { name: 'Equipment match', owners: ['exercises', 'training', 'cardio'] },
  G2: { name: 'Schedule fit (days/week, minutes/session)', owners: ['training', 'cardio'] },
  G3: { name: 'Limitations respected', owners: ['exercises', 'training', 'cardio', 'recovery'] },
  G4: { name: 'Muscle coverage and balance', owners: ['exercises', 'training'] },
  G5: { name: 'Progression defined for every phase', owners: ['training', 'cardio'] },
  G6: { name: 'Difficulty fits experience level', owners: ['exercises', 'training', 'cardio'] },
  G7: { name: 'Every recommendation links to a real source', owners: ['guidelines', 'exercises', 'cardio', 'recovery'] },
  G8: { name: 'Internal consistency and variety', owners: ['training', 'cardio', 'recovery'] },
};

const now = () => new Date().toISOString();
const toPosix = (p) => p.split(path.sep).join('/');

function runDir(runId) {
  if (!/^[A-Za-z0-9._-]+$/.test(runId || '')) throw new Error(`Invalid run id: "${runId}"`);
  return path.join(RUNS_DIR, runId);
}
const statePath = (runId) => path.join(runDir(runId), 'workflow-state.json');

function sha256File(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

const sleepSync = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);

/**
 * Write via a temp file + rename. On Windows the rename fails with EPERM/EBUSY/EACCES
 * while another process (an editor, antivirus, a parallel hook) briefly holds the
 * target open, so retry with a short backoff and never leave the temp file behind.
 */
function atomicWrite(file, data) {
  const tmp = `${file}.tmp-${process.pid}`;
  fs.writeFileSync(tmp, data);
  for (let attempt = 1; ; attempt++) {
    try {
      fs.renameSync(tmp, file);
      break;
    } catch (err) {
      if (!['EPERM', 'EBUSY', 'EACCES'].includes(err.code) || attempt >= 10) {
        try { fs.unlinkSync(tmp); } catch { /* already gone */ }
        throw err;
      }
      sleepSync(25 * attempt);
    }
  }
  removeOrphanTemps(file);
}

/** Delete temp files of `file` left by a crashed or killed writer (older than a minute). */
function removeOrphanTemps(file) {
  const dir = path.dirname(file);
  const prefix = `${path.basename(file)}.tmp-`;
  for (const name of fs.readdirSync(dir)) {
    if (!name.startsWith(prefix)) continue;
    const f = path.join(dir, name);
    try {
      if (Date.now() - fs.statSync(f).mtimeMs > 60 * 1000) fs.unlinkSync(f);
    } catch { /* raced with another cleanup */ }
  }
}

function newState(runId) {
  const stages = {};
  for (const k of STAGE_ORDER) {
    stages[k] = { status: 'pending', retries: 0, artifact: STAGES[k].artifact, sha256: null, updatedAt: null };
  }
  const gates = {};
  for (const k of Object.keys(GATES)) gates[k] = { status: 'pending', owners: [], updatedAt: null };
  return {
    runId, createdAt: now(), updatedAt: now(), status: 'in_progress', requirementsConfirmed: false,
    stages, gates, approval: { status: 'pending' }, events: [],
  };
}

function readState(runId) {
  const f = statePath(runId);
  if (!fs.existsSync(f)) return null;
  return JSON.parse(fs.readFileSync(f, 'utf8'));
}

function saveState(state) {
  state.updatedAt = now();
  atomicWrite(statePath(state.runId), JSON.stringify(state, null, 2) + '\n');
}

function initRun(runId) {
  fs.mkdirSync(path.join(runDir(runId), 'artifacts'), { recursive: true });
  fs.mkdirSync(path.join(runDir(runId), 'final'), { recursive: true });
  let s = readState(runId);
  if (!s) {
    s = newState(runId);
    log(s, 'run initialised');
    saveState(s);
  }
  return s;
}

function log(state, msg) {
  state.events.push({ at: now(), msg });
  if (state.events.length > 200) state.events.shift();
}

function downstream(stage) {
  const out = new Set();
  let changed = true;
  while (changed) {
    changed = false;
    for (const [k, v] of Object.entries(STAGES)) {
      if (!out.has(k) && v.needs.some((n) => n === stage || out.has(n))) {
        out.add(k);
        changed = true;
      }
    }
  }
  return [...out];
}

const satisfied = (st) => st.status === 'done' || st.status === 'skipped';

function resetGates(state) {
  for (const g of Object.values(state.gates)) {
    g.status = 'pending';
    g.owners = [];
    g.updatedAt = now();
  }
}

/** Mark everything that depends on `stage` as stale; invalidate gates and approval. */
function invalidateDownstream(state, stage) {
  for (const d of downstream(stage)) {
    const st = state.stages[d];
    if (st.status === 'done') {
      st.status = 'stale';
      log(state, `${d} marked stale (upstream "${stage}" changed)`);
    }
  }
  // Gates describe the content artifacts, so only a change upstream of validation resets them.
  if (STAGES.validation.needs.includes(stage)) resetGates(state);
  if (stage !== 'final') state.approval = { status: 'pending' };
}

function stageForArtifact(rel) {
  rel = toPosix(rel);
  return Object.keys(STAGES).find((k) => STAGES[k].artifact === rel) || null;
}

/** Called by the PostToolUse hook after an artifact file is written. */
function recordArtifact(runId, rel) {
  const stage = stageForArtifact(rel);
  if (!stage) return null;
  const state = readState(runId) || initRun(runId);
  const st = state.stages[stage];
  st.status = 'done';
  st.sha256 = sha256File(path.join(runDir(runId), rel));
  st.updatedAt = now();
  log(state, `${stage} artifact written`);
  invalidateDownstream(state, stage);
  if (stage === 'requirements') state.requirementsConfirmed = false; // changed requirements must be re-confirmed
  if (stage === 'final') {
    state.status = 'completed';
    log(state, 'run completed');
  }
  saveState(state);
  return stage;
}

function gatesAllPass(state) {
  return Object.values(state.gates).every((g) => g.status === 'pass');
}

/** Deterministic approval check: approval.json must say "approved" for the *current* draft hash. */
function approvalStatus(runId) {
  const f = path.join(runDir(runId), 'approval.json');
  if (!fs.existsSync(f)) return { valid: false, reason: 'no approval recorded' };
  let a;
  try { a = JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return { valid: false, reason: 'approval.json unreadable' }; }
  if (a.decision !== 'approved') return { valid: false, reason: `latest decision is "${a.decision}"`, decision: a.decision };
  const draft = path.join(runDir(runId), STAGES.draft.artifact);
  if (!fs.existsSync(draft)) return { valid: false, reason: 'draft program is missing' };
  if (sha256File(draft) !== a.sha256) return { valid: false, reason: 'draft changed after it was approved' };
  return { valid: true, approval: a };
}

function ready(state) {
  const out = [];
  for (const k of STAGE_ORDER) {
    const st = state.stages[k];
    if (st.status !== 'pending' && st.status !== 'stale') continue;
    if (!STAGES[k].needs.every((n) => satisfied(state.stages[n]))) continue;
    if (k !== 'requirements' && !state.requirementsConfirmed) continue; // user must confirm requirements first
    if (k === 'draft' && !gatesAllPass(state)) continue;
    if (k === 'final' && !approvalStatus(state.runId).valid) continue;
    out.push(k);
  }
  return out;
}

/** Retry accounting with a hard limit. Returns {ok:false} once the limit is exceeded. */
function retry(state, stage) {
  const st = state.stages[stage];
  st.retries += 1;
  if (st.retries > MAX_RETRIES) {
    st.status = 'failed';
    for (const d of downstream(stage)) {
      if (state.stages[d].status !== 'skipped') state.stages[d].status = 'blocked';
    }
    state.status = 'stopped';
    log(state, `${stage} exceeded retry limit (${MAX_RETRIES}); dependent work blocked`);
    return { ok: false, retries: st.retries };
  }
  st.status = 'stale';
  invalidateDownstream(state, stage);
  log(state, `${stage} retry ${st.retries}/${MAX_RETRIES}`);
  return { ok: true, retries: st.retries };
}

/**
 * Safety net for artifact writes that bypassed the Write/Edit hooks (e.g. a shell command).
 * Called after every Bash call: an artifact written or changed since it was last recorded is
 * recorded now, exactly as the PostToolUse write hook would have done (done + downstream stale).
 * An artifact is only picked up if it changed after the run was created, so files that
 * were already on disk at init do not complete a stage on their own. Returns the stages synced.
 */
function syncArtifacts(runId) {
  const state = readState(runId);
  if (!state) return [];
  const created = Date.parse(state.createdAt) || 0;
  const synced = [];
  for (const k of STAGE_ORDER) {
    const st = state.stages[k];
    if (st.status === 'skipped') continue;
    const f = path.join(runDir(runId), STAGES[k].artifact);
    if (!fs.existsSync(f)) continue;
    if (st.sha256 ? sha256File(f) === st.sha256 : fs.statSync(f).mtimeMs <= created) continue;
    recordArtifact(runId, STAGES[k].artifact);
    synced.push(k);
  }
  return synced;
}

/** Make a run resumable: reset interrupted work, detect artifacts changed on disk. */
function reconcile(state) {
  const notes = [];
  for (const k of STAGE_ORDER) {
    const st = state.stages[k];
    if (st.status === 'in_progress') {
      st.status = 'pending';
      notes.push(`${k}: was interrupted, reset to pending`);
    }
    if (st.status === 'done') {
      const f = path.join(runDir(state.runId), st.artifact);
      if (!fs.existsSync(f)) {
        st.status = 'stale';
        notes.push(`${k}: artifact missing, marked stale`);
        invalidateDownstream(state, k);
      } else if (sha256File(f) !== st.sha256) {
        st.status = 'stale';
        notes.push(`${k}: artifact changed outside the workflow, marked stale`);
        invalidateDownstream(state, k);
      }
    }
  }
  if (state.status === 'stopped' && !Object.values(state.stages).some((s) => s.status === 'failed')) {
    state.status = 'in_progress';
  }
  return notes;
}

module.exports = {
  ROOT, RUNS_DIR, MAX_RETRIES, STAGES, STAGE_ORDER, GATES,
  runDir, statePath, readState, saveState, initRun, newState, log, now, toPosix,
  sha256File, atomicWrite, downstream, satisfied, resetGates, invalidateDownstream,
  stageForArtifact, recordArtifact, syncArtifacts, gatesAllPass, approvalStatus, ready, retry, reconcile,
};
