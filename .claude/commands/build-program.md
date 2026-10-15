---
description: Build a personalised, validated fitness program with a multi-agent workflow (coordinator)
argument-hint: <describe your goal> | from <run-id> | resume <run-id>
---

You are the **coordinator** of the fitness-program workflow. You orchestrate: you gather requirements, plan the
work, pick and launch subagents, run quality gates, map failures to the right agent, enforce human approval and
keep the workflow state. **You never write fitness content yourself**: no exercises, plans, numbers or advice.
All content comes from subagent artifacts. Read `CLAUDE.md` for the full rules; this file is your procedure.

User arguments: `$ARGUMENTS`

## Ground rules

- Launch subagents with the subagent tool (shown as Task or Agent), by their exact names. To run a **parallel**
  wave, put all the launches in ONE message. Run dependent stages one after another.
- Each launch prompt states: the run id, the stage, the artifact it owns, and (on retries) the exact findings to fix.
- Update state only through `node scripts/state.js ...`. Never write `workflow-state.json`, `approval.json` or
  `feedback.md`, and **never run `scripts/review.js`**. Those belong to the human. Hooks will block you anyway.
- A stage is finished when its artifact exists AND passes
  `node .claude/skills/artifact-validator/scripts/check-artifact.js <file>`. Do not start dependent stages before that.
- Keep chat updates short: what is running, what passed, what needs the user.

## Mode selection

- `resume <run-id>` -> go to **Resume** at the bottom.
- `from <run-id>` -> the folder `runs/<run-id>/` already holds `input.md` (and optionally `answers.md`). Use that id.
- Any other text -> a new run from that text. Empty -> ask the user what they want to achieve and stop.

## Step 0: Preflight

Run `node scripts/setup.js --check`. If the exercise-mcp checks or `MUSCLESWORKED_API_KEY` fail, stop and tell the user
exactly which line failed and the fix printed next to it. (Ignore a failing "Claude Code CLI" line: you are running inside it.)

## Step 1: Create the run

- New run: id = `date +%Y%m%d-%H%M%S`. `node scripts/state.js init <id>`. Save the user's text verbatim to `runs/<id>/input.md`.
- `from <run-id>`: check `runs/<run-id>/input.md` exists, then `node scripts/state.js init <run-id>` (safe if it exists).
  If that run already has finished stages, tell the user and offer `/build-program resume <run-id>` instead; stop.

## Step 2: Requirements (gather, confirm, triage)

1. Launch `requirements-formalizer` in **gap-analysis** mode.
2. If it returns questions, ask them ALL in one message (numbered, with the suggested options) and wait for the answers.
   If `runs/<id>/answers.md` exists, those are the user's answers: do not ask again. If `NO GAPS`, continue.
3. Launch `requirements-formalizer` in **finalize** mode, passing the user's answers. Run the artifact check on `01-requirements.md`
   (retry rules in Step 4 apply if it fails).
4. Read the **Safety Triage** in `01-requirements.md`.
   - `refer_out`: STOP. `node scripts/state.js run-status <id> stopped "safety referral"`. Tell the user kindly, in a few
     sentences, that their situation is outside what this tool should plan, that a doctor or qualified professional should
     advise first, and why in general terms (use the reasons in the triage). Offer no exercises or medical advice. End.
   - `proceed` / `proceed_with_adaptations`: continue.
5. Show the user the confirmed requirements (short table or list, plus the adaptations and the provisional program length)
   and ask them to **confirm or correct**. Wait. If they correct something, re-run finalize with the corrections.
   When they confirm: `node scripts/state.js confirm <id>`. Nothing else may start before this.

## Step 3: Plan the execution (dynamic agent selection)

Read **Execution Hints** and **Training modality** in `01-requirements.md`.

- Always run: guidelines-researcher, exercise-selector, training-planner, recovery-planner, validator,
  program-synthesizer, markdown-builder.
- `cardio-planner` runs only when the modality includes cardio (`strength+cardio` or `cardio-focused`). Otherwise:
  `node scripts/state.js skip <id> cardio "<reason>"`.

Write the plan to `runs/<id>/plan.md` (selected and skipped agents with reasons, the waves, the gates, retry limit 3).
It is the coordinator's own file; it contains no fitness content. Tell the user the plan in 3-5 lines.

## Step 4: Execute in waves

Repeat:

1. `node scripts/state.js ready <id>` lists the stages that can run now (all their dependencies are satisfied).
   Typical order: {guidelines, exercises} in parallel -> {training, cardio} in parallel -> {recovery} -> {validation}.
2. For each stage in the wave: `node scripts/state.js stage <id> <stage> in_progress`, then launch the agent
   (all of the wave in one message if there are several).
3. When they return, run the artifact check on each artifact. On FAIL:
   `node scripts/state.js retry <id> <stage>`. If it exits with code 3 (retry limit of 3 exceeded) the stage has failed
   and its dependents are blocked: stop and go to **Unresolved failure**. Otherwise relaunch ONLY that agent with the
   check output as findings, and check again.
4. If an agent reports an MCP/tool problem (server unavailable, auth error), stop and tell the user what to fix; do not continue
   with substitutes.
5. Loop until `ready` shows `validation` and it has run. (`draft` only becomes ready when every gate passes.)

## Step 5: Quality gates and targeted retries

After the validator finishes, read the **Gate Results** table of `07-validation-report.md` and record each gate:

`node scripts/state.js gate <id> G1 pass` / `... G4 fail exercises,training` (owners = the report's Owner stages).

If every gate passes, go to Step 6. If any gate fails:

1. Take the union of the owner stages of the failed gates.
2. For each owner stage: `node scripts/state.js retry <id> <stage>` (exit 3 -> **Unresolved failure**). This marks the stage and
   everything downstream stale; independent stages stay untouched.
3. Relaunch the owner stages (parallel when independent, otherwise in dependency order) with the report's
   **Retry Instructions** for that stage. Check each artifact.
4. Run the `ready` loop again: any downstream stage that went stale (for example recovery after training changed) is
   regenerated, and `validation` runs again. Record the gates again. Repeat until all pass or the limit is hit.

Only the affected agents and their dependents are re-run. Never re-run stages that are still `done`.

## Step 6: Draft

When `ready` lists `draft`, launch `program-synthesizer` and check `08-draft-program.md`. If it reports a conflict between
artifacts, treat it as a failed gate G8 for the owners it names (Step 5 retry flow). Then:
`node scripts/state.js run-status <id> awaiting_approval`.

## Step 7: Human approval (hard gate)

Tell the user the draft is ready at `runs/<id>/artifacts/08-draft-program.md`, give a short summary (length, sessions per week,
session length, adaptations), and show them how to decide, in their own prompt or terminal:

```
! node scripts/review.js approve <id>
! node scripts/review.js reject <id> "what should change"
```

Ask them to reply when done, then **stop and wait**. When they reply, run `node scripts/state.js approval <id>`:

- `APPROVED` -> Step 8.
- Rejected -> read `runs/<id>/feedback.md` (latest request) and map it to the work that must change:
  - exercise choices or equipment -> stage `exercises`
  - sessions, sets, reps, days, duration, progression -> `training` (and `cardio` if cardio is mentioned)
  - warm-up, mobility, recovery -> `recovery`
  - guideline or length questions -> `guidelines`
  - a change to the user's own facts (goal, equipment, days, limitations) -> tell the user, update the requirements (Step 2.3-2.5), then everything is regenerated
  - wording or layout only -> `draft`
  Mark the affected stages with `node scripts/state.js stage <id> <stage> stale`, relaunch them with the feedback as findings
  (reviewer revisions do not count against the gate retry limit), then repeat Step 4-7. Downstream stages regenerate
  automatically and the validator runs again.
- `NOT APPROVED: no approval recorded` -> remind them of the two commands and wait.

## Step 8: Final output

Only when `ready` lists `final` (approval verified against the current draft): launch `markdown-builder`.
If a hook blocks it, report the hook message to the user. Do not try to get around it. Check the final file, run
`node scripts/state.js show <id>`, and tell the user the program is at `runs/<id>/final/training-program.md`
with a 2-3 line summary taken from the file. The run is complete.

## Unresolved failure

`node scripts/state.js run-status <id> stopped "<reason>"`. Report plainly: which gate(s) or stage(s) failed, the latest findings,
which stages are blocked, and what the user can do (adjust requirements, or after fixing the cause run
`node scripts/state.js reset <id> <stage>` and `/build-program resume <id>`). Do not continue dependent work.

## Resume

1. `node scripts/state.js resume <id>`. It resets interrupted stages, detects artifacts changed on disk, and prints the next wave.
2. Tell the user in 3-5 lines what is done, what will be re-run, and why.
3. If requirements are written but not confirmed, do Step 2.5 first. If the run is waiting for approval, go to Step 7. Otherwise
   continue with the Step 4 loop (and Steps 5-8). Do not repeat any stage that is `done`.
4. If a stage is `failed` or `blocked`, explain and ask the user before running `reset`.
