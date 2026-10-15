#!/usr/bin/env node
'use strict';
/**
 * Structural + citation check for workflow artifacts.
 * Usage: node check-artifact.js <path-to-artifact.md>
 * Exit 0 = PASS, 1 = FAIL (problems listed on stdout).
 */
const fs = require('fs');
const path = require('path');
const lib = require('../../../../scripts/lib/runlib');

const file = process.argv[2];
if (!file || !fs.existsSync(file)) {
  console.error('usage: node check-artifact.js <artifact.md>  (file not found)');
  process.exit(2);
}

const text = fs.readFileSync(file, 'utf8');
const base = path.basename(file, '.md');
const isFinal = base === 'training-program';
const id = isFinal ? 'final' : base;

// Required sections and minimum number of source links per artifact id.
const RULES = {
  '01-requirements': { sections: ['Summary', 'Confirmed Requirements', 'Safety Triage', 'Assumptions', 'Execution Hints'], urls: 0 },
  '02-guidelines': { sections: ['Summary', 'Recommended Program Length', 'Details', 'Sources'], urls: 2 },
  '03-exercise-selection': { sections: ['Summary', 'Details', 'Sources'], urls: 1 },
  '04-training-plan': { sections: ['Summary', 'Details', 'Progression', 'Sources'], urls: 1 },
  '05-cardio-plan': { sections: ['Summary', 'Details', 'Progression', 'Sources'], urls: 1 },
  '06-recovery-plan': { sections: ['Summary', 'Details', 'Sources'], urls: 1 },
  '07-validation-report': { sections: ['Summary', 'Gate Results', 'Retry Instructions'], urls: 0 },
  '08-draft-program': { template: true, urls: 0, extra: ['Internal Traceability'] },
  final: { template: true, urls: 0, extra: [] },
};

const problems = [];
const rule = RULES[id];
if (!rule) {
  console.log(`FAIL  unknown artifact "${id}". Expected one of: ${Object.keys(RULES).join(', ')}`);
  process.exit(1);
}

// ---- front matter (not for the final, reader-facing program)
let body = text;
if (!isFinal) {
  const m = /^---\n([\s\S]*?)\n---\n/.exec(text);
  if (!m) {
    problems.push('missing YAML front matter (--- block at the top)');
  } else {
    body = text.slice(m[0].length);
    const fm = {};
    for (const line of m[1].split('\n')) {
      const kv = /^([a-z_]+):\s*(.*)$/.exec(line);
      if (kv) fm[kv[1]] = kv[2].trim();
    }
    for (const k of ['artifact', 'owner', 'run', 'inputs', 'status']) {
      if (!fm[k]) problems.push(`front matter is missing "${k}"`);
    }
    const stage = lib.stageForArtifact(`artifacts/${base}.md`);
    if (fm.artifact && fm.artifact !== id) problems.push(`front matter artifact "${fm.artifact}" does not match file "${id}"`);
    if (stage && fm.owner && fm.owner !== lib.STAGES[stage].agent) {
      problems.push(`front matter owner "${fm.owner}" should be "${lib.STAGES[stage].agent}"`);
    }
    const runFromPath = /runs\/([^/]+)\//.exec(file.split(path.sep).join('/'));
    if (runFromPath && fm.run && fm.run !== runFromPath[1]) problems.push(`front matter run "${fm.run}" does not match folder "${runFromPath[1]}"`);
  }
} else if (/^---\n/.test(text)) {
  problems.push('the final program must not contain front matter');
}

// ---- sections
const headings = [...body.matchAll(/^##\s+(.+?)\s*$/gm)].map((m) => ({ title: m[1], index: m.index }));
const titles = headings.map((h) => h.title);

if (rule.template) {
  const tpl = fs.readFileSync(path.join(__dirname, '../../program-markdown-template/assets/program-template.md'), 'utf8');
  const expected = [...tpl.matchAll(/^##\s+(.+?)\s*$/gm)].map((m) => m[1]);
  const actual = titles.filter((t) => !rule.extra.includes(t));
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    problems.push(`sections must match the template exactly and in order.\n    expected: ${expected.join(' | ')}\n    found:    ${actual.join(' | ')}`);
  }
  if (!/^#\s+\S/m.test(body)) problems.push('missing top-level "# Title"');
  if (isFinal && titles.some((t) => /internal traceability/i.test(t))) problems.push('final program must not include "Internal Traceability"');
  if (!isFinal) for (const t of rule.extra) if (!titles.includes(t)) problems.push(`missing section "## ${t}"`);
} else {
  for (const s of rule.sections) if (!titles.includes(s)) problems.push(`missing section "## ${s}"`);
}

// ---- empty sections
headings.forEach((h, i) => {
  const end = i + 1 < headings.length ? headings[i + 1].index : body.length;
  const content = body.slice(h.index, end).replace(/^##.*$/m, '').trim();
  if (!content) problems.push(`section "## ${h.title}" is empty`);
});

// ---- sources / links
if (rule.urls > 0) {
  const idx = headings.findIndex((h) => h.title === 'Sources');
  const sec = idx >= 0 ? body.slice(headings[idx].index, idx + 1 < headings.length ? headings[idx + 1].index : body.length) : '';
  const urls = [...sec.matchAll(/https?:\/\/[^\s)>\]]+/g)].map((m) => m[0].replace(/[.,;]+$/, ''));
  const good = urls.filter((u) => {
    try { const x = new URL(u); return x.protocol === 'https:' && !/(^|\.)example\.(com|org)$|^localhost$/.test(x.hostname); } catch { return false; }
  });
  if (good.length < rule.urls) problems.push(`"## Sources" needs at least ${rule.urls} well-formed https link(s); found ${good.length}`);
}

// ---- leftover template comments
if (/<!--/.test(body) && id !== '08-draft-program') problems.push('contains HTML comments (template instructions must be removed)');
if (/<!--/.test(body) && id === '08-draft-program') problems.push('contains HTML comments (template instructions must be replaced with content)');

// ---- placeholders
const placeholder = /\b(TODO|TBD|FIXME|lorem ipsum)\b|\{\{[^}]*\}\}|<\s*(insert|fill)[^>]*>/i.exec(body);
if (placeholder) problems.push(`unresolved placeholder: "${placeholder[0]}"`);

if (problems.length) {
  console.log(`FAIL  ${path.basename(file)}`);
  for (const p of problems) console.log(`  - ${p}`);
  process.exit(1);
}
console.log(`PASS  ${path.basename(file)}`);
