#!/usr/bin/env node
'use strict';
/**
 * Workflow state CLI used by the coordinator (and by humans for inspection).
 *
 *   node scripts/state.js init <run-id>
 *   node scripts/state.js show <run-id> [--events]
 *   node scripts/state.js ready <run-id>              stages runnable right now (one parallel wave)
 *   node scripts/state.js resume <run-id>             reconcile after an interruption + print the plan
 *   node scripts/state.js stage <run-id> <stage> <pending|in_progress|done|stale>
 *   node scripts/state.js skip <run-id> <stage> "<reason>"
 *   node scripts/state.js gate <run-id> <G1..G8> <pass|fail> [owner,owner]
 *   node scripts/state.js retry <run-id> <stage>      count a retry; exit 3 when the limit is exceeded
 *   node scripts/state.js reset <run-id> <stage>      human override: clear a failed stage
 *   node scripts/state.js confirm <run-id>            record that the USER confirmed the requirements
 *   node scripts/state.js approval <run-id>           deterministic approval verdict
 *   node scripts/state.js run-status <run-id> <in_progress|awaiting_approval|stopped|completed> ["reason"]
 *   node scripts/state.js list
 */
const fs = require('fs');
const lib = require('./lib/runlib');

const [cmd, runId, a3, a4, a5] = process.argv.slice(2);
const die = (msg, code = 1) => { console.error(msg); process.exit(code); };
const need = (s) => { if (!s) die(`No state for run "${runId}". Run: node scripts/state.js init ${runId}`); return s; };

function summary(s) {
  const lines = [`Run: ${s.runId}   status: ${s.status}   updated: ${s.updatedAt}`, ''];
  for (const k of lib.STAGE_ORDER) {
    const st = s.stages[k];
    lines.push(`  ${k.padEnd(13)} ${st.status.padEnd(12)} retries ${st.retries}/${lib.MAX_RETRIES}  ${lib.STAGES[k].agent}`);
  }
  lines.push('', '  Gates: ' + Object.entries(s.gates).map(([k, g]) => `${k}=${g.status}`).join(' '));
  lines.push(`  Requirements confirmed by user: ${s.requirementsConfirmed ? 'yes' : 'no'}`);
  lines.push(`  Approval: ${s.approval.status}`);
  return lines.join('\n');
}

switch (cmd) {
  case 'init': {
    if (!runId) die('usage: init <run-id>');
    const s = lib.initRun(runId);
    console.log(summary(s));
    break;
  }
  case 'show': {
    const s = need(lib.readState(runId));
    console.log(summary(s));
    if (a3 === '--events') console.log('\n' + s.events.map((e) => `${e.at}  ${e.msg}`).join('\n'));
    break;
  }
  case 'ready': {
    const s = need(lib.readState(runId));
    const r = lib.ready(s);
    console.log(r.length ? r.map((k) => `${k} -> ${lib.STAGES[k].agent}`).join('\n') : '(nothing ready)');
    break;
  }
  case 'resume': {
    const s = need(lib.readState(runId));
    const notes = lib.reconcile(s);
    lib.log(s, 'resume requested');
    lib.saveState(s);
    console.log(summary(s));
    if (notes.length) console.log('\nReconciliation:\n' + notes.map((n) => '  - ' + n).join('\n'));
    const blocked = lib.STAGE_ORDER.filter((k) => ['failed', 'blocked'].includes(s.stages[k].status));
    if (blocked.length) console.log('\nFailed/blocked (needs a human decision): ' + blocked.join(', '));
    if (!s.requirementsConfirmed && s.stages.requirements.status === 'done') console.log('\nRequirements are written but NOT confirmed by the user yet: ask the user to confirm them.');
    const r = lib.ready(s);
    console.log('\nNext parallel wave: ' + (r.length ? r.join(', ') : '(none; check approval or gates)'));
    break;
  }
  case 'stage': {
    const s = need(lib.readState(runId));
    if (!lib.STAGES[a3]) die(`unknown stage "${a3}"`);
    if (!['pending', 'in_progress', 'done', 'stale'].includes(a4)) die('status must be pending|in_progress|done|stale');
    s.stages[a3].status = a4;
    lib.log(s, `${a3} -> ${a4}`);
    lib.saveState(s);
    console.log(`${a3}: ${a4}`);
    break;
  }
  case 'skip': {
    const s = need(lib.readState(runId));
    if (!lib.STAGES[a3]) die(`unknown stage "${a3}"`);
    if (!lib.STAGES[a3].optional) die(`stage "${a3}" is not optional and cannot be skipped`);
    s.stages[a3].status = 'skipped';
    s.stages[a3].reason = a4 || '';
    lib.log(s, `${a3} skipped: ${a4 || ''}`);
    lib.saveState(s);
    console.log(`${a3}: skipped`);
    break;
  }
  case 'gate': {
    const s = need(lib.readState(runId));
    if (!lib.GATES[a3]) die(`unknown gate "${a3}" (expected one of ${Object.keys(lib.GATES).join(', ')})`);
    if (!['pass', 'fail'].includes(a4)) die('result must be pass|fail');
    s.gates[a3] = { status: a4, owners: a5 ? a5.split(',') : [], updatedAt: lib.now() };
    lib.log(s, `gate ${a3} ${a4}${a5 ? ' owners=' + a5 : ''}`);
    lib.saveState(s);
    console.log(`${a3} (${lib.GATES[a3].name}): ${a4}`);
    break;
  }
  case 'retry': {
    const s = need(lib.readState(runId));
    if (!lib.STAGES[a3]) die(`unknown stage "${a3}"`);
    const r = lib.retry(s, a3);
    lib.saveState(s);
    if (!r.ok) die(`RETRY LIMIT REACHED for ${a3} (${r.retries - 1}/${lib.MAX_RETRIES} used). Stage failed; dependent stages blocked. Stop and report to the user.`, 3);
    console.log(`${a3}: retry ${r.retries}/${lib.MAX_RETRIES}; ${a3} and its downstream stages are now stale`);
    break;
  }
  case 'reset': {
    const s = need(lib.readState(runId));
    if (!lib.STAGES[a3]) die(`unknown stage "${a3}"`);
    s.stages[a3].status = 'stale';
    s.stages[a3].retries = 0;
    for (const d of lib.downstream(a3)) if (s.stages[d].status === 'blocked') s.stages[d].status = 'pending';
    if (s.status === 'stopped') s.status = 'in_progress';
    lib.log(s, `${a3} reset by operator`);
    lib.saveState(s);
    console.log(`${a3}: reset`);
    break;
  }
  case 'confirm': {
    const s = need(lib.readState(runId));
    if (s.stages.requirements.status !== 'done') die('Requirements are not written yet; nothing to confirm.');
    s.requirementsConfirmed = true;
    lib.log(s, 'requirements confirmed by user');
    lib.saveState(s);
    console.log('requirements confirmed');
    break;
  }
  case 'approval': {
    need(lib.readState(runId));
    const a = lib.approvalStatus(runId);
    console.log(a.valid ? `APPROVED (sha256 ${a.approval.sha256.slice(0, 12)}…, ${a.approval.approvedAt})` : `NOT APPROVED: ${a.reason}`);
    if (a.decision === 'rejected') {
      const fb = `${lib.runDir(runId)}/feedback.md`;
      if (fs.existsSync(fb)) console.log(`Feedback is in runs/${runId}/feedback.md`);
    }
    process.exit(a.valid ? 0 : 4);
    break;
  }
  case 'run-status': {
    const s = need(lib.readState(runId));
    if (!['in_progress', 'awaiting_approval', 'stopped', 'completed'].includes(a3)) die('invalid run status');
    s.status = a3;
    lib.log(s, `run status -> ${a3}${a4 ? ': ' + a4 : ''}`);
    lib.saveState(s);
    console.log(`run status: ${a3}`);
    break;
  }
  case 'list': {
    if (!fs.existsSync(lib.RUNS_DIR)) { console.log('(no runs)'); break; }
    for (const d of fs.readdirSync(lib.RUNS_DIR)) {
      const s = lib.readState(d);
      if (s) console.log(`${d.padEnd(46)} ${s.status}`);
    }
    break;
  }
  default:
    die('usage: node scripts/state.js <init|show|ready|resume|stage|skip|gate|retry|reset|confirm|approval|run-status|list> <run-id> ...');
}
