// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test('TC5.1 - Required Field Error Display', async ({ page }) => {
    // 1. Log in and add items to cart
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();

    // 2. Navigate to checkout form
    await page.locator('[data-test="checkout"]').click();

    // Verify checkout step 1 is displayed
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);

    // 3. Attempt to submit empty form
    await page.locator('[data-test="continue"]').click();

    // Verify error message is displayed for first missing field
    await expect(page.locator('text=Error: First Name is required')).toBeVisible();

    // 4. Verify error message format
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toContainText('Error: First Name is required');

    // Verify error message is clearly visible and highlighted
    await expect(errorMessage).toBeVisible();
  });
