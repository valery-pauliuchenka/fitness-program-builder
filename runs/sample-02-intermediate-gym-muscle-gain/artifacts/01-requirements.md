---
artifact: 01-requirements
owner: requirements-formalizer
run: sample-02-intermediate-gym-muscle-gain
inputs: [input]
status: final
---
# Confirmed Requirements

## Summary

A 28-year-old intermediate lifter (about 2 years of consistent training) wants to build muscle (general hypertrophy, no
deadline). Training takes place in a full commercial gym on Monday, Tuesday, Thursday and Friday, 60 minutes per session.
No injuries or limitations are reported. The user prefers free weights and compound lifts, dislikes the leg extension
machine, and wants no dedicated cardio beyond a short warm-up. Units are metric (kg).

## Confirmed Requirements

| Item | Value |
|---|---|
| Goal | Muscle gain (hypertrophy) |
| Target and timeframe | General hypertrophy; no specific target or deadline |
| Experience level | Intermediate; about 2 years of consistent training; comfortable with squat, bench press, deadlift, rows and overhead press |
| Age band | 18-39 (age 28) |
| Training location and equipment | Full commercial gym: barbells, racks, dumbbells, cables, machines, pull-up bar, benches |
| Days per week | 4 |
| Available days | Monday, Tuesday, Thursday, Friday |
| Minutes per session | 60 |
| Limitations | None reported (no injuries, medical conditions or current pain) |
| Exercise preferences and dislikes | Prefers free weights and compound lifts; dislikes the leg extension machine (exclude it) |
| Cardio preference | None beyond a short warm-up |
| Units | Metric (kg) |
| Training modality | strength-only |
| Session allocation (strength / cardio per week) | 4 strength / 0 cardio (warm-up only, inside the 60 minutes) |
| Provisional program length | 12 weeks (intermediate hypertrophy without a deadline: long enough for several progressive blocks with a planned deload; to be confirmed by guidelines research) |

## Safety Triage

Decision: proceed

- Adult (28), within the supported age range.
- No injuries, limitations, medical conditions or current pain reported.
- No red flags: no pregnancy, recent surgery, cardiovascular or respiratory symptoms, doctor restrictions, or
  weight-loss goal with signs of disordered eating.
- Two years of consistent training with the main barbell lifts, so standard intermediate loading is appropriate.

## Assumptions

- Age band expressed as 18-39 from the stated age of 28.
- The short warm-up (general and lift-specific) is counted inside the 60-minute session, not as a separate cardio session.
- "Prefers free weights" is a preference, not an exclusion: cables and machines (other than the leg extension machine) may be
  used as accessories where they serve the goal.
- No goal-specific bodyweight or strength targets were given; progress is judged by progressive load and volume.

## Execution Hints

- cardio_stage: skip (user wants no dedicated cardio beyond a short warm-up; modality is strength-only)
- equipment_profile: full-gym (barbells, racks, dumbbells, cables, machines, pull-up bar, benches); prefer free-weight compounds; exclude leg extension machine
- limitation_flags: none
