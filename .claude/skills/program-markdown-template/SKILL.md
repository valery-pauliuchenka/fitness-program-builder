---
name: program-markdown-template
description: The fixed document structure and writing rules for the final fitness program (Markdown). Use this skill whenever drafting, merging or rendering the user-facing training program, so that every run, with the same input, produces the same sections in the same order. Make sure to use it for the draft program and the final program, even when the user only says "write up the plan".
---

# Program Markdown template

The reader-facing program always has the same ten sections in the same order. Consistency
across runs is a requirement, and `artifact-validator` enforces it by comparing the headings
with `assets/program-template.md`.

## Rules

1. Start from `assets/program-template.md`. Keep every `##` heading **verbatim**, with its number, in order.
   Do not add, rename, merge, reorder or drop sections. Put extra detail in `###` subsections.
2. Replace each `<!-- ... -->` instruction with real content, and delete the comment.
3. Write for the user: second person, plain language, no jargon without a one-line explanation.
4. Use tables for schedules, phases and workouts. Use the user's units (default: metric).
5. Never mention internal workflow details: artifact file names, agent names, gate ids ("G4"),
   run folders, state files. The `no-leak-guard` hook blocks the write if you do.
6. Every claim about guidelines, safety or exercise science must be traceable to a link in
   section 10. Do not invent sources. Reuse links from the planning artifacts.
7. Same input, same structure: use fixed table column names (shown in the comments) every time.

## Draft vs. final

- **Draft** (`08-draft-program.md`): artifact front matter + the ten sections + a last
  `## Internal Traceability` section mapping each section to the artifacts it came from.
  The human reviewer reads this draft.
- **Final** (`final/training-program.md`): no front matter, no traceability section,
  no HTML comments. Only the ten sections and the title.

## Check

```bash
node .claude/skills/artifact-validator/scripts/check-artifact.js <file>
```
