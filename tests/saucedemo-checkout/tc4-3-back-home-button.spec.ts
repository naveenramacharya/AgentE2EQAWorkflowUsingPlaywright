// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test('TC4.3 - Back Home Button', async ({ page }) => {
    // 1. Complete the entire checkout process
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();

    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();

    await page.locator('[data-test="finish"]').click();

    // Verify user is on checkout-complete.html page
    await expect(page).toHaveURL(/.*checkout-complete\.html/);

    // 2. Verify Back Home button is visible
    await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();

    // 3. Click Back Home button
    await page.locator('[data-test="back-to-products"]').click();

    // Verify user is redirected to inventory.html
    await expect(page).toHaveURL(/.*inventory\.html/);

    // 4. Verify inventory page is loaded properly
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
  });
