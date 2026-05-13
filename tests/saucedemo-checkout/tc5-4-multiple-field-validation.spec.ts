// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test('TC5.4 - Multiple Field Validation', async ({ page }) => {
    // 1. Navigate to checkout form
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();

    // Verify form is displayed
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);

    // 2. Fill only First Name='John', leave Last Name and Postal Code empty
    await page.locator('[data-test="firstName"]').fill('John');

    // 3. Click Continue
    await page.locator('[data-test="continue"]').click();

    // Verify first validation error appears (Last Name is required)
    await expect(page.locator('text=Error: Last Name is required')).toBeVisible();

    // 4. Close error and fill Last Name='Doe'
    await page.locator('[data-test="error-button"]').click();
    await page.locator('[data-test="lastName"]').fill('Doe');

    // 5. Click Continue again
    await page.locator('[data-test="continue"]').click();

    // Verify next validation error appears (Postal Code is required)
    await expect(page.locator('text=Error: Postal Code is required')).toBeVisible();

    // 6. Fill Postal Code and submit
    await page.locator('[data-test="error-button"]').click();
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();

    // Verify form is accepted and user proceeds to overview
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);
  });
