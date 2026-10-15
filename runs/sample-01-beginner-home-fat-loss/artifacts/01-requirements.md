---
artifact: 01-requirements
owner: requirements-formalizer
run: sample-01-beginner-home-fat-loss
inputs: [input]
status: final
---
# Confirmed Requirements

## Summary

A 34-year-old complete beginner with a sedentary desk job wants to lose roughly 5 kg of body fat over a few months
(no hard deadline). Training happens at home in a small flat with bodyweight only (plus a sturdy chair and a towel),
on Monday, Wednesday and Friday evenings for 30 minutes. No injuries or limitations are reported. Running, jumping
and burpees are excluded (neighbours below, personal dislike); low-impact cardio such as walking, step-ups and
shadow boxing is welcome. Units are metric. The user wants something sustainable.

## Confirmed Requirements

| Item | Value |
|---|---|
| Goal | Fat loss |
| Target and timeframe | About 5 kg over a few months; no hard deadline |
| Experience level | Never trained / complete beginner; mostly sedentary (desk job) |
| Age band | 30-39 (age 34) |
| Training location and equipment | Home, small flat; bodyweight only plus a sturdy chair and a towel; no dumbbells, no bands |
| Days per week | 3 |
| Available days | Monday, Wednesday, Friday (evenings) |
| Minutes per session | 30 |
| Limitations | None reported (no injuries, no medical conditions, no current pain) |
| Exercise preferences and dislikes | No running or jumping (neighbours live below); dislikes burpees; wants something easy to stick to |
| Cardio preference | Low-impact only (walking, step-ups, shadow boxing) |
| Units | Metric |
| Training modality | strength+cardio |
| Session allocation (strength / cardio per week) | 3 / 3: each of the 3 sessions combines a full-body strength block (about 20 min) with a low-impact cardio block (about 10 min); total 3 sessions on 3 available days |
| Provisional program length | 12 weeks (beginner fat-loss goal of about 5 kg over a few months with no deadline; 12 weeks allows habit building and progressive overload in phases) |

## Safety Triage

Decision: proceed

- Adult (34), no injuries, medical conditions, current pain or doctor-imposed restrictions reported.
- No red flags: no pregnancy, recent surgery, heart or lung symptoms, uncontrolled blood pressure or diabetes, or
  signs of disordered eating; the weight-loss target (about 5 kg over a few months) is moderate.
- Low fitness and sedentary background are handled by beginner-level difficulty and gradual progression, not by
  medical adaptations.
- Non-medical constraints to respect: no jumping or running (noise), no burpees.

## Assumptions

- "A few months" is interpreted as roughly 3 months, used only to set the provisional program length.
- Strength and cardio share the same 3 sessions because only 3 days of 30 minutes are available; any extra
  activity (e.g. everyday walking on other days) is optional and outside the scheduled sessions.
- The chair is assumed stable enough for incline push-ups, step-ups at low height or seated/supported movements,
  and the towel can be used for sliding or isometric pulling movements on a suitable floor.
- Floor space is limited (small flat), so exercises should need about a mat-sized area.
- No nutrition, calorie or supplement guidance will be given (out of scope).

## Execution Hints

- cardio_stage: run (fat-loss goal with explicit low-impact cardio preference; modality is strength+cardio)
- equipment_profile: bodyweight-only home; sturdy chair, towel; no dumbbells, bands or pull-up bar; small floor space
- limitation_flags: no-jumping, no-running, no-burpees, low-impact-only, beginner-sedentary
