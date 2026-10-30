import { describe, expect, it } from 'vitest';
import { calculateCheckout } from '../src/checkout';
import { calculateDiscount } from '../src/discount';

describe('CR-01 — maximum discount', () => {
  it('AC-12d: caps a €200 order at €15', () => {
    expect(calculateDiscount(20000, 'SAVE10')).toBe(1500);
    expect(calculateCheckout([{ unitPriceCents: 20000, quantity: 1 }], 'SAVE10')).toEqual({
      subtotalCents: 20000, discountCents: 1500, shippingCents: 0, totalCents: 18500,
    });
  });
  it.each([[14999, 1500], [15000, 1500], [15010, 1500]])('AC-12a/b/c: subtotal %i gives discount %i', (subtotal, discount) => {
    expect(calculateDiscount(subtotal, 'SAVE10')).toBe(discount);
  });
});
