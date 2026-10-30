# Implementation plan

## Goal

Prepare a 90-minute technical talk and a small checkout demo that asks the audience to reassess the same feature as evidence improves. All teaching artifacts are in English. Final slide production follows a separate review of the demo narrative.

## Repository baseline

Inspected on 2026-10-30. The repository has no commits and contains only existing, untracked `.idea/` files. No applicable `AGENTS.md` files were found. Preserve these files; do not reset, stash, switch branches, or create commits to produce scenes.

## Build order

1. Record the ambiguous brief and clarified v1 specification before implementing the business rules.
2. Build a small TypeScript checkout with integer-cent arithmetic, a cart, SAVE10, shipping and a visible total. Use Vite, Vitest, Playwright and Stryker; pin dependencies after checking compatibility.
3. Capture the plausible green build and the shipping ambiguity as isolated source checkpoints.
4. Introduce the discount-cap requirement. Execute and preserve a failing test against the uncapped implementation **before** implementing the cap, then capture green and refactor states.
5. Run real mutation analysis on `src/discount.ts`, retain a behavioral survivor, add the missing test and rerun.
6. Seed a labeled UI-only defect. Show passing business tests and a failing browser assertion; retain the fix and a separate fresh-context reviewer prompt.
7. Enforce local packaging through required checks. Execute blocked and successful releases, including assertions about whether an archive was created.
8. Rehearse all six independently runnable scenes; retain actual logs, reports, source hashes and timing. Write the talk brief, 90-minute outline, presenter script, criterion/evidence map and slide outline.

## Checkpoint mechanism

Use tracked, small source overlays on a shared application template. Opening a checkpoint creates a new directory under `.demo-runs/`; it never replaces a previous run or edits the working application. Generated runs share the installed dependencies. Each scene has an opening state and a prepared next state; commands print their actual location.

## Evidence boundaries

Prepared source checkpoints and illustrative review findings are teaching examples, not historical agent transcripts. Preserve actual prompts/outputs only when an agent run is actually performed. Reports must come from executions. A local packaging gate establishes local enforcement, not a GitHub merge policy. The prepared reviewer example must never be described as a completed independent review.

## Completion checks

- Every intentional defect is detected by the intended check and passes after its fix.
- TDD records show a real red run before the first cap implementation.
- Mutation reports establish the survivor and its changed outcome after an added boundary test.
- Scene opening preserves an edited earlier run.
- Packaging fails closed and creates no archive on failure; the fixed state creates a usable static archive.
- The 90-minute schedule includes audience votes, discussion and questions.
