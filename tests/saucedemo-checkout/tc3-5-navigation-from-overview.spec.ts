// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test('TC3.5 - Navigation from Order Overview', async ({ page }) => {
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

    // 2. Verify Cancel button is visible
    await expect(page.locator('[data-test="cancel"]')).toBeVisible();

    // 3. Click Cancel button
    await page.locator('[data-test="cancel"]').click();

    // Verify user is redirected back to inventory page (application behavior)
    await expect(page).toHaveURL(/.*inventory\.html/);
  });
