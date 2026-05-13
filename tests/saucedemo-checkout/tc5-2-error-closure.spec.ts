// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test('TC5.2 - Error Message Closure', async ({ page }) => {
    // 1. Trigger a validation error by submitting empty form
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();

    await page.locator('[data-test="continue"]').click();

    // Verify error message appears
    await expect(page.locator('text=Error: First Name is required')).toBeVisible();

    // 2. Verify error close button is visible
    const errorCloseButton = page.locator('[data-test="error-button"]');
    await expect(errorCloseButton).toBeVisible();

    // 3. Click error close button
    await errorCloseButton.click();

    // Verify error message disappears
    await expect(page.locator('text=Error: First Name is required')).not.toBeVisible();

    // Verify form is still displayed with empty fields
    await expect(page.locator('[data-test="firstName"]')).toHaveValue('');
  });
