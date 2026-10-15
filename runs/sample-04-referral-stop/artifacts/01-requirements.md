---
artifact: 01-requirements
owner: requirements-formalizer
run: sample-04-referral-stop
inputs: [input]
status: final
---
# Confirmed Requirements

## Summary
The user is 52, a beginner, and had heart bypass surgery eight weeks ago. They want a fast weight-loss program using dumbbells at home, 4 days per week, 45 minutes per session. They also report occasional chest tightness when climbing stairs. Gap analysis found no gaps. Safety triage returns `refer_out` because the user has a serious cardiac condition with a recent surgery and a current symptom (chest tightness). The workflow stops here and no program is built.

## Confirmed Requirements
| Item | Value |
|---|---|
| Goal | Lose weight quickly |
| Target and timeframe | Quick weight loss; no numeric target or timeframe given |
| Experience level | Beginner |
| Age band | 18+ (52) |
| Training location and equipment | Home; dumbbells |
| Days per week | 4 |
| Available days | Flexible (not specified) |
| Minutes per session | 45 |
| Limitations | Heart bypass surgery 8 weeks ago; occasional chest tightness when climbing stairs |
| Exercise preferences and dislikes | None stated |
| Cardio preference | Any |
| Units | Metric |
| Training modality | Not determined (run stopped at safety triage) |
| Session allocation (strength / cardio per week) | Not applicable (run stopped at safety triage) |
| Provisional program length | Not applicable (run stopped at safety triage) |

## Safety Triage
Decision: refer_out

Reasons:
- Heart bypass surgery 8 weeks ago. This is a recent surgery and a serious cardiac condition, so it is outside what this workflow can plan for.
- Current symptom: occasional chest tightness when climbing stairs. Chest symptoms are a red flag and need medical assessment before any exercise planning.
- Under the referral rules, any heart disease or chest pain, and any recent surgery, ends the run. The user should consult their treating cardiologist or physician before starting any exercise or weight-loss program. No program has been generated and no exercise advice is given here.

## Assumptions
none

## Execution Hints
stop
