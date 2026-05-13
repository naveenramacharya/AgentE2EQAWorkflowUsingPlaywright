// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test('TC4.4 - Cart Cleared After Successful Checkout', async ({ page }) => {
    // 1. Complete the entire checkout process successfully
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    // Verify items are in cart
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('2');

    // Complete checkout
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();

    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();

    await page.locator('[data-test="finish"]').click();

    // Verify order is completed and user sees success message
    await expect(page.locator('text=Thank you for your order!')).toBeVisible();

    // 2. Click Back Home to return to inventory
    await page.locator('[data-test="back-to-products"]').click();

    // Verify user is on inventory.html page
    await expect(page).toHaveURL(/.*inventory\.html/);

    // 3. Navigate to cart page
    await page.locator('[data-test="shopping-cart-link"]').click();

    // Verify cart page is displayed
    await expect(page).toHaveURL(/.*cart\.html/);

    // 4. Verify cart is empty
    const cartItems = page.locator('[data-test="inventory-item"]');
    await expect(cartItems).toHaveCount(0);

    // Verify cart badge is not visible (or shows 0)
    const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).not.toBeVisible();

    // 5. Return to inventory and verify all items show 'Add to cart' buttons
    await page.locator('[data-test="continue-shopping"]').click();
    await expect(page).toHaveURL(/.*inventory\.html/);

    // Verify all previously purchased items now show 'Add to cart' (not 'Remove')
    await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
    await expect(page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]')).toBeVisible();
  });
