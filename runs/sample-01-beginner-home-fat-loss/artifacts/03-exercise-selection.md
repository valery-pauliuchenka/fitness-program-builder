---
artifact: 03-exercise-selection
owner: exercise-selector
run: sample-01-beginner-home-fat-loss
inputs: [01-requirements]
status: final
---
# Exercise Selection

## Summary

A pool of 26 exercises for a complete beginner training at home, using only bodyweight, a sturdy chair and a towel,
in about a mat-sized area. It covers knee-dominant legs, hip hinge/glutes, calves, horizontal push, horizontal pull
(towel rows), core (anti-extension, anti-rotation, lateral, flexion) and low-impact, quiet conditioning for the cardio
block. Every row comes from the exercise-db MCP server (dataset id given) and was checked against the musclesworked
MCP server for difficulty and muscle activation where a matching entry exists.

- The standard pool contains only movements rated beginner by musclesworked, or unrated (`n/a`) regressions of beginner
  movements. Two items labelled intermediate by musclesworked (incline push-up, kneeling push-up) are kept because they
  are reduced-load versions of the push-up, which musclesworked labels beginner (see notes).
- Two intermediate items (split squat, single-leg bridge) are listed only as late-phase progressions, to be used in the
  last phase after the beginner versions are mastered.
- Excluded: all jumping, hopping, running and burpee variants (user preference and neighbours below), anything that
  needs a bar, rings, parallel bars or a bench, crawling patterns that need floor space, chair dips, and advanced
  single-leg skills.
- exercise-db has no bodyweight step-up entry (only band, barbell and dumbbell versions), so step-ups are not in the
  strength pool. The closest low-impact stepping entry is "back and forth step" (3672), listed under conditioning.
- MCP status: both servers responded with no auth errors. The musclesworked `get_muscles_worked` lookup returned an
  HTML parse error for ids it does not hold (wall push-up, towel row, reverse crunch). Those rows show difficulty `n/a`.

## Details

Equipment mapping (exercise-db facet values): bodyweight, chair and towel all map to `body weight`; the chair is used
as an elevated support or balance aid, and the towel as the pulling implement. musclesworked equipment filter:
`bodyweight`. Difficulty values below are musclesworked labels for the matching musclesworked exercise id, shown in
brackets.

### Exercise pool

**Knee-dominant legs (squat pattern)**

| Exercise | Equipment | Primary target | Secondary muscles | Difficulty | Source id | Notes |
|---|---|---|---|---|---|---|
| Potty squat with support | body weight (chair or wall for balance) | glutes | quadriceps, hamstrings, calves | beginner (bodyweight_squat) | 3132 | Entry squat: hold the chair back for balance, depth only as far as comfortable. |
| Potty squat | body weight | glutes, quads | quadriceps, glutes | beginner (bodyweight_squat) | 3119 | Main free bodyweight squat; musclesworked confirms glute max and quads primary, core stabilisers. |
| Squat to overhead reach | body weight | quads | glutes, hamstrings, core | beginner (bodyweight_squat) | 1685 | Squat variant with an arm reach; good in warm-ups or as a squat progression for range and tempo. |
| March sit (wall) | body weight (wall) | glutes, quads | quadriceps, hamstrings, calves | beginner (wall_sit) | 0624 | Isometric wall-sit with alternating knee lifts. Start with a plain wall sit (musclesworked wall_sit) and add marching later. Quiet, needs only a wall. |
| Half knee bends (male) | body weight | quads | quadriceps, hamstrings, glutes | n/a (closest: bodyweight_squat, beginner) | 3221 | Shallow squat; listed as cardio in exercise-db. Usable as a squat regression or as a steady conditioning move. |

**Hip hinge and glutes**

| Exercise | Equipment | Primary target | Secondary muscles | Difficulty | Source id | Notes |
|---|---|---|---|---|---|---|
| Low glute bridge on floor | body weight | glutes | hamstrings, core | beginner (glute_bridge) | 3013 | Main hinge pattern on the floor. musclesworked: glute max, glute med, biceps femoris primary. |
| Glute bridge march | body weight | glutes | hamstrings, quadriceps | n/a (progression of glute_bridge, beginner) | 3561 | Bridge hold with alternating foot lifts; adds anti-rotation demand. |
| Glute bridge two legs on bench (male) | body weight (sturdy chair seat instead of a bench) | glutes | hamstrings, core | beginner (hip_thrust) | 3523 | Hip thrust with shoulders on the chair seat. Put the chair against a wall so it cannot slide. |

**Calves**

| Exercise | Equipment | Primary target | Secondary muscles | Difficulty | Source id | Notes |
|---|---|---|---|---|---|---|
| Bodyweight standing calf raise | body weight (wall or chair for balance) | calves | ankles, feet | n/a (musclesworked holds only the barbell calf_raise, beginner) | 1373 | Quiet, standing. Optional add-on. |

**Horizontal push**

| Exercise | Equipment | Primary target | Secondary muscles | Difficulty | Source id | Notes |
|---|---|---|---|---|---|---|
| Push-up (wall) | body weight (wall) | pectorals | triceps, deltoids | n/a | 0659 | Easiest push variant; start here if an incline push-up is not yet possible for 8 reps. |
| Incline push-up | body weight (sturdy chair seat or table edge) | pectorals | triceps, shoulders | intermediate (bodyweight_incline_push_up); see note | 0493 | Main push for most of the program. musclesworked labels it intermediate, but it is the reduced-load version of push_up, which it labels beginner; the musclesworked entry also notes that height changes difficulty. Hands on a chair against a wall. |
| Kneeling push-up (male) | body weight | pectorals | triceps, shoulders | intermediate (bodyweight_push_up_on_knees); see note | 3211 | Floor progression from the incline push-up. Same labelling note as above. |

**Horizontal pull (towel)**

| Exercise | Equipment | Primary target | Secondary muscles | Difficulty | Source id | Notes |
|---|---|---|---|---|---|---|
| Bodyweight standing row (with towel) | towel | upper back | biceps, shoulders | n/a | 3165 | Main pull: hinge forward, pull the towel to the chest and squeeze the shoulder blades, keeping the towel taut by pulling outwards. The only equipment-compatible horizontal pull; musclesworked has no bodyweight pull without a bar. |
| Bodyweight squatting row (with towel) | towel | upper back | biceps, shoulders | n/a | 3167 | Combines squat and row; useful as a time-efficient pairing in circuits. |
| Bodyweight standing one arm row (with towel) | towel | upper back | biceps, forearms | n/a | 3161 | Unilateral version; the free hand pulls against the towel to create resistance. |
| Elbow lift - reverse push-up | body weight | upper back | triceps, shoulders | n/a | 1772 | Prone upper-back exercise; adds a posterior-chain option for balance against pushing volume. |

**Core**

| Exercise | Equipment | Primary target | Secondary muscles | Difficulty | Source id | Notes |
|---|---|---|---|---|---|---|
| Dead bug | body weight | abs | hip flexors, lower back | beginner (dead_bug) | 0276 | Anti-extension; musclesworked shows transverse abdominis primary. Main core exercise. |
| Kneeling plank tap shoulder (male) | body weight | abs | shoulders, triceps | n/a (closest: plank, beginner) | 3239 | Anti-rotation plank. Start with a plain hold before adding taps. |
| Side bridge v. 2 | body weight | abs | obliques, glutes | beginner (side_plank) | 0705 | Lateral core hold. Regression: bent-knee side plank (musclesworked bodyweight_bent_knee_side_plank, beginner). |
| Bodyweight incline side plank | body weight | abs | obliques, shoulders | beginner (side_plank) | 3544 | Alternative entry to the side bridge. |
| Reverse crunch | body weight | abs | hip flexors | n/a | 0872 | Controlled lumbar flexion, done slowly. Optional variety. |

**Low-impact conditioning (for the cardio block; no jumping, no running)**

| Exercise | Equipment | Primary target | Secondary muscles | Difficulty | Source id | Notes |
|---|---|---|---|---|---|---|
| Back and forth step | body weight | cardiovascular system | quadriceps, hamstrings, glutes, calves | n/a | 3672 | Alternating step-forward lunge steps at a steady pace. Short steps keep it within a mat-sized area. Closest database match to the "step-ups" the user asked for. |
| High knee against wall | body weight (wall) | cardiovascular system | quadriceps, hamstrings, glutes, calves | n/a | 3636 | Do it as a march (one foot always on the floor) so it stays quiet and has no flight phase. |
| Left hook. boxing | body weight | delts | biceps, triceps, forearms | n/a | 2271 | Shadow boxing move (user preference). Do both sides; can be combined into punch-and-step intervals. |
| Mountain climber | body weight | cardiovascular system | core, shoulders, triceps | beginner (mountain_climber) | 0630 | Controlled step-in version only (no hopping); hands on the chair seat to make it easier. |
| Squat to overhead reach | body weight | quads | glutes, hamstrings, core | beginner (bodyweight_squat) | 1685 | Also usable as a steady conditioning interval (same row as in legs). |

Pool size: 26 rows, 25 distinct exercises (1685 is listed under legs and conditioning).

### Excluded exercises

| Exercise | Reason | Safer alternative |
|---|---|---|
| Jump squat (0514), jump squat v. 2 (0513), bodyweight drop jump squat (3543) | Jumping (neighbours below); intermediate (musclesworked jump_squat) | Potty squat (3119): musclesworked get_alternatives for jump_squat ranks bodyweight_squat (beginner) at overlap 1.0 |
| Burpee (1160), jack burpee (0501) | User dislikes burpees; jumping; intermediate (musclesworked burpee) | Potty squat (3119) plus incline push-up (0493): get_alternatives for burpee returns bodyweight_squat as the only bodyweight beginner match |
| Lunge with jump (3582), skater hops (3361), ski step (3671), star jump (3223), jack jump (3224), astride jumps (3220), scissor jumps (3219), semi squat jump (3222) | Jumping or hopping (ski step instructions specify side-to-side jumps) | Back and forth step (3672) or high knee against wall done as a march (3636) |
| Run (0685), short stride run (3656), push to run (3638), wheel run (3637) | Running excluded by the user | High knee against wall as a march (3636); everyday walking is up to the cardio stage |
| Plyo push up (1306), clap push up (1273), drop push up (1275) | Explosive or plyometric; not beginner | Incline push-up (0493) |
| Forward lunge (male) (3470), walking lunge (1460) | Intermediate in musclesworked (bodyweight_lunge); walking lunge also needs floor space | Potty squat (3119), which get_alternatives for bodyweight_lunge ranks at overlap 1.0 (bodyweight_squat, beginner); split squat (2368) later as a supported progression |
| Bench dip (knees bent) (0129), triceps dip (bench leg) (0812) | Intermediate (musclesworked bodyweight_bench_dip_heels_on_floor); loads the shoulder at the end of its extension range on a chair that may slide | Incline push-up (0493) for triceps: get_alternatives lists only band, machine or barbell options, none matching the equipment, so the push-up family stays the triceps source |
| Pull-up (0652), chin-up (1326), inverted row (0499), scapular pull-up (0688) | Need a bar; intermediate | Bodyweight standing row (with towel) (3165): get_alternatives for pull_up returns only cable, band or barbell options, so the towel row from exercise-db is the equipment-compatible swap |
| Chest dip (0251), korean dips (3288), ring dips (0677) | Need parallel bars or rings; intermediate or higher | Incline push-up (0493) |
| Bear crawl (3360) | Needs several metres of floor; small flat | Kneeling plank tap shoulder (3239) |
| Single leg squat (pistol) (1759), one leg squat (1476), sissy squat (1489) | Advanced single-leg skill (musclesworked bodyweight_single_leg_squat_pistol: advanced) or deep loaded knee flexion; not beginner | Potty squat with support (3132), then split squat (2368) late in the program |
| Hyperextension (0489), glute-ham raise (3193), reverse hyper on flat bench (1423) | Need a bench or apparatus; intermediate | Low glute bridge on floor (3013) |
| Hanging leg raise (0472) and other hanging core moves | Need a bar | Reverse crunch (0872) or dead bug (0276) |

### Regressions and progressions

Order runs from easiest to hardest. Move up a step when the current one is done with good form for the top of the
prescribed rep range, or the target hold time, on all sets in two consecutive sessions.

| Movement | Regression | Main (beginner) | Progression | Late-phase progression (last phase only) |
|---|---|---|---|---|
| Squat | Potty squat with support (3132), holding the chair | Potty squat (3119) | Squat to overhead reach (1685), slower lowering (3 s down) | Split squats (2368), hand on the chair for balance; intermediate (bodyweight_split_squat) |
| Squat (isometric) | Wall sit, shallow angle (musclesworked wall_sit, beginner) | Wall sit to about 90 degrees | March sit (wall) (0624) | n/a |
| Hip hinge | Low glute bridge on floor (3013), shorter hold at the top | Low glute bridge on floor (3013), 2 s squeeze | Glute bridge march (3561); hip thrust with shoulders on the chair (3523) | Single leg bridge with outstretched leg (3645); intermediate (single_leg_glute_bridge) |
| Horizontal push | Push-up (wall) (0659) | Incline push-up on the chair (0493) | Kneeling push-up (3211) | Push-up (0662); beginner in musclesworked (push_up) but the hardest step in this pool |
| Horizontal pull | Bodyweight standing row (with towel) (3165), light pull | Bodyweight standing row (with towel) (3165), 2 s squeeze, stronger outward tension | Bodyweight standing one arm row (with towel) (3161); bodyweight squatting row (with towel) (3167) | Add elbow lift - reverse push-up (1772) as a second pull |
| Core anti-extension | Dead bug (0276) moving legs only | Dead bug (0276) with opposite arm and leg | Plank hold (musclesworked plank, beginner) | Kneeling plank tap shoulder (3239) |
| Core lateral | Bent-knee side plank (musclesworked bodyweight_bent_knee_side_plank, beginner) | Bodyweight incline side plank (3544) | Side bridge v. 2 (0705), longer holds | n/a |
| Conditioning | High knee against wall (3636) as a slow march; half knee bends (3221) | Back and forth step (3672); left hook. boxing (2271) | Mountain climber (0630), controlled, hands on the chair | Combine boxing with step intervals, shorter rests |

## Sources

- Exercise dataset (exercise-db MCP server, data from https://github.com/hasaneyldrm/exercises-dataset). Ids used in the
  pool: 3132, 3119, 1685, 0624, 3221, 3013, 3561, 3523, 1373, 0659, 0493, 3211, 3165, 3167, 3161, 1772, 0276, 3239,
  0705, 3544, 0872, 3672, 3636, 2271, 0630; progressions: 2368, 3645, 0662. Ids referenced as excluded: 0514, 0513,
  3543, 1160, 0501, 3582, 3361, 3671, 3223, 3224, 3220, 3219, 3222, 0685, 3656, 3638, 3637, 1306, 1273, 1275, 3470,
  1460, 0129, 0812, 0652, 1326, 0499, 0688, 0251, 3288, 0677, 3360, 1759, 1476, 1489, 0489, 3193, 1423, 0472.
- Muscle activation, difficulty and alternatives (musclesworked MCP server, https://musclesworked.com). Ids used:
  bodyweight_squat, wall_sit, glute_bridge, hip_thrust, single_leg_glute_bridge, bodyweight_split_squat, bodyweight_lunge,
  push_up, bodyweight_incline_push_up, bodyweight_push_up_on_knees, bodyweight_bench_dip_heels_on_floor, pull_up,
  dead_bug, plank, side_plank, bodyweight_bent_knee_side_plank, mountain_climber, calf_raise, step_up, burpee,
  jump_squat, bodyweight_single_leg_squat_pistol.
