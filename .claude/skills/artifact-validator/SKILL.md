---
name: artifact-validator
description: Structural and citation check for every workflow artifact (requirements, guidelines, exercise selection, training/cardio/recovery plans, validation report, draft and final program). Use this skill immediately after any artifact is written and BEFORE any dependent agent runs, and whenever the coordinator or an agent needs to confirm that an artifact has the required front matter, sections, source links and no placeholders. Use it even for a "quick" artifact; a failed check means the owning agent must fix and rewrite it.
---

# Artifact validator

A reusable check that every artifact is well-formed before the next group of agents starts.
It covers structure and citations only. Semantic quality (equipment fit, safety, coverage, ...)
is the `validator` agent's job.

## How to run

```bash
node .claude/skills/artifact-validator/scripts/check-artifact.js runs/<run-id>/artifacts/03-exercise-selection.md
node .claude/skills/artifact-validator/scripts/check-artifact.js runs/<run-id>/artifacts/08-draft-program.md
node .claude/skills/artifact-validator/scripts/check-artifact.js runs/<run-id>/final/training-program.md
```

The artifact id is taken from the file name; the script picks the right rules.
Exit code 0 = PASS, 1 = FAIL with a list of problems.

## What it checks

| Check | Applies to |
|---|---|
| Front matter has `artifact`, `owner`, `run`, `inputs`, `status`, and they match the file and run | all artifacts (not the final program) |
| Required `##` sections for that artifact type are present, in any order, and not empty | all |
| `## Sources` contains at least N well-formed `https://` links (N=1 for planners, 2 for guidelines) | 02, 03, 04, 05, 06 |
| No placeholders (`TODO`, `TBD`, `{{ }}`, `<insert ...>`) and no leftover HTML comments | all |
| Draft/final contain exactly the template sections in the template order | 08, final |
| Final program has no front matter and no "Internal Traceability" section | final |

The link check proves links are well-formed, not that the pages exist. The `validator` agent
spot-checks real pages with WebFetch (gate G7).

## Artifact contract (what agents must produce)

```markdown
---
artifact: 03-exercise-selection
owner: exercise-selector
run: <run-id>
inputs: [01-requirements]
status: final
---
# <Title>
## Summary
## Details
## Sources
```

Planner artifacts add the sections listed in `scripts/check-artifact.js` (`RULES`).

## When a check fails

Fix the problems the script lists, rewrite the file, and run the check again before returning
to the coordinator. Do not return an artifact that fails its check.
