// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test('TC6.2 - Continue Shopping from Cart', async ({ page }) => {
    // 1. Log in and add items to cart
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();

    // Verify items are in cart
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(1);

    // 2. Navigate to cart page
    await expect(page).toHaveURL(/.*cart\.html/);

    // 3. Click Continue Shopping button
    await page.locator('[data-test="continue-shopping"]').click();

    // Verify user is redirected to inventory page
    await expect(page).toHaveURL(/.*inventory\.html/);

    // Verify all products are displayed
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
  });
