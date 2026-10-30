# Prepared review example — not an independently performed review

This is an authored teaching example for scene 5. It is not a transcript, model output or evidence that another reviewer inspected the change. The executable browser failure separately demonstrates the defect.

**Example finding: Request changes — the displayed total ignores the discount.**

In the `05/start` checkpoint, `src/view.ts` computes the displayed total from `result.subtotalCents + result.shippingCents`. The calculation already returns `result.totalCents` after subtracting the discount. This violates AC-10.

Reproduce: choose the €100 cart, enter SAVE10 and click Apply. The calculation is subtotal €100, discount €10, shipping €5, total €95. The UI displays €105 as the total. The unit test of the calculation remains green because it does not execute the rendering code.

Use `result.totalCents` for the total display. Assert the actual rendered subtotal, deduction, shipping and final total in the built application. The browser test named `AC-10: built UI shows the complete €100 cart breakdown after SAVE10` detects the seeded defect and passes in `05/fixed`.

**Review limit:** this example illustrates how a reviewer could report the issue. It establishes no independent verification of other criteria. A live review has a separate prompt and must retain its own actual output.
