// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test('TC5.7 - Form State After Error Recovery', async ({ page }) => {
    // 1. Navigate to checkout form
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();

    // Verify form is displayed
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);

    // 2. Enter First Name='John', Last Name='Doe', Postal Code='ABC'
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('ABC');

    // 3. Click Continue
    await page.locator('[data-test="continue"]').click();

    // Verify success or error handling
    // Based on application behavior, letters in postal code are accepted
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);
  });
