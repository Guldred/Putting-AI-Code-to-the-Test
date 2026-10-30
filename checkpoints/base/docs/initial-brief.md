# Initial brief — deliberately ambiguous teaching artifact

> Build a small checkout. Customers can change their shopping cart and apply SAVE10 for 10% off orders of at least €50. Shipping is €5, and orders over €100 ship free. Show the subtotal, discount, shipping and final total.

This is the complete starting prompt for scene 1. It deliberately does **not** decide:

- Whether the free-shipping threshold uses the subtotal before or after discount.
- Whether “over €100” includes exactly €100.
- How percentage discounts are rounded.
- Whether the discount has a cap.
- How an empty cart behaves.

An implementation can be plausible without being accepted. Tests that repeat its assumptions cannot resolve these questions. Do not silently substitute the clarified specification for this artifact when explaining scene 1.
