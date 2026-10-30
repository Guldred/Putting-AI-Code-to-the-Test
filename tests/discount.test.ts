import { describe, expect, it } from 'vitest';
import { calculateDiscount } from '../src/discount';

describe('SAVE10 v1', () => {
  it('AC-03a: gives no discount just below the minimum', () => {
    expect(calculateDiscount(4999, 'SAVE10')).toBe(0);
  });
  it('AC-03c: discounts an eligible order', () => {
    expect(calculateDiscount(6000, 'SAVE10')).toBe(600);
  });
  it.each(['', 'UNKNOWN', 'save10'])('AC-04: does not accept code %s', code => {
    expect(calculateDiscount(10000, code)).toBe(0);
  });
  it('AC-08: rounds a half cent up', () => {
    expect(calculateDiscount(5005, 'SAVE10')).toBe(501);
  });
});
