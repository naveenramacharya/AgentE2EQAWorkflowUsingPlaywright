// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test('TC6.4 - Order Overview Cancel Navigation', async ({ page }) => {
    // 1. Complete checkout form and reach order overview
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

    // 2. Click Cancel button
    await page.locator('[data-test="cancel"]').click();

    // Verify user is returned to inventory page (application behavior)
    await expect(page).toHaveURL(/.*inventory\.html/);
  });
