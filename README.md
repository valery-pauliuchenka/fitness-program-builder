# Fitness Program Builder: an agentic workflow for Claude Code

Give it a goal ("I'm a beginner, I want to lose fat, I train at home 3 evenings a week") and it produces a
personalised, validated, human-approved training program as a Markdown document. It is a hub-and-spoke workflow built
only from Claude Code features: a custom slash command (the coordinator), subagents, skills, hooks, and MCP servers.

> General exercise information, not medical advice. Serious health conditions end the run with a referral message.

## What it does

```
/build-program <request>
  -> coordinator gathers + confirms requirements, runs a safety triage, plans which agents are needed
  -> guidelines-researcher (web)  ||  exercise-selector (MCP: exercise-db + musclesworked)
  -> training-planner             ||  cardio-planner (only if the goal needs cardio)
  -> recovery-planner
  -> validator: 8 quality gates, targeted retries (max 3)
  -> program-synthesizer: draft program
  -> YOU approve or reject (hash-bound, enforced by a hook)
  -> markdown-builder: runs/<run-id>/final/training-program.md
```

`CLAUDE.md` is the authoritative description of the architecture and execution rules.

## Prerequisites

| Requirement | Notes |
|---|---|
| [Claude Code](https://docs.claude.com/en/docs/claude-code/overview) | installed and logged in: the `claude` CLI, or the Claude desktop app (Code tab) / IDE extension opened on this folder |
| Node.js >= 18 | hooks and scripts use only Node built-ins (no `npm install` for this repo) |
| git | used by setup to fetch the exercise MCP server |
| Internet access | web research, GitHub (one-time setup), musclesworked API |
| `MUSCLESWORKED_API_KEY` | API key from <https://musclesworked.com/dashboard> for the musclesworked MCP server |

## Setup (from a clean checkout)

```bash
git clone <this-repo-url> fitness-program-builder
cd fitness-program-builder

# 1. Secrets: set them in the environment Claude Code is started from. Nothing is stored in the repo.
#    macOS / Linux (bash, zsh), current shell only; launch `claude` from this same shell:
export MUSCLESWORKED_API_KEY="mw_live_..."
#    Windows (PowerShell), saved permanently for your user (see the note below):
setx MUSCLESWORKED_API_KEY "mw_live_..."

# 2. Install the community exercise MCP server into vendor/ (git-ignored), build its dataset, pin its commit
npm run setup

# 3. Verify the environment and the workflow machinery
npm run check        # environment check (Node, git, Claude CLI, MCP server, API key)
npm test             # offline self-test of state, retries, resume, hooks and the approval gate (32 checks)

# 4. Start Claude Code from the repository root (the MCP paths are relative to it)
claude               # or: Claude desktop app -> Code tab -> New session -> select this folder
```

**Windows note on the API key.** The MCP servers inherit their environment from the Claude Code process that starts them.
`$env:MUSCLESWORKED_API_KEY = "..."` sets the key only in the current PowerShell window, so it works only for `claude`
launched from that same window. It never reaches the Claude desktop app or an IDE. `setx` saves the key as a user
environment variable, but it does not reach processes that are already running. After `setx`, open a new terminal and
**fully quit and restart** the Claude desktop app (from the system tray) or your IDE, then start a new session.
Check with `npm run check` in a new terminal: `MUSCLESWORKED_API_KEY is set` should be `OK`.

`npm run setup` writes `.exercise-mcp-ref` (the commit it cloned). Commit that file so everyone runs the same code.
On first start Claude Code may ask you to trust the project's MCP servers and hooks: accept. Use `/mcp` to confirm that
`exercise-db` and `musclesworked` are connected, and `/hooks` to see the three hooks.

Do not run Claude Code with `--dangerously-skip-permissions` for this project: the approval gate relies on hooks and permission rules.

### Secrets and configuration

| Name | Where | Purpose |
|---|---|---|
| `MUSCLESWORKED_API_KEY` | environment variable (see `.env.example`) | authenticates the musclesworked MCP server; referenced from `.mcp.json` as `${MUSCLESWORKED_API_KEY}` |
| `MUSCLESWORKED_API_URL` | optional environment variable | override the API base URL |

`.env` files and `vendor/` are git-ignored; `.claude/settings.json` also denies Claude read access to `.env*`. No key is committed.

## Run

Type the command in the Claude Code prompt (CLI, or the chat box of a desktop-app Code session), not in PowerShell or bash.
There are two ways to start a run.

**Option A: free-text request.** A new run folder `runs/<yyyymmdd-hhmmss>/` is created and your text is saved as its `input.md`:

```
/build-program I'm 30, a beginner, and want to lose body fat. I train at home with dumbbells, 3 days a week, 40 minutes.
```

**Option B: a prepared run folder.** Point the coordinator at a folder in `runs/` that already holds `input.md`
(the request) and, optionally, `answers.md` (answers to the clarifying questions). The folder name is the run id:

```
/build-program from sample-01-beginner-home-fat-loss
```

With `answers.md` present the coordinator asks no clarifying questions, but you still confirm the requirements. Use this
to produce the committed sample runs (`sample-01` ... `sample-04`, see [runs/README.md](runs/README.md)), or to re-run the
same input and compare structure. For your own input, create `runs/<my-run>/input.md` (plus `answers.md` if you like)
and run `/build-program from <my-run>`. If the folder already has finished stages, the coordinator offers
`/build-program resume <run-id>` instead of starting over.

For both options:

1. Answer the batched clarifying questions, then **confirm** the requirements the coordinator shows you.
2. The coordinator shows its plan (which agents run, which are skipped and why), runs the waves, and handles any gate failures itself.
3. When the draft is ready you decide. In the Claude Code prompt (the `!` prefix runs a shell command) or any terminal:

```
! node scripts/review.js approve <run-id>
! node scripts/review.js reject  <run-id> "swap the lunges, sessions are too long on Friday"
```

Then tell Claude you are done. On **approve**, the final program is written to `runs/<run-id>/final/training-program.md`.
On **reject**, only the affected agents are re-run with your feedback (and anything downstream of them), the validator runs again,
and you are asked to review the new draft.

## Resume after an interruption

State is saved in `runs/<run-id>/workflow-state.json` after every artifact. If Claude Code crashed, you closed the terminal, or a
stage failed:

```
claude
/build-program resume <run-id>
```

The coordinator runs `node scripts/state.js resume <run-id>`: interrupted stages go back to pending, artifacts that were edited
or deleted outside the workflow become stale, finished stages are **not** repeated, and only the remaining, stale or failed work runs.
Useful commands:

```bash
node scripts/state.js list                        # all runs and their status
node scripts/state.js show <run-id> --events      # stages, retries, gates, approval, event log
node scripts/state.js ready <run-id>              # what would run next
node scripts/state.js reset <run-id> <stage>      # after a stage exceeded its 3 retries and you fixed the cause
```

## Sample runs

Three scenarios (plus a fourth that demonstrates the safety stop) live in `runs/`, see [`runs/README.md`](runs/README.md).
Each stores its input, answers, every agent's artifact, the execution state, the approval record and the final program.

```
/build-program from sample-01-beginner-home-fat-loss
/build-program from sample-02-intermediate-gym-muscle-gain
/build-program from sample-03-knee-constrained-general-fitness
/build-program from sample-04-referral-stop
```

## What is in the repository

```
CLAUDE.md                         workflow documentation and execution rules
.claude/commands/build-program.md coordinator (slash command)
.claude/agents/                   requirements-formalizer, guidelines-researcher, exercise-selector, training-planner,
                                  cardio-planner, recovery-planner, validator, program-synthesizer, markdown-builder
.claude/skills/                   artifact-validator, program-markdown-template
.claude/hooks/                    approval-gate-guard.js, no-leak-guard.js (PreToolUse); post-write-state.js (PostToolUse)
.claude/settings.json             hook wiring, permissions (allow/deny)
.mcp.json                         exercise-db + musclesworked MCP servers
scripts/                          state.js (state CLI), review.js (human approval), setup.js, selftest.js, lib/runlib.js
runs/                             sample runs (committed); your own runs stay local (git-ignored)
```

## Design notes and limitations

- **Approval is deterministic, not conversational.** The gate checks a SHA-256 in `approval.json` that only `scripts/review.js` writes.
  The shell-command checks in `approval-gate-guard.js` are pattern based and are a second line of defence; the primary protections are the
  Write/Edit hook on `final/`, the permissions deny rule for `review.js`, and the hash binding.
- **Source checks.** The structural check proves links are well-formed; the validator agent opens the pages (WebFetch) to check they exist and
  support the claim. MCP-derived exercises cite their dataset id and dataset page rather than a per-exercise URL.
- **Exercise media licence.** The exercise dataset's GIFs are (c) Gym visual and are not redistributed here (`vendor/` is not committed).
  The program contains text only.
- **The exercise dataset is downloaded at setup time** by the community server's build step. The server code is pinned; the dataset is whatever that step fetches.
- **Not medical advice.** The triage is conservative by design, but it is a screening heuristic, not a clinical assessment.
- **Unverified against the live servers.** The agents' `tools:` lists use the MCP tool names published in each server's README
  (`list_facets`, `search_exercises`, `get_exercise`, `build_workout`; `search_muscles`, `find_exercises`, `get_muscles_worked`,
  `get_alternatives`, `analyze_workout`). Confirm them with `/mcp` on first run.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `/mcp` shows a server as failed | `exercise-db`: run `npm run setup` and start `claude` from the repo root. `musclesworked`: check `MUSCLESWORKED_API_KEY` is exported in the same shell, and that `npm view musclesworked-mcp@0.1.0` resolves. |
| An agent says an MCP tool is not found | Run `/mcp`, open the server, and compare its tool names with the `tools:` line of `.claude/agents/exercise-selector.md` / `validator.md` / `training-planner.md` (names are `mcp__<server>__<tool>`). |
| Final write blocked by a hook | Expected until you run `! node scripts/review.js approve <run-id>`; the message says what is missing. |
| Hook messages about "internal details" | The final document mentioned a file/agent/gate name; the builder is told to remove it and retry. |
| `npm run setup` fails to clone or build | It needs network access to GitHub; rerun when online. |

## Licence

Choose a licence for this repository's own code before publishing. The exercise-mcp server, its dataset and the musclesworked service
have their own licences and terms (see their repositories); they are not bundled here.
