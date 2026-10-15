#!/usr/bin/env node
'use strict';
/**
 * PostToolUse hook: post-write-state
 *
 * After any artifact is written under runs/<id>/artifacts/ (or final/), record it in
 * runs/<id>/workflow-state.json: status, SHA-256, timestamp. If an upstream artifact is
 * rewritten (a retry), every downstream stage that was "done" becomes "stale", the
 * quality gates reset, and any earlier approval is voided. This is what makes
 * targeted retries and resuming after a restart deterministic.
 */
const { lib, readPayload, relToRoot, runPathInfo, WRITE_TOOLS } = require('./hook-utils');

const p = readPayload();
if (!WRITE_TOOLS.includes(p.tool_name)) process.exit(0);
const info = runPathInfo(relToRoot((p.tool_input || {}).file_path, p));
if (!info || !/^(artifacts|final)\//.test(info.rel)) process.exit(0);

try {
  lib.recordArtifact(info.runId, info.rel);
} catch (err) {
  process.stderr.write(`post-write-state: could not update workflow state: ${err.message}\n`);
  process.exit(1); // non-blocking error
}
process.exit(0);
