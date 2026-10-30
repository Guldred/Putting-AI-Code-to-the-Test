import type { Checkout } from './checkout';

export const euros = (cents: number): string => `€${(cents / 100).toFixed(2)}`;

export function renderSummary(result: Checkout, root: ParentNode = document): void {
  root.querySelector('[data-testid="subtotal"]')!.textContent = euros(result.subtotalCents);
  root.querySelector('[data-testid="discount"]')!.textContent = `−${euros(result.discountCents)}`;
  root.querySelector('[data-testid="shipping"]')!.textContent = euros(result.shippingCents);
  root.querySelector('[data-testid="total"]')!.textContent = euros(result.totalCents);
}
