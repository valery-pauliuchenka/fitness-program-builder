# Runs

Each folder here is one workflow run: its input, the artifacts every agent produced, the persisted
`workflow-state.json`, the human approval record, and the final program.

| Run | Scenario | What it demonstrates | Expected outcome |
|---|---|---|---|
| `sample-01-beginner-home-fat-loss` | Beginner, bodyweight only, fat loss, 3 x 30 min | strength + cardio modality, cardio-planner selected | full program |
| `sample-02-intermediate-gym-muscle-gain` | Intermediate, full gym, hypertrophy, 4 x 60 min | strength-only modality, cardio-planner **skipped** | full program |
| `sample-03-knee-constrained-general-fitness` | Returning beginner, dumbbells + band, mild knee discomfort | limitation adaptations, gate G3, low-impact cardio | full program |
| `sample-04-referral-stop` | Recent heart surgery + chest tightness | safety triage stops the run | referral message, no program |

Only `input.md` and `answers.md` are provided. The artifacts appear when you run the workflow:

```
/build-program from sample-01-beginner-home-fat-loss
```

Confirm the requirements when asked, then approve the draft with `! node scripts/review.js approve <run-id>`.
Afterwards commit the whole folder (`git add runs/sample-01-...`): `.gitignore` already lets `runs/sample-*` through
while keeping your own ad-hoc runs local.
