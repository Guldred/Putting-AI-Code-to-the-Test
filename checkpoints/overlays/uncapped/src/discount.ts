/** v1: deliberately uncapped. CR-01 is introduced in scene 3. */
export function calculateDiscount(subtotalCents: number, code: string): number {
  if (code !== 'SAVE10' || subtotalCents < 5_000) return 0;
  return Math.round(subtotalCents / 10);
}
