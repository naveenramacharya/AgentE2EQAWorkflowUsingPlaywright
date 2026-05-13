import { test, expect } from '@playwright/test';

test.describe('Seed Setup', () => {
  test('seed', async ({ page }) => {
    // Navigate to login page: https://www.saucedemo.com
    await page.goto('https://www.saucedemo.com');

    // Login with credentials: standard_user / secret_sauce
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Verify user is logged in and on inventory page
    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(page.locator('[data-test="inventory-item"]')).toBeDefined();

    // Add items to cart: Sauce Labs Backpack, Sauce Labs Bike Light, Sauce Labs Bolt T-Shirt
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

    // Verify cart badge shows 3 items
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('3');
  });
});
