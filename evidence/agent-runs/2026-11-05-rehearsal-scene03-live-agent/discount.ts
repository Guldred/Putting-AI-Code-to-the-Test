const SAVE10_CODE = 'SAVE10';
const SAVE10_MIN_SUBTOTAL_CENTS = 5_000;
/** CR-01: the rounded discount is limited to 1,500 cents per cart. */
const SAVE10_MAX_DISCOUNT_CENTS = 1_500;

/**
 * Returns the SAVE10 discount in whole cents; the code is case-sensitive.
 * 10% is computed as `/ 10` (one correctly rounded division) rather than `* 0.1`,
 * so a half cent is always seen as exactly .5 and rounds up.
 */
export function calculateDiscount(subtotalCents: number, code: string): number {
  if (code !== SAVE10_CODE || subtotalCents < SAVE10_MIN_SUBTOTAL_CENTS) return 0;
  const roundedDiscountCents = Math.round(subtotalCents / 10);
  return Math.min(roundedDiscountCents, SAVE10_MAX_DISCOUNT_CENTS);
}
