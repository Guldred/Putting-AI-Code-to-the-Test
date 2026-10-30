# Change request CR-01 — maximum discount

Introduced in scene 3 after v1 shipping behavior is clarified.

Keep the SAVE10 eligibility, percentage and rounding rules. Limit the resulting discount to **1,500 cents (€15.00) per cart**. Apply the cap after rounding. Shipping continues to depend on merchandise total after the resulting discount. No other rule changes.

| ID | Subtotal with SAVE10 | Discount | Shipping | Final total |
| --- | ---: | ---: | ---: | ---: |
| AC-12a | 14,999 | 1,500 | 0 | 13,499 |
| AC-12b | 15,000 | 1,500 | 0 | 13,500 |
| AC-12c | 15,010 | 1,500 | 0 | 13,510 |
| AC-12d | 20,000 | 1,500 | 0 | 18,500 |

The first red test must be executed against the uncapped implementation. A saved red checkpoint is a rehearsal aid; replaying it alone does not prove the historical test-first sequence. Preserve the original execution record and source hashes.
