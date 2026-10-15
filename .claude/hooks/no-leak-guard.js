#!/usr/bin/env node
'use strict';
/**
 * PreToolUse hook: no-leak-guard
 *
 * Keeps internal workflow details (artifact filenames, agent names, gate ids, state
 * files, run folders) out of the user-facing final program.
 * Applies to writes into runs/<id>/final/.
 */
const { lib, readPayload, relToRoot, runPathInfo, newText, block, WRITE_TOOLS } = require('./hook-utils');

const p = readPayload();
if (!WRITE_TOOLS.includes(p.tool_name)) process.exit(0);
const input = p.tool_input || {};
const info = runPathInfo(relToRoot(input.file_path, p));
if (!info || !/^final\//.test(info.rel)) process.exit(0);

const text = newText(input);
const agentNames = Object.values(lib.STAGES).map((s) => s.agent);
const patterns = [
  [/\b0[1-8]-(requirements|guidelines|exercise-selection|training-plan|cardio-plan|recovery-plan|validation-report|draft-program)(\.md)?\b/gi, 'internal artifact filename'],
  [/workflow-state/gi, 'workflow state file'],
  [/\bartifacts\//gi, 'artifacts folder'],
  [/\bruns\/[\w.-]+/gi, 'run folder path'],
  [/\bGate\s+G\d\b|\bG[1-8]\b/g, 'quality-gate id'],
  [/Internal Traceability/gi, 'internal traceability section'],
  [new RegExp(`\\b(${agentNames.join('|')})\\b`, 'gi'), 'internal agent name'],
];

const hits = [];
for (const [re, label] of patterns) {
  const found = text.match(re);
  if (found) hits.push(`${label}: ${[...new Set(found)].slice(0, 3).join(', ')}`);
}
if (hits.length) {
  block('the final program must not mention internal workflow details. Remove: ' + hits.join(' | '));
}
process.exit(0);
