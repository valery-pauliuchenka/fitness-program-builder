---
artifact: 07-validation-report
owner: validator
run: sample-01-beginner-home-fat-loss
inputs: [01-requirements, 02-guidelines, 03-exercise-selection, 04-training-plan, 05-cardio-plan, 06-recovery-plan]
status: final
---
# Validation Report

## Summary

Overall: **PASS**. All 8 gates pass (8 PASS, 0 FAIL).

This is a re-run after a targeted retry of the cardio stage. 01-04 are unchanged since the previous report. 05 was
revised and 06 was regenerated to match it. The cardio stage ran, so the cardio checks apply. The previous G8 failure
is resolved:
- 05 Monday cardio no longer uses half knee bends (3221). It now uses "shadow boxing straight punches over a march".
- 05 Wednesday cardio no longer uses squat to overhead reach (1685). It now uses "wall march with high knees" (3636).
- 05 "## Progression" now includes a missed-session line.

No combined session repeats an exercise between the strength block and the cardio block. Each gate's evidence and
any non-blocking observations are listed below.

## Gate Results

| Gate | Name | Result | Findings | Owner stages |
|---|---|---|---|---|
| G1 | Equipment match | PASS | - | - |
| G2 | Schedule fit | PASS | - | - |
| G3 | Limitations respected | PASS | - | - |
| G4 | Muscle coverage and balance | PASS | - | - |
| G5 | Progression defined for every phase | PASS | - | - |
| G6 | Difficulty fits experience level | PASS | - | - |
| G7 | Every recommendation links to a real source | PASS | - | - |
| G8 | Internal consistency and variety | PASS | - | - |

### Evidence per gate

**G1 Equipment match (PASS).**
- 01 allows bodyweight, a sturdy chair and a towel. It rules out dumbbells, bands and a bar.
- 04 is unchanged. All 23 ids it uses are "body weight" entries from the 03 pool or its listed progressions.
- The revised 05 Move menu uses: wall march with high knees (3636, wall), back-and-forth step (3672), shadow boxing
  hooks (2271) and straight punches (bodyweight), V step (bodyweight), and the mountain climber (0630) with "hands on
  the chair seat".
- 06 uses bodyweight moves only: pulse raiser, floor stretches on a mat or folded towel, and wall or chair support for
  the calf stretch.
- Observation (unchanged, not a violation): 05 and 06 mention "a mat", but 06 gives a folded towel as the alternative.

**G2 Schedule fit (PASS).**
- 01 requires 3 sessions of 30 min on Mon/Wed/Fri evenings, about 20 min strength plus about 10 min cardio.
- 04 schedules a 20-minute strength block that includes a 3-minute warm-up.
- 05 schedules a 10-minute block in each session ("1 min easy march, 8 work rounds / 8 min work, 1 min easy march
  cool-down") and no cardio on Tue/Thu/Sat/Sun.
- The 06 time table gives these session totals: weeks 1-2 about 29 min (12 + 2 + 10 + 5), weeks 3-4 about 30, weeks
  5-6 about 30 (16 + 2 + 10 + 2), weeks 7-8 about 29, weeks 9-11 about 29.5, week 12 about 30 (15 + 2 + 10 + 3).
- The optional walking ladder in 05 is clearly "not scheduled" and "does not count as a training session".
- Observation (unchanged): 06 makes the pulse raiser "optional, before the clock starts" in weeks 7-11. It is
  optional, and the 04 rule "drop the last round rather than cutting the warm-up or the cardio block" caps the
  session.

**G3 Limitations respected (PASS).**
- Constraints from 01: no jumping, no running, no burpees, low impact only, beginner and sedentary.
- Every new 05 move keeps one foot on the floor ("Hands on the wall, march ... No hop"; "March or step-touch on the
  spot while punching"). Phase 3 bursts are "still with one foot on the floor".
- Effort: Phase 1 is 4-5/10, matching the 02 guidance to stay light-to-moderate at first. Bursts reach 6-7/10 and
  "never go past 7".
- 06 "### Red flags" lists chest pain or discomfort, palpitations, dizziness, unusual breathlessness, sharp or joint
  pain, swelling, and the NHS 111 and 999 criteria. These match 02 "Red flags to stop and seek care". 05 also repeats
  the stop signs.
- No artifact contains diet, calorie or supplement content. 06 refers nutrition questions to a registered dietitian.

**G4 Muscle coverage and balance (PASS).**

I called musclesworked `analyze_workout` on the weekly lists, now including the cardio-block mountain climber.
musclesworked has no entry for the towel row (3165/3161/3167), so I used `inverted_row` as the nearest horizontal
pull. Marching, stepping and shadow boxing have no musclesworked entries.

- **Phase 1 week:** bodyweight_squat, bodyweight_incline_push_up, inverted_row, glute_bridge, dead_bug, wall_sit,
  side_plank, calf_raise, mountain_climber.
  - Coverage: chest, shoulders, biceps, core and calves 100%. Back 66.7%, quadriceps and glutes 75%, hip flexors
    66.7%, adductors 60%, triceps 25%, hamstrings 25%, forearms 0%.
  - Gaps reported: "Shoulders has no primary activation", "Biceps has no primary activation", "Triceps has no primary
    activation".
  - Imbalance reported: "Push-heavy (5 push vs 1 pull)".
- **Phase 3 week:** bodyweight_squat, bodyweight_push_up_on_knees, inverted_row, hip_thrust, side_plank,
  bodyweight_split_squat, glute_bridge, plank, calf_raise, mountain_climber.
  - Coverage: the same pattern.
  - Gaps reported: the same three.
  - Imbalance reported: "Push-heavy (7 push vs 1 pull)".
- **Patterns:** used are squat, lunge, hinge, horizontal push, horizontal pull, anti-rotation and extension. Missing
  are the vertical push/pull, carry and isolation patterns.

How I read the results:
- The tool counts "push" by force type. Squats, wall sit, bridges, hip thrust, calf raise and the mountain climber
  (force_type "push", confirmed with `get_muscles_worked`) all count as push.
- Counting only upper-body moves, every session has 1 horizontal push and 1 horizontal pull with equal sets (04
  "Coverage check"). The warm-up adds a reverse push-up (1772) for the upper back. The previous run showed the tool
  reports no imbalance for the upper-body pair alone.
- Every major group (legs, hips, back, chest, shoulders, arms, core) is trained 3 times a week. Arms and shoulders get
  secondary activation, and shadow boxing in the cardio block adds shoulder and arm work.
- Vertical patterns are missing because the user has no bar and no load. That fits the equipment.

For a beginner fat-loss goal with bodyweight only and a 20-minute strength block, this coverage is proportionate. There
is no major gap and no real push/pull imbalance.

**G5 Progression defined for every phase (PASS).**
- 04 "## Progression" (unchanged) gives:
  - general rules: reps, then sets, then variation; a double-progression rep rule; a hold rule; at most one change per
    week; logging
  - phase-specific rules and exit tests for Phases 1-3, plus the entry rule for late-phase items
  - a week 12 deload and re-test, reactive deload and hard-session handling, and a missed-session policy
- 05 "## Progression" gives:
  - a per-phase table (weeks 1-2, 3-4, 5-6, 7-8, 9-10, 11, 12) with duration, frequency, intensity and structure
  - rules for moving on, plus a lighter week 12 with a Friday re-test
  - the new missed-session line: "A missed session repeats the same cardio step next time rather than skipping ahead;
    follow the session-level missed-session policy of the overall program."
- 06 applies the same rule ("The cardio block repeats the same cardio step next time rather than skipping ahead"), so
  the earlier mismatch with 06 is resolved.

**G6 Difficulty fits experience level (PASS).**
- The user is a complete beginner.
- musclesworked labels: mountain_climber = beginner (re-checked with `get_muscles_worked`). bodyweight_split_squat,
  single_leg_glute_bridge and bodyweight_push_up_on_knees = intermediate.
- Incline and kneeling push-ups are reduced-load versions of push_up, which is labelled beginner. 03 documents this,
  so it is a labelling quirk, not excess difficulty.
- Split squats (2368) and the single leg bridge (3645) appear only in Phase 3, behind the Phase 2 exit test, with a
  fallback in place.
- The new cardio moves (wall march, straight punches over a march) are no harder than the ones they replace.
- The mountain climber is a "slow step-in, hands on the chair seat" and appears in Phase 3 only.
- Intensity: strength sets end 2-4 reps short of failure. Cardio is 3-5/10 in Phase 1 and never above 7/10.

**G7 Every recommendation links to a real source (PASS).** 02 is unchanged, and all 16 of its URLs were fetched and
verified in the previous run. In this run I fetched every URL cited in the revised 05 and the regenerated 06: 13
distinct pages, plus the NHS adult guidelines page that 06 also cites, for 14 in total.

05 citations:
- BHF aerobic exercises: "gradually build up until you're able to complete 10 minutes of non-stop aerobic exercise"; V
  steps; marching on the spot; "try slowing down or making the movements smaller"; warm-up "very light and easy to
  talk"; "lightly march on the spot" in the cool-down; stop for "any chest pain or heart palpitations". Confirmed.
- CDC measuring intensity: talk but not sing; vigorous "cannot say more than a few words"; 5-6 and 7-8 on a 0-10
  scale; brisk walking. Confirmed.
- CDC getting more active minutes: "Start slowly and work up to being physically active 150 minutes a week"; add a few
  minutes at a time; walking. Confirmed.
- ODPHP top 10: "at least 150 to 300 minutes"; the 10-minute bout requirement removed. Confirmed.

06 citations:
- Better Health Channel: about 5 minutes of light aerobic warm-up plus dynamic stretches; 48 h rest per muscle group;
  consult a professional if you have pain or discomfort. Confirmed.
- BHF safe limits: "start and finish at a slower pace"; stop for chest pain, palpitations, dizziness or
  light-headedness; urgent advice if symptoms persist; slow down if overly breathless. Confirmed.
- NHS stretching after exercise: about 5 minutes; 15-20 s holds; chair or wall support for the calf stretch; ask a
  physiotherapist. Confirmed.
- NHS flexibility exercises: neck rotation and neck stretch (5 s, 3 per side); sideways bend (2 s, 3 per side); calf
  stretch (3 per side); "at least twice a week"; "Build up slowly"; loose clothing and water. Confirmed.
- NHS sprains and strains: GP, 111 and 999/A&E criteria as listed in 06. Confirmed.
- CDC About Sleep: 7 or more hours for ages 18-60, plus all the listed sleep habits. Confirmed.
- CDC Steps for Losing Weight: sleep and stress management; tracking sleep; referral to a registered dietitian.
  Confirmed.
- NHS adult guidelines: "break up long periods of not moving". Confirmed.

Exercise rows: every id in 04 and 05 (3636, 3672, 2271, 0630 and the 23 strength ids) is a real dataset id listed in
03. Two cardio moves have no dataset id of their own, but both have a source:
- Straight punches belong to the shadow boxing family (2271), which the user asked for. The previous retry
  instruction named them as an acceptable replacement.
- The V step is supported by the cited BHF page.

**G8 Internal consistency and variety (PASS).**
- All artifacts agree:
  - 12 weeks in three 4-week phases (02, 04, 05, 06)
  - 3 sessions on Mon/Wed/Fri at 20 + 10 min
  - week 12 is the lighter re-test week in every plan
  - the 06 time table matches the 04 block times (12/18/16/19/19.5/15 min)
- The previous duplicate is resolved. The 04 strength-block ids (3221, 0659, 1772, 1373, 3132, 3119, 1685, 0624,
  0493, 3211, 0662, 3165, 3161, 3167, 3013, 3561, 3523, 3645, 2368, 0276, 3544, 0705, 3239) do not overlap with the
  05 cardio moves (3636, 3672, 2271 plus straight punches, V step, 0630) on any day:
  - Monday cardio: wall march, back-and-forth step, straight punches over a march.
  - Wednesday cardio: shadow boxing hooks/combos, wall march with high knees.
  - Friday cardio: V step, back-and-forth step, shadow boxing, plus the mountain climber in Phase 3.
- 05 rotates different moves each round or minute, so no move is repeated as a separate exercise within a block.
- No exercise appears twice within a strength block. 04 keeps warm-up moves out of the main block.
- Every training day has a main compound: potty squat (with support), incline push-up/towel row, squat to overhead
  reach, or split squat. The fallback for the split squat is squat to overhead reach (1685), which no longer clashes
  with the Wednesday cardio.
- 06 matches the actual schedule:
  - its cardio move list (Part 3) names exactly the revised 05 moves
  - its pulse raiser (easy march, arm circles, hip circles, torso turns) uses no strength or cardio work move, and 06
    explains why the easy march overlaps with the cardio lead-in
  - its missed-session text matches 05 and 04
  - its week 12 description matches 04 and 05
- Observation (not a violation): Wednesday cardio rotates only 2 moves, against 3 on Monday and Friday. Variety is
  still adequate for a 10-minute block.

## Retry Instructions

None
