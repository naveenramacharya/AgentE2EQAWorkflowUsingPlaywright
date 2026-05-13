// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test('TC3.6 - Item Links in Order Overview', async ({ page }) => {
    // 1. Complete checkout form and reach order overview page with items
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

    // Verify order overview page is displayed with items
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);

    // 2. Verify item names are displayed as links
    const itemLinks = page.locator('[data-test="inventory-item-name"]');
    await expect(itemLinks.first()).toBeVisible();

    // 3. Click on an item name link
    await itemLinks.first().click();

    // Verify navigation behavior - should either open item details or remain on page
    // Based on application behavior, clicking item names in overview navigates to item details
    await expect(page).toHaveURL(/.*inventory-item\.html/);
  });
