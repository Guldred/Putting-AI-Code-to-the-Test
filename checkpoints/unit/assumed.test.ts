// SEEDED TEACHING EXAMPLE: this test oracle repeats the ambiguous brief's pre-discount assumption.
import { expect, it } from 'vitest';
import { calculateCheckout } from '../src/checkout';

it.each([
  [4000, 'SAVE10', 0, 500, 4500],
  [20000, 'SAVE10', 2000, 0, 18000],
  [10000, '', 0, 0, 10000],
  [10000, 'SAVE10', 1000, 0, 9000],
])('plausible assumption: subtotal %i with %s → discount %i, shipping %i, total %i', (subtotalCents, code, discountCents, shippingCents, totalCents) => {
  expect(calculateCheckout([{ unitPriceCents: subtotalCents, quantity: 1 }], code)).toEqual({
    subtotalCents, discountCents, shippingCents, totalCents,
  });
});

it('an empty cart costs nothing', () => {
  expect(calculateCheckout([]).totalCents).toBe(0);
});
