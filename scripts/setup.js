#!/usr/bin/env node
'use strict';
/**
 * One-time setup and environment check.
 *
 *   node scripts/setup.js           install the exercise-mcp server into vendor/ and verify everything
 *   node scripts/setup.js --check   verify only (no network, nothing installed)
 *
 * exercise-mcp is a community MCP server (https://github.com/Bazni/gym-mcp). It is cloned
 * into vendor/ (git-ignored) rather than committed, so its dataset and GIFs, which carry a
 * separate media licence, are not redistributed from this repository.
 * The first setup pins the checkout to the exact commit it cloned by writing
 * .exercise-mcp-ref. Commit that file so everyone gets the same code.
 */
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const VENDOR = path.join(ROOT, 'vendor', 'exercise-mcp');
const REF_FILE = path.join(ROOT, '.exercise-mcp-ref');
const REPO = 'https://github.com/Bazni/gym-mcp.git';
const checkOnly = process.argv.includes('--check');
const isWin = process.platform === 'win32';

const results = [];
const ok = (name, detail = '') => results.push({ name, ok: true, detail });
const warn = (name, detail) => results.push({ name, ok: true, warn: true, detail });
const bad = (name, detail) => results.push({ name, ok: false, detail });
const run = (cmd, args, opts = {}) => spawnSync(cmd, args, { encoding: 'utf8', shell: isWin, ...opts });

// 1. Node version
const major = Number(process.versions.node.split('.')[0]);
major >= 18 ? ok('Node.js >= 18', `v${process.versions.node}`) : bad('Node.js >= 18', `found v${process.versions.node}`);

// 2. git + claude CLI
run('git', ['--version']).status === 0 ? ok('git installed') : bad('git installed', 'install git');
const claude = run('claude', ['--version']);
// Not fatal: the workflow also runs from the Claude desktop app or an IDE extension opened on this folder.
claude.status === 0 ? ok('Claude Code CLI', (claude.stdout || '').trim()) : warn('Claude Code CLI', '`claude` not on PATH (fine if you use the Claude desktop app or IDE extension); see https://docs.claude.com/en/docs/claude-code/overview');

// 3. exercise-mcp install
if (!fs.existsSync(path.join(VENDOR, 'server.js'))) {
  if (checkOnly) {
    bad('exercise-mcp installed', 'run: npm run setup');
  } else {
    console.log('Cloning exercise-mcp into vendor/ ...');
    fs.mkdirSync(path.dirname(VENDOR), { recursive: true });
    let r = run('git', ['clone', REPO, VENDOR], { stdio: 'inherit' });
    if (r.status !== 0) { bad('exercise-mcp clone', 'git clone failed (network?)'); }
    else {
      if (fs.existsSync(REF_FILE)) {
        const ref = fs.readFileSync(REF_FILE, 'utf8').trim();
        r = run('git', ['-C', VENDOR, 'checkout', ref], { stdio: 'inherit' });
        if (r.status !== 0) bad('exercise-mcp pinned commit', `could not check out ${ref}`);
      } else {
        const head = run('git', ['-C', VENDOR, 'rev-parse', 'HEAD']).stdout.trim();
        fs.writeFileSync(REF_FILE, head + '\n');
        console.log(`Pinned exercise-mcp to ${head} (saved to .exercise-mcp-ref; commit this file).`);
      }
    }
  }
}
// Build step runs whenever the dataset is missing, so re-running setup retries a failed build.
const DATASET = path.join(VENDOR, 'data', 'exercises.json');
if (!checkOnly && fs.existsSync(path.join(VENDOR, 'server.js')) && !fs.existsSync(DATASET)) {
  console.log('Installing and building exercise-mcp (downloads the exercise dataset) ...');
  let r = run('npm', ['install'], { cwd: VENDOR, stdio: 'inherit' });
  if (r.status !== 0) bad('exercise-mcp npm install', 'npm install failed; see the output above');
  r = run('npm', ['run', 'build'], { cwd: VENDOR, stdio: 'inherit' });
  if (r.status !== 0) bad('exercise-mcp build', 'npm run build failed; see the output above (needs network access)');
}
fs.existsSync(path.join(VENDOR, 'server.js')) ? ok('exercise-mcp server.js present') : bad('exercise-mcp server.js present', 'run: npm run setup');
fs.existsSync(DATASET)
  ? ok('exercise dataset built (data/exercises.json)')
  : bad('exercise dataset built', 'run: npm run setup (needs network access to GitHub)');
fs.existsSync(REF_FILE) ? ok('exercise-mcp commit pinned', fs.readFileSync(REF_FILE, 'utf8').trim().slice(0, 12)) : bad('exercise-mcp commit pinned', '.exercise-mcp-ref missing');

// 4. secrets (only report presence, never the value)
process.env.MUSCLESWORKED_API_KEY
  ? ok('MUSCLESWORKED_API_KEY is set')
  : bad('MUSCLESWORKED_API_KEY is set', 'export it in the shell you launch `claude` from (see .env.example)');

console.log('\nEnvironment check');
for (const r of results) console.log(`  ${r.warn ? 'WARN' : r.ok ? 'OK  ' : 'FAIL'} ${r.name}${r.detail ? '  ' + r.detail : ''}`);
const failed = results.filter((r) => !r.ok);
console.log(failed.length ? `\n${failed.length} problem(s) to fix before running the workflow.` : '\nReady. Start Claude Code in this folder and run /build-program.');
process.exit(failed.length ? 1 : 0);
