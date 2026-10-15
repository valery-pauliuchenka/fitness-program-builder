#!/usr/bin/env node
'use strict';
/**
 * PreToolUse hook: approval-gate-guard
 *
 * 1. Blocks any write into runs/<id>/final/ until a human approval is on record for
 *    the CURRENT draft (SHA-256 match) and all quality gates pass.
 * 2. Keeps the approval machinery human-only: Claude may not run scripts/review.js
 *    or write approval.json / feedback.md / workflow-state.json.
 * 3. Blocks shell writes into runs/<id>/artifacts/ and final/: only Write/Edit calls are
 *    recorded by post-write-state, so a `sed -i` or `>` would leave the state out of date.
 *    (post-bash-sync records anything that still slips through.)
 *
 * Wired to: Write|Edit|MultiEdit and Bash (see .claude/settings.json).
 */
const { lib, readPayload, relToRoot, runPathInfo, block, WRITE_TOOLS } = require('./hook-utils');

const p = readPayload();
const tool = p.tool_name;
const input = p.tool_input || {};

function requireApproval(runId, what) {
  const state = lib.readState(runId);
  if (!state) block(`${what}: run "${runId}" has no workflow state.`);
  if (!lib.gatesAllPass(state)) block(`${what}: not all quality gates have passed for run "${runId}".`);
  const a = lib.approvalStatus(runId);
  if (!a.valid) {
    block(`${what}: no valid human approval (${a.reason}). Ask the user to review the draft and run ` +
      `"! node scripts/review.js approve ${runId}". Do not attempt to create the approval yourself.`);
  }
}

if (WRITE_TOOLS.includes(tool)) {
  const info = runPathInfo(relToRoot(input.file_path, p));
  if (info) {
    if (/^final\//.test(info.rel)) requireApproval(info.runId, 'Final output write');
    if (['approval.json', 'feedback.md', 'workflow-state.json'].includes(info.rel)) {
      block(`"${info.rel}" is maintained by scripts and hooks only. Use scripts/state.js for state changes; ` +
        'approval and feedback are recorded by the human via scripts/review.js.');
    }
  }
} else if (tool === 'Bash') {
  const cmd = String(input.command || '');
  if (/review\.js/.test(cmd)) {
    block('scripts/review.js records the HUMAN decision and cannot be run by Claude.');
  }
  const writesLikeOp = /(>>?|\btee\b|\bcp\b|\bmv\b|\brm\b|\bsed\s+-i|\bnode\s+-e|\bpython3?\b|\bperl\b)/;
  if (/(approval\.json|feedback\.md|workflow-state\.json)/.test(cmd) && writesLikeOp.test(cmd)) {
    block('approval.json, feedback.md and workflow-state.json cannot be modified through the shell.');
  }
  const target = shellArtifactWrite(cmd);
  if (target) {
    block(`"${target}" is a workflow artifact and cannot be written, edited, moved or deleted through the shell: ` +
      'only Write/Edit calls are recorded in the workflow state. Rewrite the whole file with the Write tool instead.');
  }
}

/**
 * Detects a shell command that writes into runs/<id>/artifacts/ or runs/<id>/final/
 * (POSIX or Windows separators, relative or absolute). Reads (cat, grep, sed -n, the
 * artifact checker, `> /tmp/copy` of an artifact) stay allowed. Returns the path or null.
 */
function shellArtifactWrite(command) {
  const P = String.raw`["']?[^\s"'|;&<>]*runs[\\/]+[A-Za-z0-9._-]+[\\/]+(?:artifacts|final)[\\/][^\s"'|;&<>]*["']?`;
  const unq = (s) => s.replace(/^["']|["']$/g, '');
  for (const seg of command.split(/\|\||&&|[|;\n]/)) {
    const paths = [...seg.matchAll(new RegExp(P, 'g'))].map((m) => unq(m[0]));
    if (!paths.length) continue;
    let m;
    // Redirection or tee onto an artifact path.
    if ((m = new RegExp(String.raw`(?:\d?>>?|>\||\btee\b(?:\s+-a)?)\s*(${P})`).exec(seg))) return unq(m[1]);
    // In-place editors, deletion, moves and interpreter one-liners that mention an artifact path.
    if (/\b(?:sed|perl|ruby)\b[^]*?\s(?:-[a-zA-Z]*i|--in-place)/.test(seg) || /\b(?:rm|unlink|truncate|shred|mv|dd)\b/.test(seg)) return paths[0];
    if (/\b(?:node|python3?|py|ruby|perl|pwsh|powershell)\b[^]*?\s(?:-e|-c|--eval|-Command)\b/.test(seg)) return paths[0];
    // cp/install/rsync with an artifact path as the destination (last argument).
    if (/\b(?:cp|install|rsync|ln)\b/.test(seg) && new RegExp(`(${P})\\s*$`).test(seg.trim())) return paths[paths.length - 1];
    // PowerShell writers.
    if (/\b(?:Set-Content|Add-Content|Out-File|Remove-Item|Move-Item|Copy-Item|New-Item)\b/i.test(seg)) return paths[0];
  }
  return null;
}
process.exit(0);
