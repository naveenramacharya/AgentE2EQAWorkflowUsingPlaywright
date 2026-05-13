# SCRUM-101 E-commerce Checkout Test Plan

## Application Overview

This comprehensive test plan covers the complete e-commerce checkout process for the Sauce Labs Demo application (https://www.saucedemo.com). The plan tests all critical acceptance criteria including cart review, checkout information entry, order overview, order completion, and error handling. Tests are designed to verify the happy path checkout flow, mandatory field validation, invalid data handling, edge cases, navigation flows, and proper UI element validation throughout the entire checkout process.

## Test Scenarios

### 1. TC1 - Cart Review

**Seed:** `tests/seed.spec.ts`

#### 1.1. TC1.1 - View Cart with Single Item

**File:** `tests/saucedemo-checkout/tc1-1-view-cart-single-item.spec.ts`

**Steps:**
  1. Log in with standard_user credentials
    - expect: User is logged in and on the inventory page
  2. Add the 'Sauce Labs Backpack' item to the cart
    - expect: Item is added successfully
    - expect: Cart badge shows '1'
  3. Navigate to the cart page
    - expect: Cart page is displayed with correct URL (cart.html)
    - expect: Cart displays 1 item with correct details
    - expect: Item shows: name, description, price ($29.99), quantity (1)
    - expect: 'Continue Shopping' button is visible
    - expect: 'Checkout' button is visible
  4. Verify cart item details
    - expect: Item name matches: 'Sauce Labs Backpack'
    - expect: Item description is displayed correctly
    - expect: Item price is displayed as $29.99
    - expect: Quantity shows as 1
    - expect: Remove button is available

#### 1.2. TC1.2 - View Cart with Multiple Items

**File:** `tests/saucedemo-checkout/tc1-2-view-cart-multiple-items.spec.ts`

**Steps:**
  1. Log in with standard_user credentials
    - expect: User is logged in and on the inventory page
  2. Add three different items to cart: Backpack ($29.99), Bike Light ($9.99), Bolt T-Shirt ($15.99)
    - expect: All items are added successfully
    - expect: Cart badge shows '3'
  3. Navigate to the cart page
    - expect: Cart page displays all 3 items
    - expect: Cart shows correct item count in header
    - expect: QTY column header is visible
    - expect: Description column header is visible
  4. Verify each item in cart
    - expect: Backpack shows quantity 1, price $29.99
    - expect: Bike Light shows quantity 1, price $9.99
    - expect: Bolt T-Shirt shows quantity 1, price $15.99
    - expect: Each item has a Remove button
    - expect: Each item name is clickable to view details

#### 1.3. TC1.3 - View Empty Cart

**File:** `tests/saucedemo-checkout/tc1-3-view-empty-cart.spec.ts`

**Steps:**
  1. Log in with standard_user credentials
    - expect: User is logged in and on the inventory page
  2. Navigate directly to the cart page without adding items
    - expect: Cart page is displayed
    - expect: 'Your Cart' heading is visible
    - expect: No items are displayed in the cart
    - expect: 'Continue Shopping' button is visible
    - expect: 'Checkout' button is present
  3. Click Continue Shopping to return to inventory
    - expect: User is redirected to the inventory page
    - expect: No items are selected/highlighted

#### 1.4. TC1.4 - Remove Item from Cart

**File:** `tests/saucedemo-checkout/tc1-4-remove-item-from-cart.spec.ts`

**Steps:**
  1. Log in with standard_user credentials
    - expect: User is logged in
  2. Add 'Sauce Labs Backpack' and 'Sauce Labs Bike Light' to cart
    - expect: Both items are added
    - expect: Cart badge shows '2'
  3. Navigate to cart page
    - expect: Both items are displayed
  4. Click Remove button on 'Sauce Labs Backpack'
    - expect: Backpack is removed from cart
    - expect: Only Bike Light remains
    - expect: Cart badge updates to '1'
  5. Verify remaining item in cart
    - expect: Only Bike Light is displayed with correct details
    - expect: Backpack is no longer visible

#### 1.5. TC1.5 - View Cart Totals

**File:** `tests/saucedemo-checkout/tc1-5-view-cart-totals.spec.ts`

**Steps:**
  1. Log in with standard_user credentials
    - expect: User is logged in
  2. Add Backpack ($29.99) and Bike Light ($9.99) to cart
    - expect: Items are added successfully
  3. Navigate to cart page
    - expect: Cart page is displayed with all items
  4. Verify cart displays proper sections
    - expect: QTY column is visible
    - expect: Description column is visible
    - expect: Item prices are displayed correctly
  5. Verify cart totals are accessible
    - expect: Totals will be shown in the checkout overview page
    - expect: Subtotal can be calculated: $29.99 + $9.99 = $39.98

### 2. TC2 - Checkout Information Entry

**Seed:** `tests/seed.spec.ts`

#### 2.1. TC2.1 - Complete Checkout Form with Valid Data

**File:** `tests/saucedemo-checkout/tc2-1-checkout-valid-data.spec.ts`

**Steps:**
  1. Log in with standard_user credentials
    - expect: User is logged in
  2. Add 'Sauce Labs Backpack' and 'Sauce Labs Bolt T-Shirt' to cart
    - expect: Items added to cart
    - expect: Cart badge shows '2'
  3. Navigate to cart and click Checkout
    - expect: Checkout step 1 page is displayed
    - expect: URL is checkout-step-one.html
    - expect: Title shows 'Checkout: Your Information'
  4. Verify form fields are visible and labeled
    - expect: 'First Name' textbox is visible
    - expect: 'Last Name' textbox is visible
    - expect: 'Zip/Postal Code' textbox is visible
    - expect: 'Cancel' button is visible
    - expect: 'Continue' button is visible
  5. Fill in form with valid data: First Name='John', Last Name='Doe', Postal Code='12345'
    - expect: All fields are populated correctly
    - expect: No validation errors appear
  6. Click Continue button
    - expect: Form is submitted successfully
    - expect: User is redirected to checkout-step-two.html
    - expect: Order overview page is displayed

#### 2.2. TC2.2 - Empty First Name Validation

**File:** `tests/saucedemo-checkout/tc2-2-empty-first-name.spec.ts`

**Steps:**
  1. Log in and add items to cart
    - expect: Items are in cart
  2. Navigate to checkout page
    - expect: Checkout step 1 form is displayed
  3. Leave First Name field empty, fill Last Name='Doe', Postal Code='12345'
    - expect: First Name field is empty
  4. Click Continue button
    - expect: Form submission is prevented
    - expect: Error message 'Error: First Name is required' is displayed
    - expect: Error indicator appears next to First Name field
  5. Verify user stays on checkout page
    - expect: URL remains checkout-step-one.html
    - expect: Form data is retained (Last Name and Postal Code still populated)

#### 2.3. TC2.3 - Empty Last Name Validation

**File:** `tests/saucedemo-checkout/tc2-3-empty-last-name.spec.ts`

**Steps:**
  1. Log in and add items to cart
    - expect: Items are in cart
  2. Navigate to checkout page
    - expect: Checkout step 1 form is displayed
  3. Fill First Name='John', leave Last Name empty, fill Postal Code='12345'
    - expect: Last Name field is empty
  4. Click Continue button
    - expect: Form submission is prevented
    - expect: Error message 'Error: Last Name is required' is displayed
    - expect: Error indicator appears next to Last Name field
  5. Verify form state
    - expect: First Name field still contains 'John'
    - expect: Postal Code field still contains '12345'

#### 2.4. TC2.4 - Empty Postal Code Validation

**File:** `tests/saucedemo-checkout/tc2-4-empty-postal-code.spec.ts`

**Steps:**
  1. Log in and add items to cart
    - expect: Items are in cart
  2. Navigate to checkout page
    - expect: Checkout step 1 form is displayed
  3. Fill First Name='John', Last Name='Doe', leave Postal Code empty
    - expect: Postal Code field is empty
  4. Click Continue button
    - expect: Form submission is prevented
    - expect: Error message 'Error: Postal Code is required' is displayed
    - expect: Error indicator appears next to Postal Code field
  5. Verify form retains data
    - expect: First Name and Last Name are still populated
    - expect: User remains on checkout form

#### 2.5. TC2.5 - All Fields Empty Validation

**File:** `tests/saucedemo-checkout/tc2-5-all-fields-empty.spec.ts`

**Steps:**
  1. Log in and add items to cart
    - expect: Items are in cart
  2. Navigate to checkout page
    - expect: Checkout step 1 form is displayed with all fields empty
  3. Click Continue button without filling any fields
    - expect: Form submission is prevented
    - expect: Error message appears
    - expect: First error should be 'Error: First Name is required'
  4. Verify all error indicators are present
    - expect: Error icons appear next to First Name field
    - expect: User remains on checkout form

#### 2.6. TC2.6 - First Name with Special Characters

**File:** `tests/saucedemo-checkout/tc2-6-first-name-special-chars.spec.ts`

**Steps:**
  1. Log in and add items to cart
    - expect: Items are in cart
  2. Navigate to checkout page
    - expect: Checkout step 1 form is displayed
  3. Enter First Name with special characters: 'John@#$%', Last Name='Doe', Postal Code='12345'
    - expect: Special characters are accepted in First Name field
  4. Click Continue button
    - expect: Form is submitted successfully
    - expect: User proceeds to checkout step 2

#### 2.7. TC2.7 - Very Long First Name

**File:** `tests/saucedemo-checkout/tc2-7-long-first-name.spec.ts`

**Steps:**
  1. Log in and add items to cart
    - expect: Items are in cart
  2. Navigate to checkout page
    - expect: Checkout step 1 form is displayed
  3. Enter very long First Name (100+ characters): 'VeryLongFirstNameWithManyCharactersToTestBoundaryConditionsAndFieldValidationForCheckoutForm', Last Name='Doe', Postal Code='12345'
    - expect: Long name is accepted in field
  4. Click Continue button
    - expect: Form is submitted successfully or displays appropriate validation message

#### 2.8. TC2.8 - Invalid Postal Code - Letters Only

**File:** `tests/saucedemo-checkout/tc2-8-invalid-postal-letters.spec.ts`

**Steps:**
  1. Log in and add items to cart
    - expect: Items are in cart
  2. Navigate to checkout page
    - expect: Checkout step 1 form is displayed
  3. Enter First Name='John', Last Name='Doe', Postal Code='ABCDE'
    - expect: Letters are accepted in Postal Code field
  4. Click Continue button
    - expect: Form submission succeeds or validation error is displayed

#### 2.9. TC2.9 - Single Character Input in Each Field

**File:** `tests/saucedemo-checkout/tc2-9-single-char-inputs.spec.ts`

**Steps:**
  1. Log in and add items to cart
    - expect: Items are in cart
  2. Navigate to checkout page
    - expect: Checkout step 1 form is displayed
  3. Enter single character in each field: First Name='A', Last Name='B', Postal Code='1'
    - expect: Single characters are accepted in all fields
  4. Click Continue button
    - expect: Form is submitted successfully
    - expect: User proceeds to checkout overview

#### 2.10. TC2.10 - Whitespace Only Input

**File:** `tests/saucedemo-checkout/tc2-10-whitespace-input.spec.ts`

**Steps:**
  1. Log in and add items to cart
    - expect: Items are in cart
  2. Navigate to checkout page
    - expect: Checkout step 1 form is displayed
  3. Enter only whitespace in First Name field: '     ', Last Name='Doe', Postal Code='12345'
    - expect: Whitespace is entered in field
  4. Click Continue button
    - expect: Form submission behavior is consistent with requirements

### 3. TC3 - Order Overview

**Seed:** `tests/seed.spec.ts`

#### 3.1. TC3.1 - View Order Overview with Multiple Items

**File:** `tests/saucedemo-checkout/tc3-1-order-overview-display.spec.ts`

**Steps:**
  1. Log in with standard_user credentials
    - expect: User is logged in
  2. Add three items to cart: Backpack ($29.99), Bike Light ($9.99), Bolt T-Shirt ($15.99)
    - expect: Cart contains 3 items
  3. Navigate through checkout: cart → checkout form → click Continue with valid data
    - expect: User is on checkout-step-two.html page
  4. Verify page title and heading
    - expect: Page title is 'Swag Labs'
    - expect: Page heading shows 'Checkout: Overview'
  5. Verify order items section
    - expect: QTY column header is visible
    - expect: Description column header is visible
    - expect: All 3 items are displayed with correct names and prices
    - expect: Each item shows quantity of 1

#### 3.2. TC3.2 - View Order Summary Totals

**File:** `tests/saucedemo-checkout/tc3-2-order-summary-totals.spec.ts`

**Steps:**
  1. Complete checkout form with valid data and reach order overview page
    - expect: Order overview page is displayed
  2. Verify price total section
    - expect: 'Price Total' label is visible
    - expect: Item total is displayed correctly: e.g., '$45.98' for Backpack + T-Shirt
  3. Verify tax calculation
    - expect: 'Tax:' label is visible
    - expect: Tax amount is displayed
  4. Verify final total
    - expect: 'Total:' label is visible
    - expect: Final total is displayed (Item total + Tax)

#### 3.3. TC3.3 - View Payment Information

**File:** `tests/saucedemo-checkout/tc3-3-payment-information.spec.ts`

**Steps:**
  1. Complete checkout form and reach order overview page
    - expect: Order overview page is displayed
  2. Verify payment information section
    - expect: 'Payment Information:' label is visible
    - expect: Payment method is displayed: 'SauceCard #31337'
  3. Verify payment info is not editable
    - expect: Payment information is display-only (no edit option)

#### 3.4. TC3.4 - View Shipping Information

**File:** `tests/saucedemo-checkout/tc3-4-shipping-information.spec.ts`

**Steps:**
  1. Complete checkout form and reach order overview page
    - expect: Order overview page is displayed
  2. Verify shipping information section
    - expect: 'Shipping Information:' label is visible
    - expect: Shipping method is displayed: 'Free Pony Express Delivery!'
  3. Verify shipping info matches form entries
    - expect: Shipping information is consistent with the customer data entered

#### 3.5. TC3.5 - Navigation from Order Overview

**File:** `tests/saucedemo-checkout/tc3-5-navigation-from-overview.spec.ts`

**Steps:**
  1. Complete checkout form and reach order overview page
    - expect: Order overview page is displayed
  2. Verify Cancel button is visible
    - expect: 'Cancel' button with 'Go back' icon is displayed
  3. Click Cancel button
    - expect: User is navigated back to checkout-step-one.html
    - expect: Previously entered data should be available (based on implementation)
  4. Navigate forward again to order overview
    - expect: Order overview page displays again
    - expect: Totals and information are consistent

#### 3.6. TC3.6 - Item Links in Order Overview

**File:** `tests/saucedemo-checkout/tc3-6-item-links-overview.spec.ts`

**Steps:**
  1. Complete checkout form and reach order overview page with items
    - expect: Order overview page is displayed with items
  2. Verify item names are displayed as links
    - expect: Item names appear clickable
  3. Click on an item name link
    - expect: Navigation behavior is defined (either opens item details or remains on page)

### 4. TC4 - Order Completion

**Seed:** `tests/seed.spec.ts`

#### 4.1. TC4.1 - Successful Order Completion

**File:** `tests/saucedemo-checkout/tc4-1-successful-completion.spec.ts`

**Steps:**
  1. Log in with standard_user credentials
    - expect: User is logged in
  2. Add items to cart
    - expect: Items are in cart
  3. Complete checkout form with valid data: First Name='John', Last Name='Doe', Postal Code='12345'
    - expect: Form is submitted
  4. Reach order overview page
    - expect: Order overview is displayed
  5. Click Finish button
    - expect: Order is processed successfully
    - expect: User is redirected to checkout-complete.html
  6. Verify completion page elements
    - expect: Page heading shows 'Checkout: Complete!'
    - expect: Success message 'Thank you for your order!' is displayed

#### 4.2. TC4.2 - Order Completion Message

**File:** `tests/saucedemo-checkout/tc4-2-completion-message.spec.ts`

**Steps:**
  1. Complete the entire checkout process successfully
    - expect: User reaches completion page
  2. Verify success message content
    - expect: Heading 'Thank you for your order!' is displayed
    - expect: Confirmation message includes order dispatch information: 'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
    - expect: Pony Express image is displayed
  3. Verify no error messages are shown
    - expect: No error messages appear on completion page

#### 4.3. TC4.3 - Back Home Button

**File:** `tests/saucedemo-checkout/tc4-3-back-home-button.spec.ts`

**Steps:**
  1. Complete the entire checkout process
    - expect: User is on checkout-complete.html page
  2. Verify Back Home button is visible
    - expect: 'Back Home' button with 'Go back' icon is displayed
  3. Click Back Home button
    - expect: User is redirected to inventory.html
    - expect: User returns to the products listing page
  4. Verify inventory page is loaded properly
    - expect: Products are displayed
    - expect: All items show 'Add to cart' buttons

#### 4.4. TC4.4 - Cart Cleared After Successful Checkout

**File:** `tests/saucedemo-checkout/tc4-4-cart-cleared.spec.ts`

**Steps:**
  1. Complete the entire checkout process successfully
    - expect: Order is completed and user sees success message
  2. Click Back Home to return to inventory
    - expect: User is on inventory.html page
  3. Navigate to cart page
    - expect: Cart page is displayed
  4. Verify cart is empty
    - expect: No items are displayed in cart
    - expect: Cart badge is not visible (or shows 0)
    - expect: Only 'Continue Shopping' and 'Checkout' buttons are visible
  5. Return to inventory and verify all items show 'Add to cart' buttons
    - expect: All previously purchased items now show 'Add to cart' (not 'Remove')
    - expect: Cart is completely reset

#### 4.5. TC4.5 - Order Completion Page Layout

**File:** `tests/saucedemo-checkout/tc4-5-completion-layout.spec.ts`

**Steps:**
  1. Complete the entire checkout process
    - expect: User is on completion page
  2. Verify page header and branding
    - expect: Swag Labs logo is visible in header
  3. Verify main content area
    - expect: Completion title and message are centered
    - expect: Pony Express image is displayed
    - expect: Back Home button is visible and accessible

### 5. TC5 - Error Handling and Validation

**Seed:** `tests/seed.spec.ts`

#### 5.1. TC5.1 - Required Field Error Display

**File:** `tests/saucedemo-checkout/tc5-1-required-field-errors.spec.ts`

**Steps:**
  1. Log in and add items to cart
    - expect: Items are in cart
  2. Navigate to checkout form
    - expect: Checkout step 1 is displayed
  3. Attempt to submit empty form
    - expect: Error message is displayed for first missing field
  4. Verify error message format
    - expect: Error uses format 'Error: [Field Name] is required'
    - expect: Error message is clearly visible and highlighted
  5. Close error message
    - expect: Error message disappears
    - expect: Form remains on checkout page

#### 5.2. TC5.2 - Error Message Closure

**File:** `tests/saucedemo-checkout/tc5-2-error-closure.spec.ts`

**Steps:**
  1. Trigger a validation error by submitting empty form
    - expect: Error message appears
  2. Verify error close button is visible
    - expect: Error message has a close button (X icon)
  3. Click error close button
    - expect: Error message disappears
    - expect: Form is still displayed with empty fields
  4. Fill in form and submit again
    - expect: If all fields are valid, form submits successfully

#### 5.3. TC5.3 - Validation Error Persistence

**File:** `tests/saucedemo-checkout/tc5-3-validation-persistence.spec.ts`

**Steps:**
  1. Navigate to checkout form
    - expect: Checkout step 1 is displayed
  2. Fill First Name='John' and Last Name='Doe', leave Postal Code empty
    - expect: First Name and Last Name are populated
  3. Click Continue
    - expect: Error message 'Postal Code is required' appears
  4. Close error message
    - expect: Error is dismissed
  5. Verify form data is retained
    - expect: First Name still shows 'John'
    - expect: Last Name still shows 'Doe'
    - expect: Postal Code is still empty

#### 5.4. TC5.4 - Multiple Field Validation

**File:** `tests/saucedemo-checkout/tc5-4-multiple-field-validation.spec.ts`

**Steps:**
  1. Navigate to checkout form
    - expect: Form is displayed
  2. Fill only First Name='John', leave Last Name and Postal Code empty
    - expect: Last Name and Postal Code are empty
  3. Click Continue
    - expect: First validation error appears (Last Name is required)
  4. Close error and fill Last Name='Doe'
    - expect: Last Name is populated
  5. Click Continue again
    - expect: Next validation error appears (Postal Code is required)
  6. Fill Postal Code and submit
    - expect: Form is accepted and user proceeds to overview

#### 5.5. TC5.5 - Form Validation with Numeric Postal Code

**File:** `tests/saucedemo-checkout/tc5-5-numeric-postal.spec.ts`

**Steps:**
  1. Navigate to checkout form
    - expect: Form is displayed
  2. Fill all fields with numeric values: First Name='12345', Last Name='67890', Postal Code='11111'
    - expect: Numeric values are accepted in all fields
  3. Click Continue
    - expect: Form is submitted successfully or appropriate validation message appears

#### 5.6. TC5.6 - Cancel Button at Checkout

**File:** `tests/saucedemo-checkout/tc5-6-cancel-checkout.spec.ts`

**Steps:**
  1. Navigate to checkout form
    - expect: Checkout step 1 is displayed
  2. Fill form with partial data: First Name='John', leave other fields empty
    - expect: First Name is populated
  3. Click Cancel button
    - expect: User is redirected back to cart page
    - expect: Checkout is cancelled

#### 5.7. TC5.7 - Form State After Error Recovery

**File:** `tests/saucedemo-checkout/tc5-7-error-recovery.spec.ts`

**Steps:**
  1. Navigate to checkout form
    - expect: Form is displayed
  2. Enter First Name='John', Last Name='Doe', Postal Code='ABC'
    - expect: All fields are populated
  3. Click Continue
    - expect: Form is submitted
  4. Verify success or error handling
    - expect: If successful, user proceeds to next step
    - expect: If error, appropriate message is shown

### 6. TC6 - Navigation and Flow

**Seed:** `tests/seed.spec.ts`

#### 6.1. TC6.1 - Complete Checkout Flow - Happy Path

**File:** `tests/saucedemo-checkout/tc6-1-happy-path-flow.spec.ts`

**Steps:**
  1. Log in with standard_user / secret_sauce
    - expect: Login is successful
    - expect: User is on inventory page
  2. Add items to cart: Backpack and Bolt T-Shirt
    - expect: Items are added
    - expect: Cart badge shows '2'
  3. Navigate to cart and click Checkout
    - expect: User is on checkout-step-one.html
  4. Fill checkout form: First Name='John', Last Name='Doe', Postal Code='12345'
    - expect: All fields are filled correctly
  5. Click Continue
    - expect: User is on checkout-step-two.html (order overview)
  6. Verify order details
    - expect: Both items are displayed
    - expect: Totals are shown correctly
  7. Click Finish
    - expect: User is on checkout-complete.html
  8. Verify success message
    - expect: 'Thank you for your order!' message is displayed
  9. Click Back Home
    - expect: User is back on inventory.html
    - expect: Cart is empty

#### 6.2. TC6.2 - Continue Shopping from Cart

**File:** `tests/saucedemo-checkout/tc6-2-continue-shopping.spec.ts`

**Steps:**
  1. Log in and add items to cart
    - expect: Items are in cart
  2. Navigate to cart page
    - expect: Cart is displayed
  3. Click Continue Shopping button
    - expect: User is redirected to inventory page
    - expect: All products are displayed

#### 6.3. TC6.3 - Checkout Form Cancel Navigation

**File:** `tests/saucedemo-checkout/tc6-3-checkout-cancel.spec.ts`

**Steps:**
  1. Log in and add items to cart
    - expect: Items are in cart
  2. Navigate to checkout page
    - expect: Checkout form is displayed
  3. Fill form partially or completely
    - expect: Form has data
  4. Click Cancel button
    - expect: User is returned to cart page
    - expect: Cart still contains the same items

#### 6.4. TC6.4 - Order Overview Cancel Navigation

**File:** `tests/saucedemo-checkout/tc6-4-overview-cancel.spec.ts`

**Steps:**
  1. Complete checkout form and reach order overview
    - expect: Order overview page is displayed
  2. Click Cancel button
    - expect: User is returned to checkout form page
  3. Verify form data retention
    - expect: Previously entered data should be available or form is cleared (based on implementation)

#### 6.5. TC6.5 - Direct URL Navigation to Checkout

**File:** `tests/saucedemo-checkout/tc6-5-direct-url-navigation.spec.ts`

**Steps:**
  1. Log in and add items to cart
    - expect: Items are in cart
  2. Navigate directly to checkout-step-one.html via URL
    - expect: Checkout form page loads
  3. Verify form is accessible
    - expect: All form fields are displayed and functional
  4. Fill and submit form
    - expect: Checkout proceeds normally to step 2

#### 6.6. TC6.6 - Back Button Usage in Checkout

**File:** `tests/saucedemo-checkout/tc6-6-back-button.spec.ts`

**Steps:**
  1. Complete checkout form and reach order overview
    - expect: Order overview is displayed
  2. Use browser back button
    - expect: User is navigated back to checkout form page
    - expect: Form is in expected state (may be populated or cleared depending on implementation)
  3. Verify checkout can proceed forward again
    - expect: User can re-submit form and continue to order overview
