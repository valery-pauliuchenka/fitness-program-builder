---
artifact: 03-exercise-selection
owner: exercise-selector
run: sample-02-intermediate-gym-muscle-gain
inputs: [01-requirements]
status: final
---
# Exercise Selection

## Summary

This is a pool of 44 exercises for an intermediate lifter (about 2 years of training) who wants general hypertrophy and
trains in a full commercial gym. The pool covers knee-dominant legs, hip hinge and glutes, hamstring isolation, calves,
horizontal and vertical push, horizontal and vertical pull, isolation work for the side and rear delts, biceps, triceps
and core. Every row comes from the exercise-db MCP server (dataset id given). Each row was then checked against the
musclesworked MCP server for difficulty and muscle activation wherever a matching entry exists.

- **Preference respected.** Each movement pattern is anchored by a free-weight compound (back squat, deadlift, Romanian
  deadlift, barbell and dumbbell bench and incline press, standing overhead press, barbell and dumbbell rows, pull-up,
  chest dip). Cables and machines appear only as accessories or as regressions. The requirements allow this
  ("prefers free weights" is a preference, not an exclusion).
- **Leg extension machine excluded** (user dislike), along with the band leg extension, which is the same movement.
  musclesworked `get_alternatives` for `leg_extension` suggested the swaps: Bulgarian split squat (free weight, preferred),
  leg press, and goblet squat.
- **Difficulty.** No row exceeds intermediate in musclesworked. Exercises that musclesworked rates advanced (front squat,
  Jefferson squat) are excluded. Beginner-rated items are kept as accessories and regressions, which is appropriate at
  intermediate level.
- **Limitations.** None were reported, so standard loaded squat, hinge and overhead patterns are allowed. High-impact
  plyometric and Olympic-style variants are left out because they do not serve the hypertrophy goal.
- **MCP status.** Both servers responded and there were no auth errors. For ids it does not hold (`incline_dumbbell_press`,
  `chest_supported_dumbbell_row`), musclesworked `get_muscles_worked` returned an HTML parse error ("Unexpected token <").
  The incline dumbbell press was then confirmed through `find_exercises` (`dumbbell_dumbbell_incline_bench_press`). The
  remaining rows with no exact musclesworked match show `n/a` or name the closest musclesworked id in brackets.

## Details

Equipment mapping (exercise-db facet values): the gym's barbells and racks map to `barbell`, dumbbells to `dumbbell`,
cable stations to `cable`, plate-loaded and selectorised machines to `leverage machine` / `sled machine`, the pull-up bar
and dip station to `body weight`, and a plate held on the back to `weighted`. musclesworked equipment filters used:
`barbell`, `dumbbell`, `cable`, `machine`, `bodyweight`. In the Difficulty column, the musclesworked id of the matching
exercise is given in brackets.

### Exercise pool

**Knee-dominant legs (squat and lunge pattern)**

| Exercise | Equipment | Primary target | Secondary muscles | Difficulty | Source id | Notes |
|---|---|---|---|---|---|---|
| Barbell full squat (back squat) | barbell, rack | glutes, quadriceps | quadriceps (rectus femoris, vastus lateralis/medialis), hamstrings, calves; erector spinae and abs stabilise | intermediate (barbell_back_squat) | 0043 | Main lower-body compound. musclesworked: glute max primary, quads secondary, adductor magnus and erector spinae stabilisers. |
| Dumbbell single leg split squat (Bulgarian split squat) | dumbbell, bench | quadriceps | glutes, adductor magnus, hamstrings, calves | intermediate (bulgarian_split_squat) | 0410 | Rear foot on a bench. Main free-weight swap for the excluded leg extension: quads are primary in musclesworked. |
| Dumbbell rear lunge | dumbbell | glutes | quadriceps (rectus femoris), hamstrings | intermediate (dumbbell_dumbbell_rear_lunge) | 0381 | Unilateral option to vary the second leg day. |
| Dumbbell goblet squat | dumbbell | quadriceps | glutes, vastus intermedius; core stabilises | beginner (goblet_squat, kettlebell version) | 1760 | Warm-up squat pattern and squat regression; also a deload option. |
| Sled 45° leg press (side pov) | sled machine | glutes, quadriceps | quadriceps (all heads), glutes | beginner (leg_press) | 1463 | Machine accessory for extra quad volume without spinal loading. Same movement as dataset id 0739. |

**Hip hinge, glutes and hamstrings**

| Exercise | Equipment | Primary target | Secondary muscles | Difficulty | Source id | Notes |
|---|---|---|---|---|---|---|
| Barbell deadlift | barbell | glutes, erector spinae | hamstrings (biceps femoris long), adductor magnus, quadriceps, soleus; traps, rhomboids, abs stabilise | intermediate (barbell_barbell_deadlift) | 0032 | Main hinge. The user is already familiar with it (requirements). |
| Barbell romanian deadlift | barbell | hamstrings | glutes, adductor magnus, erector spinae | intermediate (romanian_deadlift) | 0085 | Hamstring-dominant hinge. musclesworked: all three hamstring heads primary. |
| Barbell glute bridge (hip thrust pattern) | barbell, bench or floor | glutes | hamstrings, adductor magnus, rectus femoris | intermediate (barbell_hip_thrust, closest) | 1409 | Glute isolation-style compound. With the shoulders on a bench it becomes the musclesworked barbell hip thrust (glute max and glute med primary). |
| Lever seated leg curl | leverage machine | hamstrings | biceps femoris short head | beginner (seated_leg_curl) | 0599 | Knee-flexion hamstring work. It complements the hinges, which mostly train hip extension. |
| Lever lying leg curl | leverage machine | hamstrings | calves (gastrocnemius) | n/a (closest: seated_leg_curl, beginner) | 0586 | Alternative to the seated curl for variety between the two lower days. |

**Calves**

| Exercise | Equipment | Primary target | Secondary muscles | Difficulty | Source id | Notes |
|---|---|---|---|---|---|---|
| Barbell standing calf raise | barbell (or standing calf machine) | calves (gastrocnemius) | soleus | beginner (standing_calf_raise) | 1372 | Straight-knee calf work. Use a full stretch at the bottom. |
| Lever seated calf press | leverage machine | calves (soleus) | gastrocnemius | beginner (seated_calf_raise) | 2335 | Bent-knee calf work that emphasises the soleus. |

**Horizontal push (chest)**

| Exercise | Equipment | Primary target | Secondary muscles | Difficulty | Source id | Notes |
|---|---|---|---|---|---|---|
| Barbell bench press | barbell, bench, rack | pectoralis major (sternal), anterior deltoid, triceps | clavicular pec, triceps (all heads), brachialis; serratus and abs stabilise | intermediate (barbell_bench_press) | 0025 | Main horizontal press. |
| Barbell incline bench press | barbell, incline bench, rack | pectoralis major (clavicular) | anterior deltoid, sternal pec, triceps long head | intermediate (barbell_barbell_incline_bench_press) | 0047 | Upper-chest emphasis. |
| Dumbbell bench press | dumbbell, bench | pectoralis major (sternal), anterior deltoid, triceps | clavicular pec, triceps, brachialis | intermediate (dumbbell_bench_press) | 0289 | Free-weight alternative with a greater range of motion. |
| Dumbbell incline bench press | dumbbell, incline bench | pectoralis major (clavicular) | anterior deltoid, triceps | intermediate (dumbbell_dumbbell_incline_bench_press) | 0314 | Secondary upper-chest press. |
| Chest dip | body weight (dip station) | pectoralis major (sternal) | anterior deltoid, triceps, clavicular pec | intermediate (bodyweight_chest_dip) | 0251 | Lean forward to bias the chest. Add load with a dip belt once 12+ clean reps are achieved. |
| Dumbbell fly | dumbbell, bench | pectoralis major | clavicular pec, anterior deltoid | intermediate (dumbbell_fly) | 0308 | Chest isolation with stretch under load. |
| Cable middle fly | cable | pectoralis major (sternal) | anterior deltoid, clavicular pec, biceps short head | intermediate (cable_cable_isolateral_cable_fly, closest) | 0188 | Gives constant tension. Alternative to the dumbbell fly. |

**Vertical push (shoulders)**

| Exercise | Equipment | Primary target | Secondary muscles | Difficulty | Source id | Notes |
|---|---|---|---|---|---|---|
| Barbell standing close grip military press (standing overhead press) | barbell, rack | anterior and lateral deltoid, triceps long head | clavicular pec, triceps; abs, serratus, upper traps stabilise | intermediate (overhead_press) | 1456 | Main vertical press. The user is already familiar with it. Shoulder-width grip. |
| Barbell seated overhead press | barbell, bench, rack | deltoids | triceps, clavicular pec | intermediate (overhead_press, seated) | 0091 | Seated option that reduces lower-back demand on heavy days. |
| Dumbbell standing overhead press | dumbbell | anterior and lateral deltoid, triceps | clavicular pec, serratus, supraspinatus, traps | intermediate (dumbbell_shoulder_press) | 0426 | Free-weight alternative. Also a progression for unilateral stability. |

**Horizontal pull (upper back)**

| Exercise | Equipment | Primary target | Secondary muscles | Difficulty | Source id | Notes |
|---|---|---|---|---|---|---|
| Barbell bent over row | barbell | upper back, erector spinae | latissimus dorsi, rhomboids, middle/lower traps, rear delt, teres major/minor, biceps/brachialis | intermediate (barbell_barbell_bent_over_row) | 0027 | Main row. Keep a flat back. Use an underhand or shoulder-width grip to bias the lats. |
| Dumbbell one arm bent-over row | dumbbell, bench | latissimus dorsi, rhomboids, middle traps | biceps long head, teres major/minor, lower traps | intermediate (dumbbell_row) | 0292 | Unilateral row with bench support. Lower back is less loaded than in the barbell row. |
| Cable low seated row | cable | latissimus dorsi, rhomboids, middle traps | biceps, teres major/minor, lower traps | beginner (seated_cable_row) | 0180 | Accessory row with constant tension. Also a regression for the barbell row. |
| Dumbbell incline row (chest-supported) | dumbbell, incline bench | upper back | rear delts, biceps | n/a (no musclesworked match; closest: dumbbell_row, intermediate) | 0327 | Chest-supported row for back volume without lower-back fatigue, useful after deadlift days. |

**Vertical pull (lats)**

| Exercise | Equipment | Primary target | Secondary muscles | Difficulty | Source id | Notes |
|---|---|---|---|---|---|---|
| Pull-up | body weight (pull-up bar) | latissimus dorsi, middle and upper traps | biceps (both heads), brachialis, brachioradialis, rear delt, rhomboids, teres major/minor | intermediate (pull_up) | 0652 | Main vertical pull. Add load (belt or dumbbell between the feet) once 10+ reps are clean. |
| Cable bar lateral pulldown (lat pulldown) | cable | latissimus dorsi | middle/upper traps, biceps long head, teres major/minor | beginner (lat_pulldown) | 0150 | Accessory and regression for the pull-up; easy to load precisely. |
| Assisted pull-up | leverage machine | latissimus dorsi | biceps, brachialis, rear delt, upper traps | beginner (assisted_pull_up) | 0017 | Regression for days when unassisted reps drop below the target range. |

**Shoulder isolation (side and rear delts)**

| Exercise | Equipment | Primary target | Secondary muscles | Difficulty | Source id | Notes |
|---|---|---|---|---|---|---|
| Dumbbell lateral raise | dumbbell | lateral deltoid | anterior deltoid, supraspinatus, traps, serratus | beginner (lateral_raise) | 0334 | Main side-delt builder. Few compounds train the lateral delt directly, so this needs direct volume. |
| Cable lateral raise | cable | lateral deltoid | supraspinatus, traps | n/a (closest: lateral_raise, beginner) | 0178 | Constant-tension alternative. |
| Cable rear delt row (with rope) | cable | posterior deltoid | middle/upper traps, rhomboids, infraspinatus, teres minor | beginner (face_pull, closest) | 0203 | Rear-delt and scapular work that balances the pressing volume. |
| Dumbbell rear lateral raise | dumbbell | posterior deltoid | middle traps, rhomboids, infraspinatus, teres minor | beginner (bent_over_reverse_fly) | 0380 | Free-weight rear-delt option. |

**Arms (biceps and triceps)**

| Exercise | Equipment | Primary target | Secondary muscles | Difficulty | Source id | Notes |
|---|---|---|---|---|---|---|
| Barbell curl | barbell (straight or EZ) | biceps brachii (both heads) | brachialis, brachioradialis | beginner (barbell_curl) | 0031 | Main biceps exercise. |
| Dumbbell incline curl | dumbbell, incline bench | biceps brachii (both heads) | brachialis | beginner (incline_dumbbell_curl) | 0318 | Trains the long head at long muscle length (stretched position). |
| Dumbbell hammer curl | dumbbell | brachialis, brachioradialis | biceps brachii | beginner (hammer_curl) | 0313 | Elbow-flexor and forearm volume. |
| Barbell lying triceps extension skull crusher | barbell (or EZ bar), bench | triceps (all heads) | anconeus | intermediate (skull_crusher) | 0060 | Main triceps isolation. Lower the bar to just behind the head. |
| Cable overhead triceps extension (rope attachment) | cable | triceps (long head emphasis) | anconeus | beginner (overhead_tricep_extension, dumbbell version) | 0194 | Overhead position trains the long head at length. |
| Cable pushdown (with rope attachment) | cable | triceps (all heads) | anconeus | beginner (tricep_pushdown) | 0200 | Low-fatigue triceps volume at the end of push days. |
| Barbell close-grip bench press | barbell, bench, rack | triceps | pectorals, anterior deltoid | n/a (no musclesworked match) | 0030 | Compound triceps option that also adds pressing volume. |

**Core**

| Exercise | Equipment | Primary target | Secondary muscles | Difficulty | Source id | Notes |
|---|---|---|---|---|---|---|
| Hanging leg raise | body weight (pull-up bar) | rectus abdominis, iliopsoas | adductors, TFL, sartorius; obliques stabilise | intermediate (hanging_leg_raise) | 0472 | Main trunk-flexion exercise. Curl the pelvis up, do not just lift the legs. |
| Assisted hanging knee raise | assisted (captain's chair / elbow pads) | abs | hip flexors | n/a (regression of hanging_leg_raise) | 0011 | Regression with the knees bent. |
| Cable kneeling crunch | cable | rectus abdominis | external obliques | beginner (cable_crunch) | 0175 | Loadable spinal flexion, so it can be progressed like any other lift. |
| Weighted front plank | weighted (plate on the back) | abs | transverse abdominis, obliques | n/a (no musclesworked match) | 2135 | Anti-extension. Progress by load, not by very long holds. |

### Excluded exercises

| Exercise | Reason | Safer alternative |
|---|---|---|
| Lever leg extension (0585) | User dislikes the leg extension machine (explicit exclusion in requirements). | Dumbbell single leg split squat / Bulgarian split squat (0410). musclesworked `get_alternatives(leg_extension)` ranks it with full quad overlap (rectus femoris, vastus lateralis, vastus medialis); free weight, so it also suits the preference. Leg press (1463) as the machine option. |
| Resistance band leg extension (3007) | Same knee-extension movement as the disliked machine, and band equipment adds no benefit in a full gym. | Dumbbell goblet squat (1760), or the Bulgarian split squat (0410). |
| Barbell front squat (0042) | musclesworked rates `front_squat` as advanced, which is above the user's intermediate level. | Barbell full squat (0043), intermediate. For extra quad emphasis, Bulgarian split squat (0410) or leg press (1463). |
| Barbell jefferson squat (0051) | musclesworked rates `jefferson_squat` as advanced. An asymmetric loaded squat adds nothing for hypertrophy here. | Barbell full squat (0043), Dumbbell rear lunge (0381). |
| Barbell jump squat (0053) | Loaded plyometric. It is high impact and builds power rather than size, so it does not serve a hypertrophy goal and adds injury risk. | Barbell full squat (0043) taken close to failure. |
| Barbell overhead squat (0069) and barbell one arm snatch (0067) | Olympic-style skill lifts. They are not needed for hypertrophy and their technique demand is out of proportion to the muscle stimulus. | Barbell full squat (0043) and barbell standing military press (1456). |
| Archer pull up (3293) | Advanced bodyweight skill variant. Its loading is hard to progress in small steps compared with a weighted pull-up. | Pull-up (0652) with added load; Cable bar lateral pulldown (0150). |

### Regressions and progressions

Progression rule for the training-planner: once all sets reach the top of the prescribed rep range at the target effort,
add load (about 2.5 kg for upper-body barbell lifts, 2.5 to 5 kg for squat and deadlift, the next dumbbell size for
dumbbell work). Use the regression column for deload weeks, technique resets, or a bad training day.

| Movement | Regression | Main (intermediate) | Progression |
|---|---|---|---|
| Squat | Dumbbell goblet squat (1760); Sled 45° leg press (1463) | Barbell full squat (0043) | Barbell full squat with a paused bottom position or slower lowering (3 s), then load progression. Front squat stays out (advanced). |
| Unilateral legs | Dumbbell rear lunge (0381), bodyweight only or light | Dumbbell single leg split squat (0410) | Heavier dumbbells; a deficit (front foot on a plate) for a greater range of motion |
| Hip hinge | Barbell romanian deadlift (0085) at a lighter load; Barbell glute bridge (1409) | Barbell deadlift (0032) | Load progression; add back-off sets |
| Hamstring hinge | Barbell glute bridge (1409) | Barbell romanian deadlift (0085) | Slower lowering (3 s), then load progression; pair with Lever seated leg curl (0599) |
| Horizontal press | Dumbbell bench press (0289) at a lighter load; Cable middle fly (0188) as a low-fatigue chest stimulus | Barbell bench press (0025) | Load progression; paused reps; Barbell incline bench press (0047) as the second press |
| Incline press | Dumbbell incline bench press (0314) at a lighter load | Barbell incline bench press (0047) | Load progression; alternate with the dumbbell version every block for variety |
| Vertical press | Barbell seated overhead press (0091) | Barbell standing close grip military press (1456) | Dumbbell standing overhead press (0426) for stability demand; load progression |
| Horizontal pull | Cable low seated row (0180); Dumbbell incline row (0327), chest-supported | Barbell bent over row (0027) | Dumbbell one arm bent-over row (0292) with heavier dumbbells; pause at the torso |
| Vertical pull | Assisted pull-up (0017); Cable bar lateral pulldown (0150) | Pull-up (0652), bodyweight | Weighted pull-up (load added with a belt or a dumbbell between the feet) |
| Dip | Assisted dip (musclesworked assisted_dip, beginner) or Barbell close-grip bench press (0030) | Chest dip (0251), bodyweight | Weighted chest dip with a belt |
| Trunk flexion | Assisted hanging knee raise (0011); Cable kneeling crunch (0175) at a light load | Hanging leg raise (0472) | Slower lowering; heavier cable crunch; Weighted front plank (2135) for anti-extension |
| Delts and arms (isolation) | Lighter load, partial range at the start of a block | Dumbbell lateral raise (0334), Cable rear delt row (0203), Barbell curl (0031), Skull crusher (0060) | Add reps within 10 to 20 first, then load; switch to the cable versions (0178, 0194) to keep constant tension |

## Sources

- Exercise dataset (exercise-db MCP server, data from https://github.com/hasaneyldrm/exercises-dataset). Ids used in the
  pool: 0043, 0410, 0381, 1760, 1463, 0032, 0085, 1409, 0599, 0586, 1372, 2335, 0025, 0047, 0289, 0314, 0251, 0308,
  0188, 1456, 0091, 0426, 0027, 0292, 0180, 0327, 0652, 0150, 0017, 0334, 0178, 0203, 0380, 0031, 0318, 0313, 0060,
  0194, 0200, 0030, 0472, 0011, 0175, 2135. Ids referenced as excluded: 0585, 3007, 0042, 0051, 0053, 0069, 0067, 3293.
  Also referenced: 0739 (same leg press as 1463).
- Muscle activation, difficulty and alternatives (musclesworked MCP server, https://musclesworked.com). Ids used:
  barbell_back_squat, bulgarian_split_squat, dumbbell_dumbbell_rear_lunge, goblet_squat, leg_press,
  barbell_barbell_deadlift, romanian_deadlift, barbell_hip_thrust, glute_bridge, seated_leg_curl,
  cable_cable_lying_leg_curl, standing_calf_raise, seated_calf_raise, barbell_bench_press,
  barbell_barbell_incline_bench_press, dumbbell_bench_press, dumbbell_dumbbell_incline_bench_press, bodyweight_chest_dip,
  dumbbell_fly, cable_cable_isolateral_cable_fly, overhead_press, dumbbell_shoulder_press, barbell_barbell_bent_over_row,
  dumbbell_row, seated_cable_row, pull_up, lat_pulldown, assisted_pull_up, assisted_dip, lateral_raise, face_pull,
  bent_over_reverse_fly, barbell_curl, incline_dumbbell_curl, hammer_curl, skull_crusher, overhead_tricep_extension,
  tricep_pushdown, hanging_leg_raise, cable_crunch, leg_extension (alternatives), front_squat, jefferson_squat.
