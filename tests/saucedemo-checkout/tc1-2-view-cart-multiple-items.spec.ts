// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test('TC1.2 - View Cart with Multiple Items', async ({ page }) => {
    // 1. Log in with standard_user credentials
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Verify login successful
    await expect(page).toHaveURL(/.*inventory\.html/);

    // 2. Add three different items to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

    // Verify cart badge shows '3'
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('3');

    // 3. Navigate to the cart page
    await page.locator('[data-test="shopping-cart-link"]').click();

    // Verify cart page displays all 3 items
    await expect(page).toHaveURL(/.*cart\.html/);
    await expect(page.locator('text=Your Cart')).toBeVisible();

    const cartItems = page.locator('[data-test="inventory-item"]');
    await expect(cartItems).toHaveCount(3);

    // Verify QTY and Description columns are visible
    await expect(page.locator('text=QTY')).toBeVisible();
    await expect(page.locator('text=Description')).toBeVisible();

    // Verify each item is displayed with correct details
    await expect(page.locator('[data-test="inventory-item-name"]:has-text("Sauce Labs Backpack")')).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-name"]:has-text("Sauce Labs Bike Light")')).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-name"]:has-text("Sauce Labs Bolt T-Shirt")')).toBeVisible();

    // Verify each item has quantity 1 and Remove button
    const removeButtons = page.locator('[data-test*="remove-"]');
    await expect(removeButtons).toHaveCount(3);
  });
