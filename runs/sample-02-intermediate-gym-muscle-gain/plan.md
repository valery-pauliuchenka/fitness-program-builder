# Execution Plan: sample-02-intermediate-gym-muscle-gain

Requirements confirmed by the user. Safety triage: proceed. Modality: strength-only.

## Agent selection

| Agent | Selected | Reason |
|---|---|---|
| guidelines-researcher | yes | always |
| exercise-selector | yes | always |
| training-planner | yes | always |
| cardio-planner | **skipped** | strength-only modality; user wants no dedicated cardio beyond a short warm-up |
| recovery-planner | yes | always |
| validator | yes | always |
| program-synthesizer | yes | always |
| markdown-builder | yes | always (after human approval) |

## Waves

1. guidelines + exercises (parallel)
2. training
3. recovery
4. validation (gates G1-G8)
5. draft
6. human approval (review.js, run by the user)
7. final

## Rules

- Artifact check after every stage before dependents start.
- Gate failures: targeted retry of the owner stages named by the validator; limit 3 retries per stage.
- Final write only with approval bound to the current draft hash.
