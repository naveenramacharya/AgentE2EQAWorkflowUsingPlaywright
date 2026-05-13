// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test('TC1.4 - Remove Item from Cart', async ({ page }) => {
    // 1. Log in with standard_user credentials
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Verify login successful
    await expect(page).toHaveURL(/.*inventory\.html/);

    // 2. Add two items to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    // Verify cart badge shows '2'
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('2');

    // 3. Navigate to cart page
    await page.locator('[data-test="shopping-cart-link"]').click();

    // Verify both items are displayed
    const cartItems = page.locator('[data-test="inventory-item"]');
    await expect(cartItems).toHaveCount(2);

    // 4. Click Remove button on 'Sauce Labs Backpack'
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

    // Verify Backpack is removed and only Bike Light remains
    await expect(cartItems).toHaveCount(1);
    await expect(page.locator('[data-test="inventory-item-name"]:has-text("Sauce Labs Bike Light")')).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-name"]:has-text("Sauce Labs Backpack")')).not.toBeVisible();

    // Verify cart badge updates to '1'
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('1');
  });
