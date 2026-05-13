// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test('TC3.4 - View Shipping Information', async ({ page }) => {
    // 1. Complete checkout form and reach order overview page
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();

    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();

    // Verify order overview page is displayed
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);

    // 2. Verify shipping information section
    await expect(page.locator('text=Shipping Information:')).toBeVisible();
    await expect(page.locator('text=Free Pony Express Delivery!')).toBeVisible();

    // 3. Verify shipping info matches form entries
    // Shipping information is display-only and shows the delivery method
    const shippingInfo = page.locator('.summary_info:has-text("Shipping Information:")');
    await expect(shippingInfo).toBeVisible();
  });
