// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test('TC2.10 - Whitespace Only Input', async ({ page }) => {
    // 1. Log in and add items to cart
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();

    // 2. Navigate to checkout page
    await page.locator('[data-test="checkout"]').click();

    // 3. Enter only whitespace in First Name field
    await page.locator('[data-test="firstName"]').fill('     ');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');

    // 4. Click Continue button
    await page.locator('[data-test="continue"]').click();

    // Verify form validation behavior is consistent with requirements
    // Based on application behavior, whitespace is treated as valid input
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);
  });
