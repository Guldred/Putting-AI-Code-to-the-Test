# Acceptance criteria → verification evidence

The baseline is [specification v1](specification.md) plus [CR-01](discount-cap-change.md). “Covered” below describes specific assertions, not exhaustive proof. A specification row is not evidence until a check or review actually examines it.

| Criterion | Automated observation | Deliberate gap / scene | Actual execution evidence |
| --- | --- | --- | --- |
| AC-01: empty cart | `tests/checkout.test.ts` checks no lines and zero quantity; browser clears cart | Initial happy paths alone do not settle all rules | Rehearsal `02-fixed`, `05-browser-passes` |
| AC-02: quantity/subtotal | Unit test asserts all cents for 2 × €25; browser edits quantity | No display guarantee from the unit test | `02-fixed`, `05-browser-passes` |
| AC-03a/c: below/above discount minimum | `tests/discount.test.ts` (checkpoint name: `discount-v1.test.ts`) asserts 4,999 and 6,000 | These do not test equality | `04-coverage-before`, `04-mutation-before` |
| AC-03b: exactly €50 | `tests/discount-boundary.test.ts` asserts discount and whole checkout; browser's €50 path also checks display | Deliberately absent until scene 4; `<` → `<=` survives beforehand | `04-mutation-before-report/mutation.json` vs `04-mutation-after-report/mutation.json`; boundary-policy blocked/passed logs |
| AC-04: code matching | Unit table checks empty, unknown and lowercase codes | Only one exact discount code is in scope | `02-fixed`, final gate unit log |
| AC-05a/b: no-code shipping equality | Checkout table asserts 9,999 and 10,000 | “Over” in the initial brief is insufficient | `02-fixed` |
| AC-06: shipping after discount | Checkout asserts subtotal 10,000, discount 1,000, shipping 500, total 9,500 | Wrong pre-discount assumption and matching tests in scenes 1–2 | `01-exposed`, `02-red` fail; `02-fixed` passes |
| AC-07a/b: discounted shipping boundary | Checkout table asserts 11,110 → merchandise 9,999 and 11,111 → merchandise 10,000 | UI fixtures need not expose arbitrary unit prices; pure calculation tests do | `02-fixed` |
| AC-08: half-cent rounding | Discount test checks 5,005 → 501 | No claim about arbitrary-precision accounting | `02-fixed`, final gate unit log |
| AC-09: domain errors | Unit table checks invalid prices/quantities and unsafe aggregated subtotal; browser hides total after fractional quantity | UI only exposes the fixed catalog; direct API domain is broader | `02-fixed`, `05-browser-passes` |
| AC-10: visible breakdown | Playwright checks literal subtotal, deduction, shipping and total in built UI | Seeded `view.ts` bug passes unit tests | `05-unit-green`, `05-browser-detects` fail at rendered totals; `05-browser-passes` after fix |
| AC-11: interactions/reset | Browser edits quantity, removes code, clears cart, reloads | State is intentionally in memory only | `05-browser-passes` |
| AC-12a/b/c: cap transition | `tests/cap.test.ts` checks discount at 14,999, 15,000 and 15,010; shipping/composition checked in checkout tests | Original red run fails at 15,010; rounding already reaches €15 just below €150 | Original `authoring/002-cap-red-before-implementation`; `03-red` / `03-green` / `03-refactor` |
| AC-12d: capped order | Cap test asserts all four values for 20,000; browser asserts €200 → €15 → €185 | TDD does not establish UI wiring | Original cap red/green logs; `05-browser-passes` |
| G-01: enforced packaging | `scripts/release.mjs` requires typecheck, units, scoped mutation floor, killed critical boundary, build and real browser tests | Only the local release command is enforced; review/business acceptance are separate | `06-release-blocked-artifacts/release.json` has `blocked` and null archive; `06-release-ready-artifacts/release.json` has `packaged` and archive hash |
| R-01: independent verification | A fresh-context reviewer prompt and actual-diff bundle are prepared | **Not performed.** The illustrative finding is not independent approval | [Prepared finding label](reviews/prepared-ui-finding.md); actual browser execution is separate evidence |

Rehearsal paths above are relative to the immutable directory linked from [latest evidence](../evidence/latest.md). Every command has a `.log` and `.json` record with source hashes. The original cap chronology is preserved separately under `evidence/authoring/` and is not overwritten by rehearsals.

## Acceptance at each decision point

| Scene | New evidence | What remains insufficient |
| --- | --- | --- |
| 1 | A runnable checkout and five green tests | Unresolved requirements and correlated test oracle |
| 2 | Explicit shipping rule and boundary examples; corrected tests/code | Exact discount minimum still untested; no cap requirement yet |
| 3 | Actual red → green → refactor for CR-01 | Exact minimum and UI wiring still not established |
| 4 | Boundary mutant investigated and detected after a new case | UI wiring and independent review still separate |
| 5 | A built-UI test detects and verifies the fix | Prepared review does not establish an actual independent review |
| 6 | The release command enforces selected local checks | Acceptance still needs a scope, owner and stated residual risks |
