// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test('TC2.1 - Complete Checkout Form with Valid Data', async ({ page }) => {
    // 1. Log in with standard_user credentials
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Verify login successful
    await expect(page).toHaveURL(/.*inventory\.html/);

    // 2. Add items to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

    // Verify items added to cart
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('2');

    // 3. Navigate to cart and click Checkout
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();

    // Verify checkout step 1 page is displayed
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);
    await expect(page.locator('text=Checkout: Your Information')).toBeVisible();

    // 4. Verify form fields are visible and labeled
    await expect(page.locator('[data-test="firstName"]')).toBeVisible();
    await expect(page.locator('[data-test="lastName"]')).toBeVisible();
    await expect(page.locator('[data-test="postalCode"]')).toBeVisible();
    await expect(page.locator('[data-test="cancel"]')).toBeVisible();
    await expect(page.locator('[data-test="continue"]')).toBeVisible();

    // 5. Fill in form with valid data
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');

    // Verify form fields are populated correctly
    await expect(page.locator('[data-test="firstName"]')).toHaveValue('John');
    await expect(page.locator('[data-test="lastName"]')).toHaveValue('Doe');
    await expect(page.locator('[data-test="postalCode"]')).toHaveValue('12345');

    // 6. Click Continue button
    await page.locator('[data-test="continue"]').click();

    // Verify form is submitted successfully and user redirected to checkout-step-two.html
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);
    await expect(page.locator('text=Checkout: Overview')).toBeVisible();
  });
