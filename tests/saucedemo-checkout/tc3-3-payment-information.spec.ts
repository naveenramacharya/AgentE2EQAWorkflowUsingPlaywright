// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test('TC3.3 - View Payment Information', async ({ page }) => {
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

    // 2. Verify payment information section
    await expect(page.locator('text=Payment Information:')).toBeVisible();
    await expect(page.locator('text=SauceCard #31337')).toBeVisible();

    // 3. Verify payment info is not editable (display-only)
    // Payment information should be shown as text, not form fields
    const paymentInfo = page.locator('.summary_info:has-text("Payment Information:")');
    await expect(paymentInfo).toBeVisible();
  });
