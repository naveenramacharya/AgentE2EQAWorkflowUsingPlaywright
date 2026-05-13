// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test('TC6.5 - Direct URL Navigation to Checkout', async ({ page }) => {
    // 1. Log in and add items to cart
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Verify items are in cart
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('1');

    // 2. Navigate directly to checkout-step-one.html via URL
    await page.goto('https://www.saucedemo.com/checkout-step-one.html');

    // Verify checkout form page loads
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);

    // 3. Verify form is accessible
    await expect(page.locator('[data-test="firstName"]')).toBeVisible();
    await expect(page.locator('[data-test="lastName"]')).toBeVisible();
    await expect(page.locator('[data-test="postalCode"]')).toBeVisible();

    // 4. Fill and submit form
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();

    // Verify checkout proceeds normally to step 2
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);
  });
