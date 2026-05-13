// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test('TC4.2 - Order Completion Message', async ({ page }) => {
    // 1. Complete the entire checkout process successfully
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

    // Verify user reaches completion page
    await expect(page).toHaveURL(/.*checkout-complete\.html/);

    // 2. Verify success message content
    await expect(page.locator('text=Thank you for your order!')).toBeVisible();
    await expect(page.locator('text=Your order has been dispatched, and will arrive just as fast as the pony can get there!')).toBeVisible();

    // 3. Verify no error messages are shown
    // Check that there are no error message elements visible
    const errorMessages = page.locator('[data-test="error"]');
    await expect(errorMessages).toHaveCount(0);
  });
