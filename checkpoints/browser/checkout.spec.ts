import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => { await page.goto('/'); });

test('AC-10: built UI shows the complete €100 cart breakdown after SAVE10', async ({ page }) => {
  await page.getByRole('button', { name: '€100 cart' }).click();
  await page.getByRole('textbox', { name: 'Have a discount code?' }).fill('SAVE10');
  await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.getByTestId('subtotal')).toHaveText('€100.00');
  await expect(page.getByTestId('discount')).toHaveText('−€10.00');
  await expect(page.getByTestId('shipping')).toHaveText('€5.00');
  await expect(page.getByTestId('total')).toHaveText('€95.00');
  await expect(page.getByRole('status')).toHaveText('SAVE10 applied.');
  await page.screenshot({ path: 'reports/browser/checkout-desktop.png', fullPage: true });
});

test('AC-11: edits, code removal, empty cart and reload recalculate', async ({ page }) => {
  await page.getByRole('spinbutton', { name: 'Field kit quantity' }).fill('0');
  await expect(page.getByTestId('subtotal')).toHaveText('€50.00');
  await expect(page.getByTestId('total')).toHaveText('€55.00');
  await page.getByRole('textbox', { name: 'Have a discount code?' }).fill('SAVE10');
  await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.getByTestId('discount')).toHaveText('−€5.00');
  await expect(page.getByTestId('total')).toHaveText('€50.00');
  await page.getByRole('button', { name: 'Remove code' }).click();
  await expect(page.getByTestId('total')).toHaveText('€55.00');
  await page.getByRole('button', { name: 'Clear cart' }).click();
  await expect(page.getByTestId('shipping')).toHaveText('€0.00');
  await expect(page.getByTestId('total')).toHaveText('€0.00');
  await page.reload();
  await expect(page.getByTestId('subtotal')).toHaveText('€100.00');
  await expect(page.getByTestId('total')).toHaveText('€100.00');
});

test('AC-09: invalid quantity hides the summary instead of showing a stale total', async ({ page }) => {
  await page.getByRole('spinbutton', { name: 'Field kit quantity' }).fill('1.5');
  await expect(page.getByRole('alert')).toHaveText('Enter a whole quantity from 0 to 9 for every item.');
  await expect(page.getByTestId('total')).toBeHidden();
  await page.getByRole('spinbutton', { name: 'Field kit quantity' }).fill('1');
  await expect(page.getByTestId('total')).toBeVisible();
});

test('AC-12d: the built UI shows the capped discount on a €200 cart', async ({ page }) => {
  await page.getByRole('button', { name: '€200 cart' }).click();
  await page.getByRole('textbox', { name: 'Have a discount code?' }).fill('SAVE10');
  await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.getByTestId('subtotal')).toHaveText('€200.00');
  await expect(page.getByTestId('discount')).toHaveText('−€15.00');
  await expect(page.getByTestId('shipping')).toHaveText('€0.00');
  await expect(page.getByTestId('total')).toHaveText('€185.00');
});

test('mobile: fixture controls and the total stay accessible without horizontal scrolling', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByRole('button', { name: '€100 cart' })).toBeVisible();
  await expect(page.getByTestId('total')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: 'reports/browser/checkout-mobile.png', fullPage: true });
});
