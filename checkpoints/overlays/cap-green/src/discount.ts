/** CR-01: first passing implementation, before refactoring. */
export function calculateDiscount(subtotalCents: number, code: string): number {
  if (code !== 'SAVE10' || subtotalCents < 5_000) return 0;
  const percentageCents = Math.round(subtotalCents / 10);
  if (percentageCents > 1_500) return 1_500;
  return percentageCents;
}
