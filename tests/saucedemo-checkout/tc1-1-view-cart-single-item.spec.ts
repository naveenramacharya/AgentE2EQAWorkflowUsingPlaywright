// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test('TC1.1 - View Cart with Single Item', async ({ page }) => {
    // 1. Log in with standard_user credentials
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Verify login successful
    await expect(page).toHaveURL(/.*inventory\.html/);

    // 2. Add the 'Sauce Labs Backpack' item to the cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Verify item is added successfully and cart badge shows '1'
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('1');

    // 3. Navigate to the cart page by clicking cart icon
    await page.locator('[data-test="shopping-cart-link"]').click();

    // Verify cart page is displayed with correct URL
    await expect(page).toHaveURL(/.*cart\.html/);
    await expect(page.locator('text=Your Cart')).toBeVisible();

    // 4. Verify the cart displays the item with correct details
    const cartItems = page.locator('[data-test="inventory-item"]');
    await expect(cartItems).toHaveCount(1);

    // Verify item name, description, price, and quantity
    await expect(page.locator('[data-test="inventory-item-name"]')).toContainText('Sauce Labs Backpack');
    await expect(page.locator('[data-test="inventory-item-desc"]')).toContainText('carry.allTheThings()');
    await expect(page.locator('[data-test="inventory-item-price"]')).toContainText('$29.99');
    await expect(page.locator('[data-test="item-quantity"]')).toContainText('1');

    // Verify navigation buttons are visible
    await expect(page.locator('[data-test="continue-shopping"]')).toBeVisible();
    await expect(page.locator('[data-test="checkout"]')).toBeVisible();
  });
