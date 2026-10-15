#!/usr/bin/env node
'use strict';
/**
 * Offline self-test for the workflow machinery (state, retries, resume, hooks, approval).
 * No Claude, no network, no MCP servers needed:  node scripts/selftest.js
 */
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const lib = require('./lib/runlib');

const ROOT = lib.ROOT;
const RUN = `selftest-${Date.now()}`;
const RUN2 = `${RUN}-sync`;
let failures = 0;
const check = (name, cond, extra = '') => {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${cond ? '' : '  ' + extra}`);
  if (!cond) failures++;
};

function hook(script, payload) {
  const r = spawnSync('node', [path.join(ROOT, '.claude/hooks', script)], {
    input: JSON.stringify({ cwd: ROOT, ...payload }), encoding: 'utf8',
  });
  return { code: r.status, err: r.stderr };
}
const cli = (...a) => spawnSync('node', [path.join(ROOT, 'scripts/state.js'), ...a], { encoding: 'utf8' });
const review = (...a) => spawnSync('node', [path.join(ROOT, 'scripts/review.js'), ...a], { encoding: 'utf8' });
const rp = (rel) => path.join(ROOT, 'runs', RUN, rel);
const write = (rel, text) => { fs.mkdirSync(path.dirname(rp(rel)), { recursive: true }); fs.writeFileSync(rp(rel), text); };
const recordViaHook = (rel) => hook('post-write-state.js', { tool_name: 'Write', tool_input: { file_path: rp(rel) } });

try {
  lib.initRun(RUN);

  // --- state machine & parallel scheduling
  check('only requirements is ready at start', lib.ready(lib.readState(RUN)).join() === 'requirements');
  write('artifacts/01-requirements.md', 'req v1');
  check('PostToolUse hook exits 0', recordViaHook('artifacts/01-requirements.md').code === 0);
  check('nothing runs before the user confirms requirements', lib.ready(lib.readState(RUN)).length === 0);
  cli('confirm', RUN);
  check('guidelines + exercises become ready together (parallel wave)',
    lib.ready(lib.readState(RUN)).join() === 'guidelines,exercises');
  check('hook recorded sha256', !!lib.readState(RUN).stages.requirements.sha256);

  // --- optional stage skipping
  cli('skip', RUN, 'cardio', 'strength-only');
  check('required stages cannot be skipped', cli('skip', RUN, 'training', 'x').status !== 0);

  // --- run through to validation
  for (const [rel] of [['artifacts/02-guidelines.md'], ['artifacts/03-exercise-selection.md'], ['artifacts/04-training-plan.md'],
    ['artifacts/06-recovery-plan.md'], ['artifacts/07-validation-report.md']]) {
    write(rel, 'x'); recordViaHook(rel);
  }
  check('draft not ready while gates are pending', !lib.ready(lib.readState(RUN)).includes('draft'));
  for (const g of Object.keys(lib.GATES)) cli('gate', RUN, g, 'pass');
  check('draft ready once all gates pass', lib.ready(lib.readState(RUN)).join() === 'draft');
  write('artifacts/08-draft-program.md', '# Draft\nSquat 3x8'); recordViaHook('artifacts/08-draft-program.md');

  // --- approval gate (PreToolUse)
  const finalPath = rp('final/training-program.md');
  const finalWrite = { tool_name: 'Write', tool_input: { file_path: finalPath, content: '# Program' } };
  check('final write BLOCKED without approval', hook('approval-gate-guard.js', finalWrite).code === 2);
  check('Claude cannot run review.js', hook('approval-gate-guard.js',
    { tool_name: 'Bash', tool_input: { command: `node scripts/review.js approve ${RUN}` } }).code === 2);
  check('Claude cannot write approval.json', hook('approval-gate-guard.js',
    { tool_name: 'Write', tool_input: { file_path: rp('approval.json'), content: '{}' } }).code === 2);
  check('Claude cannot write the state file', hook('approval-gate-guard.js',
    { tool_name: 'Write', tool_input: { file_path: rp('workflow-state.json'), content: '{}' } }).code === 2);
  check('shell write into final/ BLOCKED without approval', hook('approval-gate-guard.js',
    { tool_name: 'Bash', tool_input: { command: `echo hi > runs/${RUN}/final/training-program.md` } }).code === 2);
  check('reading approval via shell is allowed', hook('approval-gate-guard.js',
    { tool_name: 'Bash', tool_input: { command: `cat runs/${RUN}/approval.json` } }).code === 0);

  // --- artifacts are written only with Write/Edit (shell writes would bypass the state hook)
  const bash = (command) => hook('approval-gate-guard.js', { tool_name: 'Bash', tool_input: { command } }).code;
  const art = `runs/${RUN}/artifacts/05-cardio-plan.md`;
  const winArt = `C:\\repo\\runs\\${RUN}\\artifacts\\05-cardio-plan.md`;
  for (const [what, command] of [
    ['sed -i', `sed -i 's/half knee bends/wall march/' ${art}`],
    ['sed --in-place', `sed --in-place -e 's/a/b/' "${art}"`],
    ['perl -pi', `perl -pi -e 's/a/b/' ${art}`],
    ['redirect', `echo x > ${art}`],
    ['append', `printf 'x' >> ${art}`],
    ['tee', `cat /tmp/new.md | tee ${art}`],
    ['cp onto artifact', `cp /tmp/new.md ${art}`],
    ['mv', `mv ${art} /tmp/old.md`],
    ['rm', `rm -f ${art}`],
    ['inline script', `node -e "require('fs').writeFileSync('${art}', 'x')"`],
    ['Windows path', `sed -i 's/a/b/' ${winArt}`],
    ['after &&', `cd /tmp && echo x > ${art}`],
  ]) check(`shell artifact write BLOCKED (${what})`, bash(command) === 2);
  for (const [what, command] of [
    ['cat', `cat ${art}`],
    ['sed -n', `sed -n '/## Progression/,/^## /p' ${art}`],
    ['artifact check', `node .claude/skills/artifact-validator/scripts/check-artifact.js ${art}; echo "exit $?"`],
    ['grep to a temp file', `grep -n Monday ${art} > /tmp/monday.txt 2>&1`],
    ['cp out of artifacts', `cp ${art} /tmp/copy.md`],
  ]) check(`shell artifact read allowed (${what})`, bash(command) === 0);

  // --- human approval, hash-bound
  check('rejection requires feedback', review('reject', RUN).status !== 0);
  check('human rejection recorded', review('reject', RUN, 'swap the lunges').status === 0);
  check('final still blocked after rejection', hook('approval-gate-guard.js', finalWrite).code === 2);
  check('human approval recorded', review('approve', RUN).status === 0);
  check('final write ALLOWED after approval', hook('approval-gate-guard.js', finalWrite).code === 0);
  check('shell write into final/ BLOCKED even after approval', hook('approval-gate-guard.js',
    { tool_name: 'Bash', tool_input: { command: `cp /tmp/p.md runs/${RUN}/final/training-program.md` } }).code === 2);

  // --- draft changes after approval -> approval void
  write('artifacts/08-draft-program.md', '# Draft\nSquat 5x5'); recordViaHook('artifacts/08-draft-program.md');
  check('approval voided when draft changes', hook('approval-gate-guard.js', finalWrite).code === 2);
  review('approve', RUN);

  // --- no-leak guard
  const leaky = { tool_name: 'Write', tool_input: { file_path: finalPath, content: 'See 03-exercise-selection.md written by exercise-selector (G4 passed)' } };
  const clean = { tool_name: 'Write', tool_input: { file_path: finalPath, content: '# Your 8-week program\nSquat 3 x 8. Source: https://www.who.int/' } };
  check('no-leak guard blocks internal names', hook('no-leak-guard.js', leaky).code === 2);
  check('no-leak guard passes clean content', hook('no-leak-guard.js', clean).code === 0);
  check('no-leak guard ignores non-final files', hook('no-leak-guard.js',
    { tool_name: 'Write', tool_input: { file_path: rp('artifacts/03-exercise-selection.md'), content: 'exercise-selector' } }).code === 0);

  // --- targeted retry: rewriting an upstream artifact makes downstream stale
  write('artifacts/03-exercise-selection.md', 'exercises v2'); recordViaHook('artifacts/03-exercise-selection.md');
  let s = lib.readState(RUN);
  check('upstream rewrite -> training/recovery/validation/draft stale',
    ['training', 'recovery', 'validation', 'draft'].every((k) => s.stages[k].status === 'stale'));
  check('upstream rewrite leaves independent stages done',
    s.stages.requirements.status === 'done' && s.stages.guidelines.status === 'done');
  check('gates reset and approval voided by upstream rewrite',
    Object.values(s.gates).every((g) => g.status === 'pending') && s.approval.status === 'pending');

  // --- retry limit
  let last;
  for (let i = 1; i <= 4; i++) last = cli('retry', RUN, 'training');
  s = lib.readState(RUN);
  check('4th retry exceeds the limit (exit 3)', last.status === 3);
  check('failed stage stops dependents', s.stages.training.status === 'failed' && s.stages.recovery.status === 'blocked'
    && s.stages.final.status === 'blocked' && s.status === 'stopped');

  // --- resume after interruption
  cli('reset', RUN, 'training');
  cli('stage', RUN, 'training', 'in_progress');
  write('artifacts/01-requirements.md', 'edited outside the workflow');
  cli('confirm', RUN);
  const r = cli('resume', RUN);
  s = lib.readState(RUN);
  check('resume resets interrupted stage to pending', /interrupted/.test(r.stdout));
  check('resume detects out-of-band artifact edit', s.stages.requirements.status === 'stale');
  check('resume reports next wave', /Next parallel wave: requirements/.test(r.stdout));
  recordViaHook('artifacts/01-requirements.md');
  check('rewritten requirements must be re-confirmed', lib.readState(RUN).requirementsConfirmed === false);

  // --- safety net: artifacts written by a shell command the guard did not catch
  const sleep = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
  const rp2 = (rel) => path.join(ROOT, 'runs', RUN2, rel);
  const sync = (command) => hook('post-bash-sync.js', { tool_name: 'Bash', tool_input: { command } });
  fs.mkdirSync(rp2('artifacts'), { recursive: true });
  fs.writeFileSync(rp2('artifacts/01-requirements.md'), 'left over from before the run');
  const past = new Date(Date.now() - 60 * 60 * 1000);
  fs.utimesSync(rp2('artifacts/01-requirements.md'), past, past);
  lib.initRun(RUN2);
  sleep(30);
  check('bash sync exits 0', sync(`ls runs/${RUN2}`).code === 0);
  check('bash sync ignores artifacts that predate the run', lib.readState(RUN2).stages.requirements.status === 'pending');
  fs.writeFileSync(rp2('artifacts/01-requirements.md'), 'req via shell');
  sync(`cd runs/${RUN2}/artifacts && ./write-req.sh`);
  let s2 = lib.readState(RUN2);
  check('bash sync records a shell-written artifact',
    s2.stages.requirements.status === 'done' && s2.stages.requirements.sha256 === lib.sha256File(rp2('artifacts/01-requirements.md')));
  fs.writeFileSync(rp2('artifacts/02-guidelines.md'), 'g'); hook('post-write-state.js', { tool_name: 'Write', tool_input: { file_path: rp2('artifacts/02-guidelines.md') } });
  fs.writeFileSync(rp2('artifacts/01-requirements.md'), 'req edited by a human');
  sync('ls runs');
  check('bash sync leaves runs the command does not name', lib.readState(RUN2).stages.guidelines.status === 'done');
  const r2 = cli('resume', RUN2);
  check('human out-of-band edit still reported by resume', /changed outside the workflow/.test(r2.stdout));
  fs.writeFileSync(rp2('artifacts/01-requirements.md'), 'req v3 via shell');
  const cwdSync = hook('post-bash-sync.js', { cwd: rp2('artifacts'), tool_name: 'Bash', tool_input: { command: './fix.sh' } });
  s2 = lib.readState(RUN2);
  check('bash sync picks up the run from the working directory', cwdSync.code === 0 && s2.stages.requirements.status === 'done'
    && s2.stages.requirements.sha256 === lib.sha256File(rp2('artifacts/01-requirements.md')));

  // --- atomic state writes survive a briefly locked file and clean up stale temp files
  const realRename = fs.renameSync;
  let calls = 0;
  fs.renameSync = (...a) => { if (++calls <= 2) throw Object.assign(new Error('locked'), { code: 'EPERM' }); return realRename(...a); };
  let threw = false;
  try { lib.saveState(lib.readState(RUN2)); } catch { threw = true; } finally { fs.renameSync = realRename; }
  check('state write retries a transient EPERM', !threw && calls === 3);
  fs.renameSync = () => { throw Object.assign(new Error('locked'), { code: 'EPERM' }); };
  threw = false;
  try { lib.saveState(lib.readState(RUN2)); } catch { threw = true; } finally { fs.renameSync = realRename; }
  const temps = () => fs.readdirSync(rp2('')).filter((n) => n.startsWith('workflow-state.json.tmp-'));
  check('persistent EPERM throws without leaving a temp file', threw && temps().length === 0);
  fs.writeFileSync(rp2('workflow-state.json.tmp-999999'), '{}');
  fs.utimesSync(rp2('workflow-state.json.tmp-999999'), past, past);
  fs.writeFileSync(rp2('workflow-state.json.tmp-888888'), '{}');
  lib.saveState(lib.readState(RUN2));
  check('orphaned temp file removed, a fresh one kept', temps().join() === 'workflow-state.json.tmp-888888');
} finally {
  fs.rmSync(path.join(ROOT, 'runs', RUN), { recursive: true, force: true });
  fs.rmSync(path.join(ROOT, 'runs', RUN2), { recursive: true, force: true });
}
console.log(failures ? `\n${failures} check(s) FAILED` : '\nAll checks passed');
process.exit(failures ? 1 : 0);
