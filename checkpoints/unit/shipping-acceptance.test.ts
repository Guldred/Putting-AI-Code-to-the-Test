import { expect, it } from 'vitest';
import { calculateCheckout } from '../src/checkout';

it('AC-06: a €100 cart with SAVE10 pays €5 shipping because merchandise is €90', () => {
  expect(calculateCheckout([{ unitPriceCents: 10000, quantity: 1 }], 'SAVE10')).toEqual({
    subtotalCents: 10000, discountCents: 1000, shippingCents: 500, totalCents: 9500,
  });
});
