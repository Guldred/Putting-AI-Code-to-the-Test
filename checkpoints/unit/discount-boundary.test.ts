import { expect, it } from 'vitest';
import { calculateCheckout } from '../src/checkout';
import { calculateDiscount } from '../src/discount';

it('AC-03b: SAVE10 applies at exactly €50, not only above it', () => {
  expect(calculateDiscount(5000, 'SAVE10')).toBe(500);
  expect(calculateCheckout([{ unitPriceCents: 5000, quantity: 1 }], 'SAVE10')).toEqual({
    subtotalCents: 5000, discountCents: 500, shippingCents: 500, totalCents: 5000,
  });
});
