// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test('TC5.6 - Cancel Button at Checkout', async ({ page }) => {
    // 1. Navigate to checkout form
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();

    // Verify checkout step 1 is displayed
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);

    // 2. Fill form partially: First Name='John', leave other fields empty
    await page.locator('[data-test="firstName"]').fill('John');

    // 3. Click Cancel button
    await page.locator('[data-test="cancel"]').click();

    // Verify user is redirected back to cart page
    await expect(page).toHaveURL(/.*cart\.html/);

    // Verify checkout is cancelled and cart still contains the items
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(1);
  });
