// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test('TC2.5 - All Fields Empty Validation', async ({ page }) => {
    // 1. Log in and add items to cart
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();

    // 2. Navigate to checkout page
    await page.locator('[data-test="checkout"]').click();

    // Verify checkout step 1 form is displayed with all fields empty
    await expect(page.locator('[data-test="firstName"]')).toHaveValue('');
    await expect(page.locator('[data-test="lastName"]')).toHaveValue('');
    await expect(page.locator('[data-test="postalCode"]')).toHaveValue('');

    // 3. Click Continue button without filling any fields
    await page.locator('[data-test="continue"]').click();

    // Verify form submission is prevented and error message appears
    await expect(page.locator('text=Error: First Name is required')).toBeVisible();

    // 4. Verify error indicators are present
    await expect(page.locator('[data-test="firstName"] + [data-icon="times-circle"]')).toBeVisible();
  });
