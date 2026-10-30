# Checkout specification v1

Status: intended behavior recorded before implementation. Scene 1 predates this clarification in the teaching narrative; its source and tests deliberately embody another assumption. Scene 2 makes this document the acceptance baseline. The later cap is specified separately in [the change request](discount-cap-change.md).

## Scope and domain

A browser-local EUR checkout with a fixed product catalog and editable quantities. No service, account, payment, order submission, taxes, persistence, clock-dependent behavior or deployment is needed. Prices are final for this demo. The calculation API accepts cart lines with non-negative integer unit prices in cents and integer quantities from 0 to 9. The UI exposes only the fixed catalog and quantities. Reject out-of-domain values rather than silently calculating a different order. No currency conversion or arbitrary-precision accounting is claimed.

## Rules

1. Calculate subtotal as the sum of `unitPriceCents × quantity`.
2. The exact, case-sensitive code `SAVE10` qualifies when subtotal is **at least 5,000 cents**. Empty, unknown and differently cased codes give zero discount.
3. In v1, discount is 10% of subtotal, rounded to the nearest whole cent, with half cents rounded up. No cap is present yet.
4. Calculate merchandise total as subtotal minus discount.
5. A non-empty cart ships free when merchandise total **after discount is at least 10,000 cents**; otherwise shipping is 500 cents. An empty cart costs zero, including shipping.
6. Final total is merchandise total plus shipping. The UI must display the actual calculation's subtotal, discount, shipping and final total in EUR with two decimals. A discount is displayed as a deduction.
7. Changing quantities or applying/removing a code updates the breakdown. Browser state resets on page reload.

## Observable acceptance criteria

Expected values below are written from the rules, not computed by the function under test. All values in the table are cents.

| ID | Given / when | Subtotal | Discount | Shipping | Total |
| --- | --- | ---: | ---: | ---: | ---: |
| AC-01 | Empty cart, with or without SAVE10 | 0 | 0 | 0 | 0 |
| AC-02 | One 2,500-cent line with quantity 2, no code | 5,000 | 0 | 500 | 5,500 |
| AC-03a | Subtotal 4,999, SAVE10 | 4,999 | 0 | 500 | 5,499 |
| AC-03b | Subtotal exactly 5,000, SAVE10 | 5,000 | 500 | 500 | 5,000 |
| AC-03c | Subtotal 6,000, SAVE10 | 6,000 | 600 | 500 | 5,900 |
| AC-04 | Subtotal 10,000, unknown code or `save10` | 10,000 | 0 | 0 | 10,000 |
| AC-05a | Subtotal 9,999, no code | 9,999 | 0 | 500 | 10,499 |
| AC-05b | Subtotal exactly 10,000, no code | 10,000 | 0 | 0 | 10,000 |
| AC-06 | Subtotal 10,000, SAVE10 | 10,000 | 1,000 | 500 | 9,500 |
| AC-07a | Subtotal 11,111, SAVE10; after discount is 10,000 | 11,111 | 1,111 | 0 | 10,000 |
| AC-07b | Subtotal 11,110, SAVE10; after discount is 9,999 | 11,110 | 1,111 | 500 | 10,499 |
| AC-08 | Subtotal 5,005, SAVE10; 500.5 rounds up | 5,005 | 501 | 500 | 5,004 |
| AC-09 | Negative, fractional or unsafe price; quantity outside integer 0–9 | — | — | — | Reject with a domain error; UI must not show a fabricated total |
| AC-10 | In the browser, choose the €100 cart and apply SAVE10 | 10,000 | 1,000 | 500 | 9,500 |
| AC-11 | Change quantity, clear cart, remove code, reload | — | — | — | Recalculate; reload restores the fixed starting cart |

The exact 5,000-cent discount case is intentionally left untested in the opening state of scene 4. Its presence in this document is not evidence of automated verification.

## Acceptance boundary

Specification establishes intended behavior and examples, not implementation correctness. Unit tests establish observations for selected inputs. Mutation testing probes those tests against generated local changes. Browser tests cover selected wiring and display paths. A fresh reviewer can challenge the specification and diff, but review is still fallible. A technical gate reruns selected checks; it cannot decide that these rules meet a real business need.
