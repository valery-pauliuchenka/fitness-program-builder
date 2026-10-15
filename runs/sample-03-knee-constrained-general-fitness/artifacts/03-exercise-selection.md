---
artifact: 03-exercise-selection
owner: exercise-selector
run: sample-03-knee-constrained-general-fitness
inputs: [01-requirements]
status: final
---
# Exercise Selection

## Summary
Pool of 17 exercises for a beginner training at home with adjustable dumbbells (2-20 kg), a resistance band, a mat and a sturdy chair, 3 days per week, 40 minutes. Mild front-of-knee discomfort with deep squats and stair descent means: hip-dominant work leads the lower body, squatting is limited to a chair-height, pain-free range, and there is no jumping or impact. All rows come from the exercise-db dataset (ids shown); difficulty comes from musclesworked where an entry could be matched, otherwise `n/a`. The musclesworked lookup for "dumbbell romanian deadlift" returned a server error, so its difficulty is `n/a`. General exercise information, not medical advice.

## Details
### Exercise pool

#### Lower body: hip hinge and bridge (knee-friendly)
| Exercise | Equipment | Primary target | Secondary muscles | Difficulty | Source id | Notes |
|---|---|---|---|---|---|---|
| dumbbell romanian deadlift | dumbbell | glutes | hamstrings, lower back | n/a | 1459 | Main lower-body lift; small knee bend only |
| low glute bridge on floor | body weight | glutes | hamstrings, core | beginner (musclesworked: Glute Bridge) | 3013 | Mat; can hold a dumbbell on hips later |
| glute bridge march | body weight | glutes | hamstrings, core | beginner (musclesworked: Glute Bridge) | 3561 | Progression of the bridge |
| band pull through | resistance band | glutes | hamstrings | n/a | 0991 | Hinge pattern with band |
| band hip lift | resistance band | glutes | hamstrings | n/a | 1408 | Banded bridge variation |

#### Lower body: squat pattern (limited range) and calves
| Exercise | Equipment | Primary target | Secondary muscles | Difficulty | Source id | Notes |
|---|---|---|---|---|---|---|
| dumbbell supported squat | dumbbell | quads | glutes, hamstrings, calves | beginner (musclesworked: Goblet Squat, closest match) | 2803 | Sit to the chair and stand, stay in the pain-free range; do not go deeper than chair height |
| dumbbell standing calf raise | dumbbell | calves | none listed | n/a | 0417 | Low knee stress |

#### Push
| Exercise | Equipment | Primary target | Secondary muscles | Difficulty | Source id | Notes |
|---|---|---|---|---|---|---|
| push-up | body weight | pectorals | shoulders, triceps | beginner | 0662 | Standard version |
| incline push-up | body weight | pectorals | shoulders, triceps | beginner (musclesworked: Push-Up) | 0493 | Hands on the sturdy chair; regression |
| kneeling push-up (male) | body weight | pectorals | shoulders, triceps | beginner (musclesworked: Push-Up) | 3211 | On mat; check comfort on knees, pad with mat |
| dumbbell bench seated press | dumbbell | delts | triceps | intermediate (musclesworked: Dumbbell Shoulder Press); use light loads | 0290 | Seated on the chair |

#### Pull
| Exercise | Equipment | Primary target | Secondary muscles | Difficulty | Source id | Notes |
|---|---|---|---|---|---|---|
| dumbbell one arm bent-over row | dumbbell | upper back | biceps, forearms | intermediate (musclesworked: Dumbbell Row); start light | 0292 | Hand on chair for support |
| band one arm standing low row | resistance band | upper back | biceps | n/a | 0988 | Easier alternative to the dumbbell row |
| band reverse fly | resistance band | delts (rear) | upper back | n/a | 0993 | Posture work for desk worker |

#### Core
| Exercise | Equipment | Primary target | Secondary muscles | Difficulty | Source id | Notes |
|---|---|---|---|---|---|---|
| dead bug | body weight | abs | obliques | beginner | 0276 | On mat |
| kneeling plank tap shoulder (male) | body weight | abs | shoulders | n/a | 3239 | Kneeling on a padded mat; check knee comfort |
| band horizontal pallof press | resistance band | abs | obliques | n/a | 0979 | Anti-rotation |

### Excluded exercises
| Exercise | Reason | Safer alternative |
|---|---|---|
| dumbbell goblet squat (1760) | Loaded squat to parallel or deeper provokes front-of-knee discomfort | dumbbell supported squat to chair height (2803), glute bridge (3013) |
| dumbbell plyo squat (0371), clap/plyo push-ups | Impact and jumping | dumbbell romanian deadlift (1459), push-up (0662) |
| dumbbell single leg split squat (0410), dumbbell step-up split squat (2812) | Loaded deep knee flexion on one leg; step work mimics stair load | band hip lift (1408), glute bridge march (3561) |
| dumbbell single leg squat (0411) | Advanced and high knee load | low glute bridge on floor (3013) |
| barbell, machine and cable exercises | Equipment not available | Dumbbell and band versions above |

musclesworked get_alternatives for Goblet Squat returned only other knee-dominant squats (bodyweight, Bulgarian split, leg press), so the safer swaps above were chosen from the hip-dominant pool by judgment, not by that tool.

### Regressions and progressions
| Movement | Regression | Base | Progression |
|---|---|---|---|
| Hip hinge | band pull through (0991) | dumbbell romanian deadlift (1459) | heavier dumbbells up to 20 kg, slower lowering |
| Bridge | low glute bridge on floor (3013) | glute bridge march (3561) | band hip lift (1408), then dumbbell held on hips |
| Squat | sit to chair without load (use 2803 with no weight) | dumbbell supported squat (2803) to chair height | add dumbbells, slower tempo; do not increase depth |
| Push | incline push-up (0493) | push-up (0662), kneeling push-up (3211) as a mid-step | more reps, slower lowering |
| Overhead press | seated, 2-4 kg (0290) | seated, moderate load | heavier dumbbells up to 20 kg |
| Pull | band one arm standing low row (0988) | dumbbell one arm bent-over row (0292) | heavier dumbbell, slow lowering |
| Core | dead bug (0276), arms only | dead bug full | kneeling plank tap (3239), band pallof press (0979) |

Stop any exercise that increases knee pain. If discomfort worsens, consult a doctor or physiotherapist.

## Sources
- https://github.com/hasaneyldrm/exercises-dataset (ids used: 1459, 3013, 3561, 0991, 1408, 2803, 0417, 0662, 0493, 3211, 0290, 0292, 0988, 0993, 0276, 3239, 0979; excluded ids: 1760, 0371, 0410, 2812, 0411)
- https://musclesworked.com (difficulty and muscle roles for Push-Up, Dumbbell Row, Glute Bridge, Dead Bug, Dumbbell Shoulder Press, Goblet Squat and its alternatives)
