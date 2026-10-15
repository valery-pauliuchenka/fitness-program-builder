---
artifact: 04-training-plan
owner: training-planner
run: sample-02-intermediate-gym-muscle-gain
inputs: [01-requirements, 02-guidelines, 03-exercise-selection]
status: final
---
# Training Plan

## Summary

This is a 12-week upper/lower hypertrophy plan for an intermediate lifter (28, about 2 years of training). It runs in a
full commercial gym on Monday, Tuesday, Thursday and Friday, with 4 strength sessions a week and 0 cardio sessions,
matching "Session allocation" in 01-requirements. Each session takes 60 minutes or less, and that time includes a
10-minute warm-up. Estimated session times run from 50 to 57 minutes, which leaves a buffer.

- **Split.** Upper A (Mon), Lower A (Tue), Upper B (Thu), Lower B (Fri). Every major muscle is trained twice a week,
  with at least 72 hours between sessions for the same muscles
  ([Schoenfeld et al. 2016](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:27102172&resultType=core&format=json),
  [Better Health Channel](https://www.betterhealth.vic.gov.au/health/healthyliving/resistance-training-health-benefits)).
- **Phases.** The phases follow "Recommended Program Length" in 02-guidelines:
  - Phase 1 Build (weeks 1-5): about 10-12 weekly sets per major muscle, stopping 2-3 reps short of failure.
  - Deload (week 6).
  - Phase 2 Progress (weeks 7-11): about 12-14 weekly sets per major muscle, stopping 1-2 reps short of failure.
  - Deload and retest (week 12).
- **Dose.** Main compound lifts use 6-10 reps and accessories use 8-20 reps
  ([ACSM 2009](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:19204579&resultType=core&format=json)).
  Rest is about 3 minutes between sets of the same main lift. Paired sets keep the session within 60 minutes
  ([Schoenfeld et al. 2016, rest](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:26605807&resultType=core&format=json)).
- **Exercises.** Every exercise comes from the vetted pool in 03-exercise-selection (dataset ids given), and no swaps were
  needed.
  - Free-weight compounds anchor every session.
  - Cables and machines appear only as accessories.
  - The leg extension machine is not used.
  - Phase 2 changes a few accessories for variety, while the main lifts stay the same
    ([Better Health Channel](https://www.betterhealth.vic.gov.au/health/healthyliving/resistance-training-health-benefits)).
- **Progression.** Each phase uses double progression: work up through the rep range, then add load
  ([ACSM 2009](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:19204579&resultType=core&format=json)).
  Planned deloads come in weeks 6 and 12
  ([Bell et al. 2023](https://www.ebi.ac.uk/europepmc/webservices/rest/PMC10511399/fullTextXML)).

This is general exercise information, not medical advice.

## Details

### Structure

**Length and phases.** 12 weeks, as set in "Recommended Program Length" in 02-guidelines.

| Phase | Weeks | Sessions used | Weekly hard sets per major muscle | Effort (reps in reserve, RIR) | Main-lift reps | Accessory reps |
|---|---|---|---|---|---|---|
| Phase 1: Build | 1-5 | Phase 1 sessions | about 10-12 | 2-3 RIR on everything | 6-8 / 6-10 | 8-15 |
| Deload 1 | 6 | Phase 1 sessions, reduced (see Deload weeks) | about 5-6 | 4 or more RIR | as Phase 1 | as Phase 1 |
| Phase 2: Progress | 7-11 | Phase 2 sessions | about 12-14 | 2 RIR on barbell compounds; 1-2 RIR on dumbbell, bodyweight and machine compounds; 0-1 RIR on the last set of isolation work | 6-8 / 6-10 | 8-20 |
| Deload 2 and retest | 12 | Phase 2 sessions, reduced, plus one retest set per main lift | about 6-7 | 4 or more RIR (2 RIR on the retest set) | as Phase 2 | as Phase 2 |

The phase effort targets follow 02-guidelines. Failure is not needed for growth
([Refalo et al. 2023](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:36334240&resultType=core&format=json)),
and heavy barbell compounds always stay at 2 or more RIR for safety.

**Weekly layout (all weeks).**

| Day | Session | Duration (estimate, including the 10-min warm-up) |
|---|---|---|
| Monday | Upper A: horizontal press and row focus | Phase 1 about 50 min; Phase 2 about 57 min; deload about 35-40 min |
| Tuesday | Lower A: squat focus | Phase 1 about 57 min; Phase 2 about 57 min; deload about 35-40 min |
| Wednesday | Rest (everyday walking is fine; no training prescribed) | - |
| Thursday | Upper B: incline press and vertical pull focus | Phase 1 about 56 min; Phase 2 about 57 min; deload about 35-40 min |
| Friday | Lower B: hinge focus | Phase 1 about 56 min; Phase 2 about 54 min; deload about 35-40 min |
| Saturday, Sunday | Rest | - |

This gives 4 strength sessions a week on the 4 available days and 0 cardio sessions. The upper days are 72 hours apart
(Mon to Thu) and so are the lower days (Tue to Fri). The gap from Friday to Monday is longer. Both gaps exceed the
roughly 48 hours of recovery per muscle group recommended by the
[Better Health Channel](https://www.betterhealth.vic.gov.au/health/healthyliving/resistance-training-health-benefits).

**Time model used for every estimate.**

- A working set takes about 45 s. A single-leg or single-arm set takes about 90 s (both sides), plus 15 s to switch sides.
- Each exercise gets 1 minute of setup.
- Duration = 10-min warm-up + setup + the sum of (set time + listed rest).
- Paired sets (A1/A2) and tri-sets (C1/C2/C3) are done as alternating rounds: one set of A1, the listed rest, one set of
  A2, the listed rest, then repeat. The same muscle still gets about 3-3.75 minutes between its sets on the paired main
  lifts. This matches the evidence favouring longer rests for trained lifters
  ([Schoenfeld et al. 2016, rest](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:26605807&resultType=core&format=json))
  and fits the 60-minute budget. Pairs always join exercises that do not compete for the same prime movers, for example
  a press with a pull, or a squat with calves.
- If a session runs over 60 minutes, drop the last round of the final tri-set or pair. Never cut the warm-up or the
  main lift.

**Weekly volume check.** Direct sets count as 1. Sets where the muscle is a secondary mover count as 0.5, using the
secondary muscles listed in 03-exercise-selection.

| Muscle group | Phase 1 sets/week | Phase 2 sets/week | Main contributors |
|---|---|---|---|
| Quadriceps | 10 direct + 1.5 = about 11.5 | 11 direct + 1.5 = about 12.5 | back squat, Bulgarian split squat, leg press, deadlift (secondary) |
| Hamstrings | 9 direct + 3 = about 12 | 10 direct + 3 = about 13 | Romanian deadlift, seated and lying leg curl, deadlift and glute bridge (secondary) |
| Glutes | 12 direct + 3.5 = about 15.5 | 13 direct + 3.5 = about 16.5 | squat, split squat, deadlift, glute bridge, RDL and leg press (secondary) |
| Chest | 9 direct + 1.5 = about 10.5 | 11 direct + 1.5 = about 12.5 | bench press, incline press, chest dip, overhead press (secondary) |
| Back (lats, mid back) | 12 | 14 | bent-over row, lat pulldown, pull-up, chest-supported row |
| Shoulders: side delts | 6 direct + 1.5 = about 7.5 | 6 direct + 1.5 = about 7.5 | lateral raises (dumbbell and cable), overhead press |
| Shoulders: rear delts | 3 direct + 3 = about 6 | 3 direct + 3.5 = about 6.5 | cable rear delt row (Phase 1), dumbbell rear lateral raise (Phase 2), rows |
| Biceps | 4 direct + 6 = about 10 | 6 direct + 7 = about 13 | curls, all pulling |
| Triceps | 4 direct + 6 = about 10 | 3 direct + 7 = about 10 | skull crusher, pushdown, all pressing |
| Calves | 6 | 8 | standing calf raise, seated calf press |
| Abs / trunk | 6 direct + stabilising work in squats, deadlifts, rows and standing presses | 6 direct + stabilising | hanging leg raise, cable kneeling crunch |

- The large muscle groups (legs, glutes, chest, back) meet the 10-sets floor in Phase 1
  ([ACSM 2026](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=PMCID:PMC12965823&resultType=core&format=json))
  and rise to about 12-16 in Phase 2, following the dose-response evidence
  ([Schoenfeld et al. 2017](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:27433992&resultType=core&format=json),
  [Pelland et al. 2026](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:41343037&resultType=core&format=json)).
- Smaller muscles (delts, arms, calves, abs) get 6-8 direct sets plus their compound work. This is a time-budget
  judgment for 4 x 60 minutes.
- Push and pull are balanced. Compound sets are 12 push vs 12 pull in Phase 1 and 14 vs 14 in Phase 2, plus rear-delt
  work.

### Sessions

#### Warm-up (every session, about 10 minutes, counted inside the 60 minutes)

This follows the warm-up guidance from the
[Better Health Channel](https://www.betterhealth.vic.gov.au/health/healthyliving/resistance-training-health-benefits)
cited in 02-guidelines.

1. **Light aerobic activity, 5 min.** Easy rowing machine or bike at a pace where you can talk. This is warm-up only, not a
   cardio session.
2. **Dynamic range-of-motion drills, 2 min.**
   - Upper days: arm circles, band-free shoulder rolls and thoracic rotations.
   - Lower days: leg swings, hip circles and ankle rocks.
3. **Ramp-up sets of the first main lift, about 3 min.** Do 2-3 short sets at about 40%, 60% and 80% of the working
   load, with 3-5 reps each and short rests. These are lighter warm-up sets of the same exercise, not an extra
   exercise, so no exercise repeats within a session.

#### Phase 1 (weeks 1-5): Upper A (Monday), about 50 min

| Exercise | Sets x Reps | Rest | Equipment | Coaching cue | Easier / harder option |
|---|---|---|---|---|---|
| A1. Barbell bench press (0025), main compound | 3 x 6-8 | 90 s, then A2 | barbell, bench, rack (safety pins set) | Shoulder blades pulled back and down, feet planted. Touch the lower chest, then press up and slightly back. | Easier: Dumbbell bench press (0289), lighter. Harder: 1-s pause on the chest |
| A2. Barbell bent over row (0027) | 3 x 8-10 | 90 s, then A1 | barbell | Hinge to about 45°, flat back, pull the bar to the lower ribs, no torso swing | Easier: Cable low seated row (0180). Harder: 1-s pause at the torso |
| B1. Barbell standing close grip military press (1456) | 3 x 6-10 | 60 s, then B2 | barbell, rack | Glutes and abs braced, press the bar in a straight line, head moves through at lockout | Easier: Barbell seated overhead press (0091). Harder: Dumbbell standing overhead press (0426) |
| B2. Cable bar lateral pulldown (0150) | 3 x 8-12 | 60 s, then B1 | cable | Chest up, pull the bar to the upper chest by driving the elbows down, control the return | Easier: lighter pin, 2-s lowering. Harder: Pull-up (0652) |
| C1. Dumbbell lateral raise (0334) | 3 x 12-15 | 30 s | dumbbell | Slight forward lean, lead with the elbows, stop at shoulder height | Easier: lighter, partial range. Harder: Cable lateral raise (0178) |
| C2. Barbell curl (0031) | 2 x 8-12 | 30 s | barbell (straight or EZ) | Elbows fixed at the sides, no hip swing, 2-s lowering | Easier: Dumbbell hammer curl (0313). Harder: 3-s lowering |
| C3. Cable pushdown with rope (0200) | 2 x 10-15 | 30 s, then next round | cable | Elbows pinned, spread the rope at the bottom, full lockout | Easier: lighter pin. Harder: Cable overhead triceps extension (0194) |

Do C1-C3 as a tri-set. Round 3 is C1 only.

#### Phase 1 (weeks 1-5): Lower A (Tuesday), about 57 min

| Exercise | Sets x Reps | Rest | Equipment | Coaching cue | Easier / harder option |
|---|---|---|---|---|---|
| 1. Barbell full squat / back squat (0043), main compound | 3 x 6-8 | 3 min | barbell, rack (safety pins set) | Brace before each rep, knees track over the toes, descend to at least parallel with a neutral spine | Easier: Dumbbell goblet squat (1760) or Sled 45° leg press (1463). Harder: 3-s lowering or a 1-s pause at the bottom |
| 2. Barbell romanian deadlift (0085) | 3 x 8-10 | 2 min | barbell | Soft knees, push the hips back, bar close to the legs, stop when the hamstrings are fully stretched and the back is still flat | Easier: lighter load, shorter range. Harder: 3-s lowering |
| 3. Dumbbell single leg split squat / Bulgarian split squat (0410) | 3 x 8-12 per leg | 60 s after both legs | dumbbell, bench | Rear foot on the bench, most of the weight on the front foot, front knee travels forward over the toes | Easier: Dumbbell rear lunge (0381). Harder: heavier dumbbells or front foot on a plate (deficit) |
| C1. Lever seated leg curl (0599) | 3 x 10-15 | 40 s | leverage machine | Pad just above the ankles, curl fully, 2-s return | Easier: lighter pin. Harder: 3-s lowering |
| C2. Barbell standing calf raise (1372) | 3 x 10-15 | 40 s | barbell or standing calf machine | Full stretch at the bottom with a 1-s pause, then rise fully onto the toes | Easier: Lever seated calf press (2335). Harder: 2-s pause at the bottom |
| C3. Hanging leg raise (0472) | 3 x 10-15 | 40 s, then next round | pull-up bar | Curl the pelvis up toward the ribs, no swinging | Easier: Assisted hanging knee raise (0011). Harder: 3-s lowering |

#### Phase 1 (weeks 1-5): Upper B (Thursday), about 56 min

| Exercise | Sets x Reps | Rest | Equipment | Coaching cue | Easier / harder option |
|---|---|---|---|---|---|
| A1. Barbell incline bench press (0047), main compound | 3 x 6-10 | 90 s, then A2 | barbell, incline bench, rack (safety pins set) | Bench at 30-45°, touch the upper chest, wrists stacked over the elbows | Easier: Dumbbell incline bench press (0314), lighter. Harder: 1-s pause on the chest |
| A2. Pull-up (0652), main compound | 3 x 6-10 | 90 s, then A1 | pull-up bar | Start from a dead hang, pull the chest to the bar, lower under control | Easier: Assisted pull-up (0017) or Cable bar lateral pulldown (0150). Harder: add load with a belt once all sets reach 10 |
| B1. Dumbbell incline row, chest-supported (0327) | 3 x 10-12 | 60 s, then B2 | dumbbell, incline bench | Chest stays on the pad, pull the elbows back toward the hips, squeeze the shoulder blades | Easier: Cable low seated row (0180). Harder: Dumbbell one arm bent-over row (0292), heavier |
| B2. Chest dip (0251) | 3 x 8-12 | 60 s, then B1 | dip station | Lean forward, lower until the upper arms are about parallel to the floor, shoulders down | Easier: Barbell close-grip bench press (0030). Harder: add load with a dip belt once all sets reach 12 |
| C1. Cable lateral raise (0178) | 3 x 12-15 | 30 s | cable | Cable behind the body, raise out to the side to shoulder height | Easier: Dumbbell lateral raise (0334), lighter. Harder: 2-s lowering |
| C2. Cable rear delt row with rope (0203) | 3 x 12-15 | 30 s, then next round | cable | Rope at face height, pull toward the forehead with elbows high, rotate the hands back | Easier: Dumbbell rear lateral raise (0380), light. Harder: 1-s hold at the end |
| D1. Dumbbell incline curl (0318) | 2 x 10-12 | 45 s | dumbbell, incline bench | Arms hang straight down behind the torso, full stretch at the bottom | Easier: Barbell curl (0031). Harder: 3-s lowering |
| D2. Barbell lying triceps extension / skull crusher (0060) | 2 x 8-12 | 45 s, then next round | barbell or EZ bar, bench | Upper arms angled slightly back, lower the bar to just behind the head | Easier: Cable pushdown (0200). Harder: Barbell close-grip bench press (0030) for a heavier compound stimulus |

#### Phase 1 (weeks 1-5): Lower B (Friday), about 56 min

| Exercise | Sets x Reps | Rest | Equipment | Coaching cue | Easier / harder option |
|---|---|---|---|---|---|
| 1. Barbell deadlift (0032), main compound | 3 x 6-8 | 3 min | barbell | Bar over mid-foot, take the slack out of the bar, brace, push the floor away, reset each rep | Easier: Barbell romanian deadlift (0085), lighter. Harder: add a back-off set (Phase 2 option) |
| 2. Sled 45° leg press (1463) | 4 x 10-12 | 90 s | sled machine | Feet shoulder-width, lower until the hips start to tuck, do not lock the knees hard | Easier: shorter range at first. Harder: 3-s lowering |
| 3. Barbell glute bridge / hip thrust pattern (1409) | 3 x 8-12 | 90 s | barbell, bench or floor, bar pad | Chin tucked, ribs down, drive through the heels, 1-s squeeze at the top | Easier: from the floor (glute bridge). Harder: shoulders on the bench (hip thrust) |
| C1. Lever lying leg curl (0586) | 3 x 10-15 | 40 s | leverage machine | Hips pressed into the pad, curl fully, 2-s return | Easier: Lever seated leg curl (0599). Harder: 3-s lowering |
| C2. Lever seated calf press (2335) | 3 x 12-15 | 40 s | leverage machine | Full stretch at the bottom with a 1-s pause | Easier: lighter pin. Harder: Barbell standing calf raise (1372) |
| C3. Cable kneeling crunch (0175) | 3 x 10-15 | 40 s, then next round | cable (rope) | Hips stay still, curl the ribs toward the pelvis | Easier: light load. Harder: Weighted front plank (2135) as an added anti-extension set |

#### Phase 2 (weeks 7-11): Upper A (Monday), about 57 min

Changes from Phase 1: an extra set on bench press and row, and a new accessory tri-set for variety. The rear delt
moves to this day, and triceps get their direct work on Thursday.

| Exercise | Sets x Reps | Rest | Equipment | Coaching cue | Easier / harder option |
|---|---|---|---|---|---|
| A1. Barbell bench press (0025), main compound | 4 x 6-8 | 90 s, then A2 | barbell, bench, rack (safety pins set) | As Phase 1. Stop each set at 2 RIR | Easier: Dumbbell bench press (0289). Harder: 1-s pause on the chest |
| A2. Barbell bent over row (0027) | 4 x 8-10 | 90 s, then A1 | barbell | As Phase 1 | Easier: Cable low seated row (0180). Harder: 1-s pause at the torso |
| B1. Barbell standing close grip military press (1456) | 3 x 6-10 | 60 s, then B2 | barbell, rack | As Phase 1 | Easier: Barbell seated overhead press (0091). Harder: Dumbbell standing overhead press (0426) |
| B2. Cable bar lateral pulldown (0150) | 3 x 8-12 | 60 s, then B1 | cable | As Phase 1. Take the last set to 1 RIR | Easier: lighter pin. Harder: Pull-up (0652) |
| C1. Dumbbell lateral raise (0334) | 3 x 12-20 | 30 s | dumbbell | As Phase 1. Take the last set to 0-1 RIR | Easier: lighter. Harder: Cable lateral raise (0178) |
| C2. Dumbbell rear lateral raise (0380) | 3 x 12-15 | 30 s | dumbbell | Hinge forward, arms slightly bent, sweep out wide, do not shrug | Easier: lighter, chest supported on an incline bench. Harder: Cable rear delt row (0203) |
| C3. Dumbbell hammer curl (0313) | 3 x 10-12 | 30 s, then next round | dumbbell | Neutral grip, elbows fixed, 2-s lowering | Easier: lighter. Harder: Barbell curl (0031) |

#### Phase 2 (weeks 7-11): Lower A (Tuesday), about 57 min

Changes from Phase 1: one more squat set, with calves paired with the squat to save time, one more calf set, and core
paired with the split squat.

| Exercise | Sets x Reps | Rest | Equipment | Coaching cue | Easier / harder option |
|---|---|---|---|---|---|
| A1. Barbell full squat / back squat (0043), main compound | 4 x 6-8 | 75 s, then A2 | barbell, rack (safety pins set) | As Phase 1. Stop each set at 2 RIR. About 3 min passes between squat sets | Easier: Sled 45° leg press (1463). Harder: 3-s lowering |
| A2. Barbell standing calf raise (1372) | 4 x 10-15 | 60 s, then A1 | standing calf machine (keeps the squat rack free) | As Phase 1 | Easier: Lever seated calf press (2335). Harder: 2-s pause at the bottom |
| 2. Barbell romanian deadlift (0085) | 3 x 8-10 | 2 min | barbell | As Phase 1 | Easier: lighter load. Harder: 3-s lowering |
| B1. Dumbbell single leg split squat / Bulgarian split squat (0410) | 3 x 8-12 per leg | 45 s, then B2 | dumbbell, bench | As Phase 1. Stop at 1-2 RIR | Easier: Dumbbell rear lunge (0381). Harder: deficit |
| B2. Hanging leg raise (0472) | 3 x 10-15 | 60 s, then B1 | pull-up bar | As Phase 1 | Easier: Assisted hanging knee raise (0011). Harder: 3-s lowering |
| 4. Lever seated leg curl (0599) | 3 x 10-15 | 60 s | leverage machine | As Phase 1. Take the last set to 0-1 RIR | Easier: lighter pin. Harder: 3-s lowering |

#### Phase 2 (weeks 7-11): Upper B (Thursday), about 57 min

Changes from Phase 1: the incline press switches to dumbbells, as the block rotation in 03-exercise-selection suggests.
Incline press and pull-up get an extra set, and arms move into a tri-set with the side delts.

| Exercise | Sets x Reps | Rest | Equipment | Coaching cue | Easier / harder option |
|---|---|---|---|---|---|
| A1. Dumbbell incline bench press (0314), main compound | 4 x 8-10 | 90 s, then A2 | dumbbell, incline bench | Bench at 30-45°, lower the dumbbells to the sides of the upper chest, press up and slightly in | Easier: lighter dumbbells. Harder: Barbell incline bench press (0047) |
| A2. Pull-up (0652), main compound | 4 x 6-10 | 90 s, then A1 | pull-up bar (dip belt for added load) | As Phase 1. Stop at 1-2 RIR | Easier: Assisted pull-up (0017). Harder: weighted pull-up |
| B1. Dumbbell incline row, chest-supported (0327) | 3 x 10-12 | 60 s, then B2 | dumbbell, incline bench | As Phase 1 | Easier: Cable low seated row (0180). Harder: Dumbbell one arm bent-over row (0292) |
| B2. Chest dip (0251) | 3 x 8-12 | 60 s, then B1 | dip station (dip belt) | As Phase 1 | Easier: Barbell close-grip bench press (0030). Harder: weighted chest dip |
| C1. Cable lateral raise (0178) | 3 x 12-20 | 30 s | cable | As Phase 1. Take the last set to 0-1 RIR | Easier: Dumbbell lateral raise (0334). Harder: 2-s lowering |
| C2. Dumbbell incline curl (0318) | 3 x 10-12 | 30 s | dumbbell, incline bench | As Phase 1 | Easier: Barbell curl (0031). Harder: 3-s lowering |
| C3. Barbell lying triceps extension / skull crusher (0060) | 3 x 8-12 | 30 s, then next round | barbell or EZ bar, bench | As Phase 1 | Easier: Cable pushdown (0200). Harder: Cable overhead triceps extension (0194) for a longer stretch |

#### Phase 2 (weeks 7-11): Lower B (Friday), about 54 min

Changes from Phase 1: core is paired with the deadlift and calves with the leg press, which frees time for a fourth
leg curl set and one more calf set.

| Exercise | Sets x Reps | Rest | Equipment | Coaching cue | Easier / harder option |
|---|---|---|---|---|---|
| A1. Barbell deadlift (0032), main compound | 3 x 6-8 | 90 s, then A2 | barbell | As Phase 1. Stop each set at 2 RIR. About 3 min passes between deadlift sets | Easier: Barbell romanian deadlift (0085). Harder: one back-off set of 8-10 at -10% (only if under 60 min) |
| A2. Cable kneeling crunch (0175) | 3 x 10-15 | 75 s, then A1 | cable (rope) | As Phase 1 | Easier: light load. Harder: Weighted front plank (2135) |
| B1. Sled 45° leg press (1463) | 4 x 10-12 | 60 s, then B2 | sled machine | As Phase 1. Stop at 1-2 RIR | Easier: shorter range. Harder: 3-s lowering |
| B2. Lever seated calf press (2335) | 4 x 12-15 | 60 s, then B1 | leverage machine | As Phase 1 | Easier: lighter pin. Harder: Barbell standing calf raise (1372) |
| 3. Barbell glute bridge / hip thrust pattern (1409) | 3 x 8-12 | 75 s | barbell, bench, bar pad | Shoulders on the bench (hip thrust version), 1-s squeeze at the top | Easier: from the floor. Harder: 2-s hold at the top |
| 4. Lever lying leg curl (0586) | 4 x 10-15 | 60 s | leverage machine | As Phase 1. Take the last set to 0-1 RIR | Easier: Lever seated leg curl (0599). Harder: 3-s lowering |

#### Deload weeks (week 6 and week 12)

These weeks follow the deload consensus: fewer sets and further from failure
([Bell et al. 2023](https://www.ebi.ac.uk/europepmc/webservices/rest/PMC10511399/fullTextXML)).

| Week | Sessions | Sets x Reps | Rest | Load and effort | Duration |
|---|---|---|---|---|---|
| 6 (Deload 1) | Same 4 Phase 1 sessions, same exercises, days and order | Every exercise at 2 sets (3- and 4-set exercises drop to 2, 2-set exercises drop to 1), reps at the bottom of the range | as Phase 1 | Main lifts at about 90% of the week-5 working load; accessories at the week-5 load; 4 or more RIR, nothing near failure | about 35-40 min including warm-up |
| 12 (Deload 2 and retest) | Same 4 Phase 2 sessions | As week 6, but the first working set of each main lift is a retest set (below) | as Phase 2 | Retest set: the week-7 starting load for as many reps as possible, stopping at 2 RIR. Record the reps. All other sets at 4 or more RIR | about 35-45 min including warm-up |

Week-12 retest sets: bench press (Mon), back squat (Tue), pull-up and dumbbell incline press (Thu), deadlift (Fri).
Comparing these reps with week 7 shows progress and sets the starting loads for the next cycle, as 02-guidelines
recommends.

## Progression

These rules apply to every phase. Load steps follow ACSM: add 2-10% once you can do 1-2 reps above the target
([ACSM 2009](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:19204579&resultType=core&format=json),
[Better Health Channel](https://www.betterhealth.vic.gov.au/health/healthyliving/resistance-training-health-benefits)).
The kg increments are the plate conversion given in 02-guidelines and 03-exercise-selection.

**Double progression.** Each rep range works as "target reps" (the bottom) plus 1-2 or more reps of headroom.

1. Start each exercise at a load that gives the bottom of the rep range at the phase's RIR target.
2. Each session, try to add 1 rep to at least one set at the same load, keeping the RIR target.
3. When every set reaches the top of the range at the target RIR, increase the load at the next session of that
   exercise:
   - back squat, deadlift, Romanian deadlift, glute bridge: +2.5-5 kg
   - bench press, incline bench, overhead press, bent-over row, skull crusher, barbell curl: +1-2.5 kg
   - dumbbell exercises: the next dumbbell size (+1-2.5 kg per dumbbell)
   - cable and machine exercises: the next pin (smallest step)
   - pull-up and chest dip: once all sets reach the top of the range with bodyweight, add 2.5 kg with a belt
4. After a load increase, reps drop back toward the bottom of the range, and you build them up again.

**Phase 1: Build (weeks 1-5).**

- Week 1 is calibration. Choose loads that leave about 3 RIR at the bottom of the range. If a set ends with 4 or more
  RIR, add load next session even if the top of the range was not reached.
- Weeks 2-5: add reps or load every week on each exercise, following "add load or reps each week" in 02-guidelines.
  Keep 2-3 RIR on every set.
- Pass test: by week 5, each main lift (bench, row, overhead press, squat, deadlift, incline bench, pull-up) has at least
  one load increase or at least 4 more total reps than in week 1 at the same load. If a lift fails this test, start it
  in Phase 2 at the week-5 load rather than higher.

**Phase 2: Progress (weeks 7-11).**

- Week 7 loads:
  - Main lifts carried over from Phase 1 (bench, row, overhead press, squat, Romanian deadlift, deadlift, pull-up, chest
    dip): use the week-5 working load. After the deload they will feel lighter at the new effort target.
  - New or swapped exercises (dumbbell incline press, dumbbell rear lateral raise, dumbbell hammer curl, and the
    exercises that move to a different slot): pick a load that gives the bottom of the range at 2 RIR.
- Volume is already higher through the extra sets listed in the Phase 2 tables (main lifts 3 to 4 sets; calves and leg
  curls 3 to 4).
- Effort targets:
  - barbell compounds: 2 RIR
  - dumbbell, bodyweight and machine compounds: 1-2 RIR
  - isolation: the last set at 0-1 RIR
- Keep using the double-progression load steps above. Expect weekly progress mostly on accessories and on reps, and a
  load step on the main lifts every 1-2 weeks.
- Optional extra volume, only if the session is finishing under 55 minutes and the last two sessions went well: in weeks
  9-11 add one back-off set (8-10 reps at -10%) to the deadlift on Friday. This stays within the 12-16-set range in
  02-guidelines.

**Missed or hard sessions (all phases).**

- **Hard set.** If a set falls below the bottom of the rep range, or a barbell compound reaches 0-1 RIR, finish the
  remaining sets at -5% load. Keep that load next session.
- **Stalled lift.** If the same lift misses the bottom of its range in 2 sessions in a row, reduce its load by about 10%
  and build back up with double progression.
- **Performance dropping across lifts.** If performance falls on several lifts for 2 or more sessions in a row, or sleep
  or soreness is clearly worse, take an extra lighter week run like week 6. Then continue where you stopped. This is the
  autoregulated deload that 02-guidelines allows.
- **One missed session.** Do not double up. Do the missed session on the next training day and push the rest of the week
  back by one session. Keep the planned loads. If a week ends with a session left over, skip it and start the next week
  with Upper A.
- **One week or more missed.** Repeat the last completed week at about 90% of its loads, then resume progression.
- **Pain.** If you feel pain (rather than normal muscle effort), stop progressing that exercise and use its "Easier"
  option. If it persists, see a health professional
  ([Better Health Channel](https://www.betterhealth.vic.gov.au/health/healthyliving/resistance-training-health-benefits)).
  Stop exercising at once if you have chest pain, palpitations, dizziness or light-headedness
  ([British Heart Foundation](https://www.bhf.org.uk/informationsupport/heart-matters-magazine/activity/finding-safe-exercise-limits),
  [NHLBI](https://www.nhlbi.nih.gov/health/heart/physical-activity/risks)).

**Deloads.**

- Week 6 (after Phase 1) and week 12 (after Phase 2) are planned deloads, as set out in the Deload weeks table
  ([Bell et al. 2023](https://www.ebi.ac.uk/europepmc/webservices/rest/PMC10511399/fullTextXML)).
- An extra autoregulated deload follows the "Performance dropping across lifts" rule above.

## Sources

- ACSM 2009 position stand on progression models in resistance training: 3-4 days/week for intermediate lifters,
  6-12 RM for hypertrophy, 2-10% load increases after exceeding the target by 1-2 reps.
  https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:19204579&resultType=core&format=json
- ACSM 2026 position stand: at least 10 sets per muscle per week; failure, periodization model and equipment type have
  no consistent effect.
  https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=PMCID:PMC12965823&resultType=core&format=json
- ACSM 2026 summary. https://acsm.org/resistance-training-guidelines-update-2026/
- Schoenfeld et al. 2017, volume dose-response (justifies higher volume in Phase 2).
  https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:27433992&resultType=core&format=json
- Pelland et al. 2026, volume and frequency meta-regressions (diminishing returns; volume matters more than frequency).
  https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:41343037&resultType=core&format=json
- Schoenfeld et al. 2016, frequency (each muscle twice a week).
  https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:27102172&resultType=core&format=json
- Schoenfeld et al. 2016, rest intervals (about 3 min between sets of the same lift).
  https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:26605807&resultType=core&format=json
- Schoenfeld et al. 2017, low vs high loads (justifies the 12-20 rep isolation ranges).
  https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:28834797&resultType=core&format=json
- Refalo et al. 2023, proximity to failure (RIR targets; failure not required).
  https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:36334240&resultType=core&format=json
- Bell et al. 2023, Delphi consensus on deloading (weeks 6 and 12, autoregulated extra deload).
  https://www.ebi.ac.uk/europepmc/webservices/rest/PMC10511399/fullTextXML
- Better Health Channel, resistance training: 48-hour recovery, warm-up, technique, load increases, variation every 4-8
  weeks, stop and consult if pain.
  https://www.betterhealth.vic.gov.au/health/healthyliving/resistance-training-health-benefits
- British Heart Foundation, stop signs during exercise.
  https://www.bhf.org.uk/informationsupport/heart-matters-magazine/activity/finding-safe-exercise-limits
- NHLBI, physical activity risks. https://www.nhlbi.nih.gov/health/heart/physical-activity/risks
- Exercise dataset behind the exercise-db MCP server (all exercise ids above come from the vetted pool in
  03-exercise-selection). https://github.com/hasaneyldrm/exercises-dataset
- musclesworked (muscle activation and difficulty ratings used in 03-exercise-selection). https://musclesworked.com
