// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('TC6 - Complete Checkout Flow', () => {
  test('TC6.1 - Happy path: Complete checkout successfully', async ({ page }) => {
    // 1. Log in with standard_user / secret_sauce
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Verify login is successful and user is on inventory page
    await expect(page).toHaveURL(/.*inventory\.html/);

    // 2. Add 3 items to cart: Backpack, Bike Light, Bolt T-Shirt
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

    // 3. Navigate to cart page
    await page.locator('[data-test="shopping-cart-link"]').click();
    
    // Verify cart page is displayed with 3 items
    await expect(page).toHaveURL(/.*cart\.html/);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('3');
    
    // Click Checkout button
    await page.locator('[data-test="checkout"]').click();
    
    // Verify checkout form page is displayed
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);
    await expect(page.locator('text=Checkout: Your Information')).toBeVisible();
    
    // Fill checkout form with valid data: First Name='John', Last Name='Doe', Postal Code='12345'
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    
    // Verify form fields are populated
    await expect(page.locator('[data-test="firstName"]')).toHaveValue('John');
    await expect(page.locator('[data-test="lastName"]')).toHaveValue('Doe');
    await expect(page.locator('[data-test="postalCode"]')).toHaveValue('12345');
    
    // Click Continue button
    await page.locator('[data-test="continue"]').click();
    
    // Verify order overview page is displayed
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);
    await expect(page.locator('text=Checkout: Overview')).toBeVisible();
    
    // Verify items are displayed
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(3);
    
    // Verify payment information
    await expect(page.locator('text=Payment Information:')).toBeVisible();
    await expect(page.locator('text=SauceCard #31337')).toBeVisible();
    
    // Verify shipping information
    await expect(page.locator('text=Shipping Information:')).toBeVisible();
    await expect(page.locator('text=Free Pony Express Delivery!')).toBeVisible();
    
    // Verify order totals
    await expect(page.locator('text=Item total: $55.97')).toBeVisible();
    await expect(page.locator('text=Tax: $4.48')).toBeVisible();
    await expect(page.locator('text=Total: $60.45')).toBeVisible();
    
    // Click Finish button
    await page.locator('[data-test="finish"]').click();
    
    // Verify order completion page
    await expect(page).toHaveURL(/.*checkout-complete\.html/);
    await expect(page.locator('text=Checkout: Complete!')).toBeVisible();
    await expect(page.locator('text=Thank you for your order!')).toBeVisible();
    await expect(page.locator('text=Your order has been dispatched, and will arrive just as fast as the pony can get there!')).toBeVisible();
    
    // Click Back Home button
    await page.locator('[data-test="back-to-products"]').click();
    
    // Verify user is back on inventory page
    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(page.locator('text=Products')).toBeVisible();
    
    // Verify cart is empty
    const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).not.toBeVisible();
  });
});
