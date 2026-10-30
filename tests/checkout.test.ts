import { describe, expect, it } from 'vitest';
import { calculateCheckout } from '../src/checkout';

const cart = (unitPriceCents: number, quantity = 1) => [{ unitPriceCents, quantity }];

describe('checkout v1 — clarified shipping', () => {
  it('AC-01: an empty cart costs nothing, even with a code', () => {
    expect(calculateCheckout([], 'SAVE10')).toEqual({ subtotalCents: 0, discountCents: 0, shippingCents: 0, totalCents: 0 });
    expect(calculateCheckout(cart(2500, 0))).toEqual({ subtotalCents: 0, discountCents: 0, shippingCents: 0, totalCents: 0 });
  });
  it('AC-02: adds quantity and shipping', () => {
    expect(calculateCheckout(cart(2500, 2))).toEqual({ subtotalCents: 5000, discountCents: 0, shippingCents: 500, totalCents: 5500 });
  });
  it.each([
    [9999, '', 0, 500, 10499],
    [10000, '', 0, 0, 10000],
    [10000, 'SAVE10', 1000, 500, 9500],
    [11111, 'SAVE10', 1111, 0, 10000],
    [11110, 'SAVE10', 1111, 500, 10499],
  ])('AC-05/06/07: subtotal %i with %s → discount %i, shipping %i, total %i', (subtotalCents, code, discountCents, shippingCents, totalCents) => {
    expect(calculateCheckout(cart(subtotalCents), code)).toEqual({ subtotalCents, discountCents, shippingCents, totalCents });
  });
  it.each([
    [-1, 1], [100.5, 1], [Number.NaN, 1], [Number.POSITIVE_INFINITY, 1], [Number.MAX_SAFE_INTEGER + 1, 1],
    [100, -1], [100, 1.5], [100, 10],
  ])('AC-09: rejects price %s and quantity %s', (price, quantity) => {
    expect(() => calculateCheckout(cart(price, quantity))).toThrow(RangeError);
  });
  it('AC-09: rejects an unsafe aggregated subtotal', () => {
    expect(() => calculateCheckout(cart(Number.MAX_SAFE_INTEGER, 2))).toThrow(RangeError);
  });
  it('a zero-priced item still makes a non-empty cart', () => {
    expect(calculateCheckout(cart(0)).shippingCents).toBe(500);
  });
});
