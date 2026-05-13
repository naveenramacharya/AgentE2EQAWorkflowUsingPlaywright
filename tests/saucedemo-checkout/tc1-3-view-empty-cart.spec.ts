// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test('TC1.3 - View Empty Cart', async ({ page }) => {
    // 1. Log in with standard_user credentials
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Verify login successful
    await expect(page).toHaveURL(/.*inventory\.html/);

    // 2. Navigate directly to the cart page without adding items
    await page.locator('[data-test="shopping-cart-link"]').click();

    // Verify cart page is displayed
    await expect(page).toHaveURL(/.*cart\.html/);
    await expect(page.locator('text=Your Cart')).toBeVisible();

    // Verify no items are displayed in the cart
    const cartItems = page.locator('[data-test="inventory-item"]');
    await expect(cartItems).toHaveCount(0);

    // Verify Continue Shopping and Checkout buttons are visible
    await expect(page.locator('[data-test="continue-shopping"]')).toBeVisible();
    await expect(page.locator('[data-test="checkout"]')).toBeVisible();
  });
