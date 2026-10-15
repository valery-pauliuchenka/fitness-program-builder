# Execution plan: sample-01-beginner-home-fat-loss

Requirements confirmed by the user. Training modality: strength+cardio (cardio_stage: run).

## Selected agents

| Stage | Agent | Reason |
|---|---|---|
| guidelines | guidelines-researcher | always run |
| exercises | exercise-selector | always run (MCP: exercise-db + musclesworked) |
| training | training-planner | always run |
| cardio | cardio-planner | modality includes cardio (strength+cardio) |
| recovery | recovery-planner | always run |
| validation | validator | always run |
| draft | program-synthesizer | always run |
| final | markdown-builder | always run, after verified human approval |

Skipped agents: none.

## Waves

1. guidelines | exercises (parallel)
2. training | cardio (parallel)
3. recovery
4. validation (gates G1-G8)
5. draft
6. human approval (hash-bound, `scripts/review.js`, run by the user)
7. final

## Gates and retries

- Artifact check after every artifact; a failure means a targeted retry of that agent only.
- Quality gates G1-G8 in the validator; failures are retried only for the owner stages the report names, and stale downstream stages are regenerated.
- Retry limit: 3 per stage. Exceeding it stops the run and the failure is reported.
