#!/usr/bin/env node
'use strict';
/**
 * HUMAN-ONLY review command. Records your decision on the draft program.
 *
 *   node scripts/review.js approve <run-id>
 *   node scripts/review.js reject  <run-id> "what to change"
 *
 * In Claude Code, run it yourself with the "!" prefix, or in a separate terminal:
 *   ! node scripts/review.js approve sample-01-beginner-home-fat-loss
 *
 * The approval is bound to the SHA-256 of the exact draft you reviewed. If the draft
 * changes afterwards the approval is void. Claude is blocked from running this
 * script (permissions deny rule + PreToolUse hook).
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const lib = require('./lib/runlib');

const [decision, runId, ...rest] = process.argv.slice(2);
const die = (m) => { console.error(m); process.exit(1); };

if (!['approve', 'reject'].includes(decision) || !runId) {
  die('usage: node scripts/review.js approve <run-id>\n       node scripts/review.js reject <run-id> "feedback"');
}
const state = lib.readState(runId);
if (!state) die(`No state for run "${runId}".`);

const draftRel = lib.STAGES.draft.artifact;
const draftFile = path.join(lib.runDir(runId), draftRel);
if (state.stages.draft.status !== 'done' || !fs.existsSync(draftFile)) {
  die('There is no current draft program to review (draft stage is not "done").');
}
if (!lib.gatesAllPass(state)) die('Quality gates have not all passed; the draft is not ready for review.');

const sha = lib.sha256File(draftFile);
const approvalFile = path.join(lib.runDir(runId), 'approval.json');

if (decision === 'approve') {
  const rec = { decision: 'approved', sha256: sha, approvedAt: lib.now(), approvedBy: os.userInfo().username };
  lib.atomicWrite(approvalFile, JSON.stringify(rec, null, 2) + '\n');
  state.approval = { status: 'approved', sha256: sha, at: rec.approvedAt };
  state.status = 'in_progress';
  lib.log(state, 'draft approved by human');
  lib.saveState(state);
  console.log(`Approved draft ${sha.slice(0, 12)}… for run ${runId}. Tell Claude to continue.`);
} else {
  const feedback = rest.join(' ').trim();
  if (!feedback) die('A rejection needs feedback text.');
  const rec = { decision: 'rejected', sha256: sha, rejectedAt: lib.now(), feedback };
  lib.atomicWrite(approvalFile, JSON.stringify(rec, null, 2) + '\n');
  const fb = path.join(lib.runDir(runId), 'feedback.md');
  const n = fs.existsSync(fb) ? (fs.readFileSync(fb, 'utf8').match(/^## Revision request/gm) || []).length + 1 : 1;
  fs.appendFileSync(fb, `${n === 1 ? '# Reviewer feedback\n\n' : ''}## Revision request ${n} (${rec.rejectedAt})\n\n${feedback}\n\n`);
  state.approval = { status: 'rejected', sha256: sha, at: rec.rejectedAt };
  state.status = 'in_progress';
  lib.log(state, `draft rejected by human (revision request ${n})`);
  lib.saveState(state);
  console.log(`Rejected. Feedback saved to runs/${runId}/feedback.md. Tell Claude to revise.`);
}
