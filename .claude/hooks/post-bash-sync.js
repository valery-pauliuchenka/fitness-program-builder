#!/usr/bin/env node
'use strict';
/**
 * PostToolUse hook: post-bash-sync
 *
 * Safety net behind approval-gate-guard. Artifacts must be written with Write/Edit so
 * post-write-state can record them; the guard blocks the obvious shell writes, but a
 * command it cannot recognise (a script, a cd + relative path) would leave
 * workflow-state.json out of date. After every Bash call, each run the command names
 * (or runs inside) is checked: any artifact changed since it was last recorded is
 * recorded now, with the same downstream invalidation as a normal write.
 *
 * Runs the command does not mention are left alone, so a human editing an artifact
 * outside Claude is still reported as "changed outside the workflow" by resume.
 */
const fs = require('fs');
const path = require('path');
const { lib, readPayload, relToRoot, runPathInfo } = require('./hook-utils');

const p = readPayload();
if (p.tool_name !== 'Bash') process.exit(0);
const cmd = String((p.tool_input || {}).command || '');
if (!fs.existsSync(lib.RUNS_DIR)) process.exit(0);

const runIds = new Set();
const cwdRun = runPathInfo(relToRoot(path.join(p.cwd || lib.ROOT, 'x'), p));
if (cwdRun) runIds.add(cwdRun.runId);
for (const name of fs.readdirSync(lib.RUNS_DIR)) {
  if (cmd.includes(name) && fs.existsSync(lib.statePath(name))) runIds.add(name);
}

try {
  for (const runId of runIds) {
    const synced = lib.syncArtifacts(runId);
    if (synced.length) {
      process.stderr.write(`post-bash-sync: recorded shell-written artifact(s) for "${runId}": ${synced.join(', ')}. ` +
        'Write artifacts with the Write tool next time.\n');
    }
  }
} catch (err) {
  process.stderr.write(`post-bash-sync: could not update workflow state: ${err.message}\n`);
  process.exit(1); // non-blocking error
}
process.exit(0);
