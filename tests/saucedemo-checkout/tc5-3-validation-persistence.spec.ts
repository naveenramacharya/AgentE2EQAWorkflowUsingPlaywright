// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test('TC5.3 - Validation Error Persistence', async ({ page }) => {
    // 1. Navigate to checkout form
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();

    // Verify checkout step 1 is displayed
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);

    // 2. Fill First Name='John' and Last Name='Doe', leave Postal Code empty
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');

    // 3. Click Continue
    await page.locator('[data-test="continue"]').click();

    // Verify error message 'Postal Code is required' appears
    await expect(page.locator('text=Error: Postal Code is required')).toBeVisible();

    // 4. Close error message
    await page.locator('[data-test="error-button"]').click();

    // 5. Verify form data is retained
    await expect(page.locator('[data-test="firstName"]')).toHaveValue('John');
    await expect(page.locator('[data-test="lastName"]')).toHaveValue('Doe');
    await expect(page.locator('[data-test="postalCode"]')).toHaveValue('');
  });
