// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test('TC3.2 - View Order Summary Totals', async ({ page }) => {
    // 1. Complete checkout form with valid data and reach order overview page
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();

    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();

    // Verify order overview page is displayed
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);

    // 2. Verify price total section
    await expect(page.locator('text=Price Total')).toBeVisible();

    // 3. Verify item total is displayed correctly
    await expect(page.locator('.summary_subtotal_label')).toContainText('Item total: $39.98');

    // 4. Verify tax calculation
    await expect(page.locator('.summary_tax_label')).toContainText('Tax: $3.20');

    // 5. Verify final total
    await expect(page.locator('.summary_total_label')).toContainText('Total: $43.18');
  });
