// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test('TC2.4 - Empty Postal Code Validation', async ({ page }) => {
    // 1. Log in and add items to cart
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();

    // 2. Navigate to checkout page
    await page.locator('[data-test="checkout"]').click();

    // 3. Fill First Name and Last Name, leave Postal Code empty
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');

    // 4. Click Continue button
    await page.locator('[data-test="continue"]').click();

    // Verify error message 'Error: Postal Code is required' is displayed
    await expect(page.locator('text=Error: Postal Code is required')).toBeVisible();

    // Verify error indicator appears next to Postal Code field
    await expect(page.locator('[data-test="postalCode"] + [data-icon="times-circle"]')).toBeVisible();

    // 5. Verify form retains data
    await expect(page.locator('[data-test="firstName"]')).toHaveValue('John');
    await expect(page.locator('[data-test="lastName"]')).toHaveValue('Doe');
  });
