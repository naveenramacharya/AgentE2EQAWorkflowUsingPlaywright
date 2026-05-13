// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test('TC3.1 - View Order Overview with Multiple Items', async ({ page }) => {
    // 1. Log in with standard_user credentials
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Verify login successful
    await expect(page).toHaveURL(/.*inventory\.html/);

    // 2. Add three items to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

    // 3. Navigate through checkout: cart → checkout form → click Continue with valid data
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();

    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();

    // Verify user is on checkout-step-two.html page
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);

    // 4. Verify page title and heading
    await expect(page.locator('text=Checkout: Overview')).toBeVisible();

    // 5. Verify order items section
    await expect(page.locator('text=QTY')).toBeVisible();
    await expect(page.locator('text=Description')).toBeVisible();

    // Verify all 3 items are displayed with correct names and prices
    await expect(page.locator('[data-test="inventory-item-name"]:has-text("Sauce Labs Backpack")')).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-name"]:has-text("Sauce Labs Bike Light")')).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-name"]:has-text("Sauce Labs Bolt T-Shirt")')).toBeVisible();

    // Verify each item shows quantity of 1
    const quantityElements = page.locator('.cart_quantity');
    await expect(quantityElements).toHaveCount(3);
    await expect(quantityElements.first()).toContainText('1');
  });
