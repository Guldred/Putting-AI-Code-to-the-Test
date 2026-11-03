# Performed fresh-context review — scene 6 (2026-11-03)

This review was actually executed. It is separate from the [prepared example](../../../docs/reviews/prepared-ui-finding.md), which remains an authored teaching example.

- Reviewer: Claude Code subagent, model `claude-opus-5-5`, fresh context (no author conversation), restricted to the bundle directory.
- Baseline: `04/improved`; candidate: the seeded UI defect, opened as `05/start` before the scenes were renumbered the same day. Bundle created with `npm run review:bundle`. Today's `06/start` has the same `src/` and `tests/`; its package scripts and release tooling changed afterwards (acceptance lock), so its hashes differ from `bundle-provenance.json`.
- Line numbers in the review refer to the reviewed (redacted) file. F-1's `src/view.ts:9` is line 10 in the `06/start` checkpoint, which still has the comment line.
- **Bundle preparation step:** the candidate's first line `// SEEDED TEACHING EXAMPLE: the total ignores the discount; the calculation itself is correct.` was removed from `src/view.ts`, because it would disclose the defect. `change.diff` was regenerated afterwards. `src/view.ts` hash: recorded `ddad9c935563c973fee3b7698b1512bdde87b9c09d93bb602121f67c62ad871d`, reviewed `25b2976c57c6c9896f58a65769310db9baf4fcd4b38c31230dad50c2ce400445`. All other hashes are as in `bundle-provenance.json`.
- The reviewer was told about the removed line only as a provenance note, not about its content.

Files:

- `REVIEW-PROMPT.md` — the repository's reviewer prompt, embedded verbatim in the sent prompt.
- `prompt-sent.md` — the exact prompt sent to the reviewer (scope rule + verbatim review prompt + provenance note).
- `review-output.md` — the reviewer's full, unedited final report.
- `transcript.jsonl` — the complete reviewer transcript, including tool calls and outputs. Kept locally only and ignored by Git: it contains local session context (absolute paths, account details). The commands and exit codes are listed at the end of `review-output.md`.
- `change.diff`, `bundle-provenance.json` — the reviewed diff and the bundle's original provenance.

Result: **Request changes.** F-1 (high): `src/view.ts:9` renders `subtotal + shipping` as the total; three built-UI tests fail (€105 vs €95, €55 vs €50, €200 vs €185) while 28 unit tests pass. F-2 (low): the code status can stay stale while the summary is hidden after an invalid quantity. The reviewer only read this from code. It was reproduced afterwards during preparation (canonical build, Playwright, 2026-11-03): after SAVE10 on the €100 cart and quantity `1.5`, the status still reads “SAVE10 applied.” and the item count still reads “3 items” while the error is shown and the summary is hidden.
