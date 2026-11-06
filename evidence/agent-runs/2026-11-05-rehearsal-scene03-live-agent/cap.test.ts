import { describe, expect, it } from 'vitest';
import { calculateCheckout } from '../src/checkout';
import { calculateDiscount } from '../src/discount';

// CR-01: the SAVE10 discount is limited to 1,500 cents per cart, applied after rounding.
// Expected values below are taken from docs/discount-cap-change.md, not from the implementation.

const cart = (unitPriceCents: number, quantity = 1) => [{ unitPriceCents, quantity }];

describe('CR-01: SAVE10 discount cap of 1,500 cents', () => {
  it('AC-12d: a €200 cart with SAVE10 is discounted by €15, ships free and totals €185', () => {
    expect(calculateCheckout(cart(20000), 'SAVE10')).toEqual({
      subtotalCents: 20000,
      discountCents: 1500,
      shippingCents: 0,
      totalCents: 18500,
    });
  });

  it('AC-12c: just above the cap transition, 10% of 15,010 rounds to 1,501 and is capped to 1,500', () => {
    expect(calculateDiscount(15010, 'SAVE10')).toBe(1500);
    expect(calculateCheckout(cart(15010), 'SAVE10')).toEqual({
      subtotalCents: 15010,
      discountCents: 1500,
      shippingCents: 0,
      totalCents: 13510,
    });
  });

  it.each([
    [14999, 1500, 0, 13499],
    [15000, 1500, 0, 13500],
  ])('AC-12a/b: subtotal %i with SAVE10 → discount %i, shipping %i, total %i (cap boundary, same as uncapped)', (subtotalCents, discountCents, shippingCents, totalCents) => {
    expect(calculateCheckout(cart(subtotalCents), 'SAVE10')).toEqual({ subtotalCents, discountCents, shippingCents, totalCents });
  });
});
