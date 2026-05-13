// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test('TC4.1 - Successful Order Completion', async ({ page }) => {
    // 1. Log in with standard_user credentials
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Verify login successful
    await expect(page).toHaveURL(/.*inventory\.html/);

    // 2. Add items to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // 3. Complete checkout form with valid data
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();

    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();

    // 4. Reach order overview page
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);

    // 5. Click Finish button
    await page.locator('[data-test="finish"]').click();

    // Verify order is processed successfully and user redirected to checkout-complete.html
    await expect(page).toHaveURL(/.*checkout-complete\.html/);

    // 6. Verify completion page elements
    await expect(page.locator('text=Checkout: Complete!')).toBeVisible();
    await expect(page.locator('text=Thank you for your order!')).toBeVisible();
  });
