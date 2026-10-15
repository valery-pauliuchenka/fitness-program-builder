# Fitness Program Builder: workflow rules

This repository is an agentic workflow for Claude Code. The user runs `/build-program <request>`; a coordinator
(`.claude/commands/build-program.md`) gathers requirements, plans, runs specialist subagents, validates their work against
quality gates, asks a human to approve, and only then writes the final Markdown training program.

> General exercise information, not medical advice. The workflow refuses to plan for serious conditions (see Safety).

## Architecture: hub and spoke

```
user request
   |
COORDINATOR (/build-program)  -- orchestrates, plans, enforces gates and approval, persists state; writes NO fitness content
   |
   +-- requirements-formalizer   (gap analysis -> user Q&A -> confirmed requirements, safety triage)
   |        |  user confirms requirements (recorded)
   +-- WAVE 1 (parallel): guidelines-researcher (web) | exercise-selector (MCP: exercise-db + musclesworked)
   +-- WAVE 2 (parallel): training-planner | cardio-planner (selected only if the modality includes cardio)
   +-- WAVE 3:            recovery-planner   (needs the real schedule from training + cardio)
   +-- WAVE 4:            validator          (8 quality gates; targeted retry on failure, max 3)
   +-- WAVE 5:            program-synthesizer (merges validated artifacts into the draft program)
   +-- HUMAN APPROVAL     (hash-bound, verified by a hook; reject -> targeted revision -> approve again)
   +-- WAVE 6:            markdown-builder   (final Markdown)
```

Each subagent has one responsibility and owns exactly one artifact. Dependent stages run sequentially; independent stages
run in parallel (several launches in one message). The scheduling graph is encoded once, in `scripts/lib/runlib.js`
(`STAGES`), and queried with `node scripts/state.js ready <run-id>`.

## Stages, owners and artifacts

| Stage | Agent | Artifact (in `runs/<run-id>/`) | Needs |
|---|---|---|---|
| requirements | requirements-formalizer | `artifacts/01-requirements.md` | none (+ user confirmation) |
| guidelines | guidelines-researcher | `artifacts/02-guidelines.md` | requirements |
| exercises | exercise-selector | `artifacts/03-exercise-selection.md` | requirements |
| training | training-planner | `artifacts/04-training-plan.md` | requirements, guidelines, exercises |
| cardio *(optional)* | cardio-planner | `artifacts/05-cardio-plan.md` | requirements, guidelines |
| recovery | recovery-planner | `artifacts/06-recovery-plan.md` | requirements, guidelines, training, cardio |
| validation | validator | `artifacts/07-validation-report.md` | all of the above |
| draft | program-synthesizer | `artifacts/08-draft-program.md` | validation (all gates pass) |
| final | markdown-builder | `final/training-program.md` | draft + verified human approval |

Other files in a run folder: `input.md` (the request), `answers.md` (optional pre-supplied Q&A, used for reproducible
sample runs), `plan.md` (the coordinator's execution plan), `workflow-state.json` (persisted state), `approval.json` and
`feedback.md` (written only by the human's `scripts/review.js`).

## Artifact conventions

Artifacts are human-readable Markdown, each with the same front matter (`artifact`, `owner`, `run`, `inputs`, `status`)
and fixed `##` sections per type (see `.claude/skills/artifact-validator/scripts/check-artifact.js`, `RULES`). Agents read inputs from
`artifacts/` and write only their own artifact. The final program follows a fixed ten-section template
(`.claude/skills/program-markdown-template/assets/program-template.md`), so repeated runs with the same input have the same structure.

## Execution rules (the coordinator must follow these)

1. **Gather before planning.** Every missing requirement is asked in one batched message (or taken from `answers.md`).
   The user must confirm the requirements (`state.js confirm`); until then nothing else is scheduled.
2. **Adapt the plan.** Agent selection follows the confirmed requirements (e.g. cardio-planner is skipped for strength-only goals).
3. **Parallel vs sequential** follows `needs`. Never start a stage before its dependencies are finished and have passed the artifact check.
4. **Check every artifact** with the `artifact-validator` skill before the next wave. A failing check = targeted retry of that agent only.
5. **Quality gates** run in the validator after all content artifacts exist (below). `draft` cannot start until all eight gates pass.
6. **Targeted retries, limit 3 per stage.** On a gate failure the coordinator retries only the owner stages named in the report.
   Their downstream stages become `stale` automatically (PostToolUse hook) and are regenerated; stages that do not depend on them stay `done`.
   When a stage exceeds 3 retries it is `failed`, dependents are `blocked`, the run is `stopped`, and the failure is reported to the user.
7. **Human approval is mandatory and deterministic** (below). Rejected work is revised with the human's feedback and submitted again.
8. **The coordinator produces no fitness content, writes no artifacts, and never runs `scripts/review.js`.**
9. **State only through `scripts/state.js`.** Never hand-edit `workflow-state.json`.
10. If an MCP server is unavailable, stop and report it. Do not fall back to memory for exercise data.

## Quality gates

| Gate | Check | Failures are owned by |
|---|---|---|
| G1 | Equipment match | exercises, training, cardio |
| G2 | Schedule fit (days per week, minutes per session) | training, cardio |
| G3 | Limitations respected (and red flags present) | exercises, training, cardio, recovery |
| G4 | Muscle coverage and balance (musclesworked `analyze_workout`) | exercises, training |
| G5 | Progression defined for every phase | training, cardio |
| G6 | Difficulty fits the experience level | exercises, training, cardio |
| G7 | Every recommendation links to a real source (pages fetched) | guidelines, exercises, cardio, recovery |
| G8 | Internal consistency and variety | training, cardio, recovery |

The validator names the exact owner stages per failed gate and writes per-stage Retry Instructions.

## Human approval gate

- The draft is reviewed by the user. The decision is recorded by `node scripts/review.js approve|reject <run-id>`, run by the user
  (with the `!` prefix in Claude Code, or in another terminal). It writes `approval.json` containing the SHA-256 of the exact draft.
- The `approval-gate-guard` PreToolUse hook blocks any write to `final/` unless `approval.json` says "approved" for the **current** draft hash and all gates pass.
  Changing the draft afterwards voids the approval. The same hook, plus a permissions deny rule, stops Claude from running `review.js` or writing approval files.
- Rejection stores the feedback in `feedback.md`; the coordinator maps it to the affected stages, regenerates them, and asks again.

## Persistence and resume

`runs/<run-id>/workflow-state.json` records each stage (status, retries, artifact SHA-256), gate results, confirmation and approval.
The `post-write-state` PostToolUse hook updates it whenever an artifact is written. `/build-program resume <run-id>` runs
`state.js resume`: interrupted stages go back to `pending`, artifacts changed on disk become `stale`, and only remaining,
stale or failed work is executed. Completed stages are not repeated.

## Hooks (`.claude/settings.json`, scripts in `.claude/hooks/`, Node.js)

| Hook | Event | Purpose |
|---|---|---|
| `approval-gate-guard.js` | PreToolUse (Write/Edit/MultiEdit, Bash) | blocks the final write without valid approval; keeps approval and state files human/script-only; blocks shell writes (`sed -i`, `>`, `tee`, `cp`, `mv`, `rm`, inline scripts) into `artifacts/` and `final/` |
| `no-leak-guard.js` | PreToolUse (Write/Edit/MultiEdit) | keeps internal artifact names, agent names, gate ids and run paths out of the final program |
| `post-write-state.js` | PostToolUse (Write/Edit/MultiEdit) | records artifacts in `workflow-state.json`, marks downstream stale, voids stale approvals |
| `post-bash-sync.js` | PostToolUse (Bash) | safety net: for runs the command names (or runs inside), records any artifact a shell command changed, exactly like `post-write-state` |

Artifacts are written only with the Write/Edit tools (every agent's prompt says so); a shell write would skip
`post-write-state`. State writes retry briefly when Windows locks `workflow-state.json` (EPERM/EBUSY) and clean up
orphaned `workflow-state.json.tmp-*` files.

## MCP servers (`.mcp.json`)

| Server | Type | Used for | Config |
|---|---|---|---|
| `exercise-db` | community ([Bazni/gym-mcp](https://github.com/Bazni/gym-mcp), data from [hasaneyldrm/exercises-dataset](https://github.com/hasaneyldrm/exercises-dataset)) | exercise search by equipment/body part, instructions | cloned into `vendor/` by `npm run setup`, pinned in `.exercise-mcp-ref` |
| `musclesworked` | community (npm `musclesworked-mcp`) | muscle activation, difficulty filters, alternatives, workout coverage analysis | needs `MUSCLESWORKED_API_KEY` (environment variable, never committed) |

Web search/fetch (guidelines-researcher, cardio-planner, recovery-planner, validator) provides the external research.
Exercise rows cite their dataset id; guideline claims cite fetched pages.

## Skills (`.claude/skills/`)

- **artifact-validator**: structural and citation check run after every artifact (agents, coordinator).
- **program-markdown-template**: the fixed program structure and writing rules (program-synthesizer, markdown-builder).

## Safety

The requirements-formalizer triages every request. Mild limitations (mild joint discomfort, healed old injuries, low fitness)
are planned around. Serious conditions or red flags (under 18, pregnancy, recent surgery or injury under treatment, heart/lung
disease or chest pain, uncontrolled blood pressure/diabetes, signs of disordered eating with a weight-loss goal, severe or
worsening pain, doctor-imposed restrictions, anything uncertain) end the run with a referral message and no program.
The program never contains diet plans, calorie targets, supplements or diagnoses.

## Repository map

```
CLAUDE.md  README.md  package.json  .mcp.json  .env.example  .gitignore  .exercise-mcp-ref (created by setup)
.claude/commands/build-program.md        coordinator
.claude/agents/*.md                      9 subagents
.claude/skills/*                         2 skills
.claude/hooks/*.js, .claude/settings.json hooks and permissions
scripts/state.js review.js setup.js selftest.js lib/runlib.js
runs/sample-*/                           committed sample runs (inputs, artifacts, state, final output)
```
