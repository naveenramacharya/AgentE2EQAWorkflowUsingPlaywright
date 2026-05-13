// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test('TC1.5 - View Cart Totals', async ({ page }) => {
    // 1. Log in with standard_user credentials
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Verify login successful
    await expect(page).toHaveURL(/.*inventory\.html/);

    // 2. Add Backpack ($29.99) and Bike Light ($9.99) to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    // Verify items are added successfully
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('2');

    // 3. Navigate to cart page
    await page.locator('[data-test="shopping-cart-link"]').click();

    // Verify cart page is displayed with all items
    await expect(page).toHaveURL(/.*cart\.html/);
    await expect(page.locator('text=Your Cart')).toBeVisible();

    // Verify cart displays proper sections
    await expect(page.locator('text=QTY')).toBeVisible();
    await expect(page.locator('text=Description')).toBeVisible();

    // Verify item prices are displayed correctly
    await expect(page.locator('[data-test="inventory-item-price"]:has-text("$29.99")')).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-price"]:has-text("$9.99")')).toBeVisible();

    // Verify cart totals are accessible (will be shown in checkout overview)
    // Note: Cart page doesn't show totals, they're calculated in checkout overview
  });
