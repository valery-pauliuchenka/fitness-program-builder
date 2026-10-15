'use strict';
// Shared helpers for the hook scripts. Hooks receive a JSON payload on stdin.
const fs = require('fs');
const path = require('path');
const lib = require('../../scripts/lib/runlib');

function readPayload() {
  try { return JSON.parse(fs.readFileSync(0, 'utf8') || '{}'); } catch { return {}; }
}

/** Path relative to the project root, POSIX style ('' if outside the project). */
function relToRoot(file, payload) {
  if (!file) return '';
  const abs = path.resolve(payload.cwd || lib.ROOT, file);
  const rel = path.relative(lib.ROOT, abs);
  return rel.startsWith('..') ? '' : lib.toPosix(rel);
}

/** "runs/<id>/<rest>" -> { runId, rel } (or null). */
function runPathInfo(relFromRoot) {
  const m = /^runs\/([^/]+)\/(.+)$/.exec(relFromRoot || '');
  return m ? { runId: m[1], rel: m[2] } : null;
}

/** Text that a Write/Edit/MultiEdit call would put into the file. */
function newText(input) {
  if (typeof input.content === 'string') return input.content;
  if (Array.isArray(input.edits)) return input.edits.map((e) => e.new_string || '').join('\n');
  return input.new_string || '';
}

/** PreToolUse block: exit code 2 makes Claude Code refuse the call and show stderr to Claude. */
function block(message) {
  process.stderr.write(`BLOCKED by workflow hook: ${message}\n`);
  process.exit(2);
}

const WRITE_TOOLS = ['Write', 'Edit', 'MultiEdit'];
module.exports = { lib, readPayload, relToRoot, runPathInfo, newText, block, WRITE_TOOLS };
