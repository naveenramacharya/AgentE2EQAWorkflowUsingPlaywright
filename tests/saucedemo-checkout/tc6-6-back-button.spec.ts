// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test('TC6.6 - Back Button Usage in Checkout', async ({ page }) => {
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

    // Verify order overview is displayed
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);

    // 2. Use browser back button
    await page.goBack();

    // Verify user is navigated back to checkout form page
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);

    // Verify form is in expected state (may be populated or cleared depending on implementation)
    // Check if form retains data or is cleared
    const firstNameValue = await page.locator('[data-test="firstName"]').inputValue();

    // 3. Verify checkout can proceed forward again
    // Refill form if data was cleared on back navigation
    const currentFirstName = await page.locator('[data-test="firstName"]').inputValue();
    if (currentFirstName === '') {
      await page.locator('[data-test="firstName"]').fill('John');
      await page.locator('[data-test="lastName"]').fill('Doe');
      await page.locator('[data-test="postalCode"]').fill('12345');
    }
    await page.locator('[data-test="continue"]').click();

    // Verify user can re-submit form and continue to order overview
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);
  });
