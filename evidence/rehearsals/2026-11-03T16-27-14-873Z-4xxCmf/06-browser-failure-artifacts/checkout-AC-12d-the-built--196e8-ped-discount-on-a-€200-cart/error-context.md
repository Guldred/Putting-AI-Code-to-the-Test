# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout.spec.ts >> AC-12d: the built UI shows the capped discount on a €200 cart
- Location: e2e/checkout.spec.ts:43:1

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('total')
Expected: "€185.00"
Received: "€200.00"
Timeout:  2500ms

Call log:
  - Expect "toHaveText" getByTestId('total') with timeout 2500ms
  - waiting for getByTestId('total')
    9 × locator resolved to <strong data-testid="total">€200.00</strong>
      - unexpected value "€200.00"

```

```yaml
- strong: €200.00
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test';
  2  | 
  3  | test.beforeEach(async ({ page }) => { await page.goto('/'); });
  4  | 
  5  | test('AC-10: built UI shows the complete €100 cart breakdown after SAVE10', async ({ page }) => {
  6  |   await page.getByRole('button', { name: '€100 cart' }).click();
  7  |   await page.getByRole('textbox', { name: 'Have a discount code?' }).fill('SAVE10');
  8  |   await page.getByRole('button', { name: 'Apply' }).click();
  9  |   await expect(page.getByTestId('subtotal')).toHaveText('€100.00');
  10 |   await expect(page.getByTestId('discount')).toHaveText('−€10.00');
  11 |   await expect(page.getByTestId('shipping')).toHaveText('€5.00');
  12 |   await expect(page.getByTestId('total')).toHaveText('€95.00');
  13 |   await expect(page.getByRole('status')).toHaveText('SAVE10 applied.');
  14 |   await page.screenshot({ path: 'reports/browser/checkout-desktop.png', fullPage: true });
  15 | });
  16 | 
  17 | test('AC-11: edits, code removal, empty cart and reload recalculate', async ({ page }) => {
  18 |   await page.getByRole('spinbutton', { name: 'Field kit quantity' }).fill('0');
  19 |   await expect(page.getByTestId('subtotal')).toHaveText('€50.00');
  20 |   await expect(page.getByTestId('total')).toHaveText('€55.00');
  21 |   await page.getByRole('textbox', { name: 'Have a discount code?' }).fill('SAVE10');
  22 |   await page.getByRole('button', { name: 'Apply' }).click();
  23 |   await expect(page.getByTestId('discount')).toHaveText('−€5.00');
  24 |   await expect(page.getByTestId('total')).toHaveText('€50.00');
  25 |   await page.getByRole('button', { name: 'Remove code' }).click();
  26 |   await expect(page.getByTestId('total')).toHaveText('€55.00');
  27 |   await page.getByRole('button', { name: 'Clear cart' }).click();
  28 |   await expect(page.getByTestId('shipping')).toHaveText('€0.00');
  29 |   await expect(page.getByTestId('total')).toHaveText('€0.00');
  30 |   await page.reload();
  31 |   await expect(page.getByTestId('subtotal')).toHaveText('€100.00');
  32 |   await expect(page.getByTestId('total')).toHaveText('€100.00');
  33 | });
  34 | 
  35 | test('AC-09: invalid quantity hides the summary instead of showing a stale total', async ({ page }) => {
  36 |   await page.getByRole('spinbutton', { name: 'Field kit quantity' }).fill('1.5');
  37 |   await expect(page.getByRole('alert')).toHaveText('Enter a whole quantity from 0 to 9 for every item.');
  38 |   await expect(page.getByTestId('total')).toBeHidden();
  39 |   await page.getByRole('spinbutton', { name: 'Field kit quantity' }).fill('1');
  40 |   await expect(page.getByTestId('total')).toBeVisible();
  41 | });
  42 | 
  43 | test('AC-12d: the built UI shows the capped discount on a €200 cart', async ({ page }) => {
  44 |   await page.getByRole('button', { name: '€200 cart' }).click();
  45 |   await page.getByRole('textbox', { name: 'Have a discount code?' }).fill('SAVE10');
  46 |   await page.getByRole('button', { name: 'Apply' }).click();
  47 |   await expect(page.getByTestId('subtotal')).toHaveText('€200.00');
  48 |   await expect(page.getByTestId('discount')).toHaveText('−€15.00');
  49 |   await expect(page.getByTestId('shipping')).toHaveText('€0.00');
> 50 |   await expect(page.getByTestId('total')).toHaveText('€185.00');
     |                                           ^ Error: expect(locator).toHaveText(expected) failed
  51 | });
  52 | 
  53 | test('mobile: fixture controls and the total stay accessible without horizontal scrolling', async ({ page }) => {
  54 |   await page.setViewportSize({ width: 390, height: 844 });
  55 |   await expect(page.getByRole('button', { name: '€100 cart' })).toBeVisible();
  56 |   await expect(page.getByTestId('total')).toBeVisible();
  57 |   expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  58 |   await page.screenshot({ path: 'reports/browser/checkout-mobile.png', fullPage: true });
  59 | });
  60 | 
```