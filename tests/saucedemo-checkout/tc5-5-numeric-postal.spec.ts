// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test('TC5.5 - Form Validation with Numeric Postal Code', async ({ page }) => {
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

    // 2. Fill all fields with numeric values
    await page.locator('[data-test="firstName"]').fill('12345');
    await page.locator('[data-test="lastName"]').fill('67890');
    await page.locator('[data-test="postalCode"]').fill('11111');

    // 3. Click Continue
    await page.locator('[data-test="continue"]').click();

    // Verify form is submitted successfully or appropriate validation message appears
    // Based on application behavior, numeric values are typically accepted
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);
  });
