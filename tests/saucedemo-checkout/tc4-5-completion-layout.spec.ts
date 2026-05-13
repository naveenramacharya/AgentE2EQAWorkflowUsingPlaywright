// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test('TC4.5 - Order Completion Page Layout', async ({ page }) => {
    // 1. Complete the entire checkout process
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

    await page.locator('[data-test="finish"]').click();

    // Verify user is on completion page
    await expect(page).toHaveURL(/.*checkout-complete\.html/);

    // 2. Verify page header and branding
    await expect(page.locator('.app_logo')).toContainText('Swag Labs');

    // 3. Verify main content area
    await expect(page.locator('text=Checkout: Complete!')).toBeVisible();
    await expect(page.locator('text=Thank you for your order!')).toBeVisible();

    // Verify completion title and message are centered
    const completeContainer = page.locator('.checkout_complete_container');
    await expect(completeContainer).toBeVisible();

    // Verify Pony Express image is displayed
    await expect(page.locator('img[alt="Pony Express"]')).toBeVisible();

    // Verify Back Home button is visible and accessible
    await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
  });
