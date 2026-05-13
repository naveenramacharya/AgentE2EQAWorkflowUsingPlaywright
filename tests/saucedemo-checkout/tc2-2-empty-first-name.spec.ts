// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test('TC2.2 - Empty First Name Validation', async ({ page }) => {
    // 1. Log in and add items to cart
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();

    // 2. Navigate to checkout page
    await page.locator('[data-test="checkout"]').click();

    // Verify checkout step 1 form is displayed
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);

    // 3. Leave First Name field empty, fill other fields
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');

    // 4. Click Continue button
    await page.locator('[data-test="continue"]').click();

    // Verify form submission is prevented and error message appears
    await expect(page.locator('text=Error: First Name is required')).toBeVisible();

    // Verify error indicator appears next to First Name field
    await expect(page.locator('[data-test="firstName"] + [data-icon="times-circle"]')).toBeVisible();

    // 5. Verify user stays on checkout page
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);

    // Verify form data is retained
    await expect(page.locator('[data-test="lastName"]')).toHaveValue('Doe');
    await expect(page.locator('[data-test="postalCode"]')).toHaveValue('12345');
  });
