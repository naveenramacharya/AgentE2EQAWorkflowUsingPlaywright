// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test('TC2.9 - Single Character Input in Each Field', async ({ page }) => {
    // 1. Log in and add items to cart
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();

    // 2. Navigate to checkout page
    await page.locator('[data-test="checkout"]').click();

    // 3. Enter single character in each field
    await page.locator('[data-test="firstName"]').fill('A');
    await page.locator('[data-test="lastName"]').fill('B');
    await page.locator('[data-test="postalCode"]').fill('1');

    // 4. Click Continue button
    await page.locator('[data-test="continue"]').click();

    // Verify form is submitted successfully and user proceeds to checkout overview
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);
  });
