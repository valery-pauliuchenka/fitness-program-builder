---
artifact: 01-requirements
owner: requirements-formalizer
run: sample-03-knee-constrained-general-fitness
inputs: [input]
status: final
---
# Confirmed Requirements

## Summary
A 41-year-old desk worker, a beginner returning to training, wants to get stronger and generally fitter with no deadline. They train at home with adjustable dumbbells (2-20 kg), a resistance band, a mat and a sturdy chair, 3 days per week (Tuesday, Thursday, Saturday) for 40 minutes. They have mild front-of-knee discomfort with deep squats and when walking down stairs. There is no swelling, giving way, recent injury or treatment. They prefer low-impact cardio.

## Confirmed Requirements
| Item | Value |
|---|---|
| Goal | General fitness and strength |
| Target and timeframe | No specific target; no deadline |
| Experience level | Beginner (returning; some gym experience 1-2 years ago, little recently) |
| Age band | 41 (adult, 18+) |
| Training location and equipment | Home; adjustable dumbbells 2-20 kg each, resistance band, mat, sturdy chair |
| Days per week | 3 |
| Available days | Tuesday, Thursday, Saturday |
| Minutes per session | 40 |
| Limitations | Mild front-of-knee discomfort with deep squats and walking downstairs; no swelling, no giving way, no recent injury, not under treatment; walking and cycling pain-free; no other conditions |
| Exercise preferences and dislikes | None in particular |
| Cardio preference | Low-impact (cycling or brisk walking) |
| Units | Metric |
| Training modality | strength+cardio |
| Session allocation (strength / cardio per week) | 3 strength sessions with a short low-impact cardio finisher in each (about 10 minutes); no separate cardio-only days |
| Provisional program length | 8 weeks (beginner returning to training; enough time for adaptation and one progression block; to be confirmed by research) |

## Safety Triage
Decision: proceed_with_adaptations

Reasons:
- Knee discomfort is mild, only provoked by deep knee flexion under load and stair descent, with no swelling, giving way, recent injury or treatment, and walking and cycling are pain-free.
- No red flags: age 41, no pregnancy, surgery, heart or lung disease, blood pressure or diabetes issues, or doctor-imposed restrictions reported.

Adaptations needed:
- Avoid deep knee flexion under load; keep squat-type work to a pain-free range (for example box or chair squats).
- Prefer hip-dominant and low-knee-stress options; avoid impact and jumping.
- Use low-impact cardio only (cycling or brisk walking on flat ground); limit downhill and stair descents.
- Stop any exercise that increases knee pain; if discomfort worsens, consult a doctor or physiotherapist.

General exercise information, not medical advice.

## Assumptions
- "General fitness and strength" is treated as a balanced goal with no numeric target.
- Cardio is delivered as a finisher inside the 3 strength days because only 3 days are available.
- Equipment has no bike; cycling is assumed to be optional and outdoors, with brisk walking as the default.
- Provisional length of 8 weeks is chosen by the formalizer, not stated by the user.

## Execution Hints
- cardio_stage: run (modality includes low-impact cardio, user preference stated)
- equipment_profile: home; adjustable dumbbells 2-20 kg, resistance band, mat, sturdy chair
- limitation_flags: knee_anterior_discomfort, avoid_deep_knee_flexion_under_load, no_impact
