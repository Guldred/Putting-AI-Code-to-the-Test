// SEEDED TEACHING EXAMPLE: free shipping incorrectly uses the subtotal before discount.
import { calculateDiscount } from './discount';

export interface CartLine {
  unitPriceCents: number;
  quantity: number;
}

export interface Checkout {
  subtotalCents: number;
  discountCents: number;
  shippingCents: number;
  totalCents: number;
}

export function calculateCheckout(lines: readonly CartLine[], code = ''): Checkout {
  for (const line of lines) {
    if (!Number.isSafeInteger(line.unitPriceCents) || line.unitPriceCents < 0
      || !Number.isInteger(line.quantity) || line.quantity < 0 || line.quantity > 9) {
      throw new RangeError('Prices must be non-negative integer cents; quantities must be integers from 0 to 9.');
    }
  }
  const subtotalCents = lines.reduce((sum, line) => sum + line.unitPriceCents * line.quantity, 0);
  if (!Number.isSafeInteger(subtotalCents)) throw new RangeError('Cart subtotal exceeds safe integer cents.');

  const discountCents = calculateDiscount(subtotalCents, code);
  const merchandiseCents = subtotalCents - discountCents;
  const isEmpty = lines.every(line => line.quantity === 0);
  const shippingCents = isEmpty || subtotalCents >= 10_000 ? 0 : 500;
  return { subtotalCents, discountCents, shippingCents, totalCents: merchandiseCents + shippingCents };
}
