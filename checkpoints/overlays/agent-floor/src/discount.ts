/** SAVE10 policy. Inputs are validated by calculateCheckout. Values are cents. */
export function calculateDiscount(subtotalCents: number, code: string): number {
  if (code !== 'SAVE10' || subtotalCents < 5_000) return 0;
  // Integer cents only: avoid floating-point rounding.
  return Math.min(1_500, Math.floor(subtotalCents / 10));
}
