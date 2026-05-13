# Agentic AI QA E2E Workflow

This repository contains a complete end-to-end QA workflow for the SauceDemo checkout experience.

## Overview

The project includes:

- User story definition: `user-stories/SCRUM-101-ecommerce-checkout.md`
- Comprehensive test plan: `specs/saucedemo-checkout-test-plan.md`
- Automated Playwright test scripts: `tests/saucedemo-checkout/`
- Seed setup script: `tests/seed.spec.ts`
- Test execution report artifacts: `playwright-report/` and `test-results/`
- Workflow prompt file: `QAEnd2EndPromptFile.md`

## Repository Purpose

This repository demonstrates a complete QA workflow using Playwright and natural-language guided testing, including:

- Requirements review
- Test plan creation
- Exploratory testing
- Automated script generation
- Test execution and healing
- Reporting and Git versioning

## Technologies

- Playwright Test (`@playwright/test`)
- Node.js
- Git

## How to Run

1. Install dependencies:

```bash
npm install
```

2. Run the full checkout test suite:

```bash
npx playwright test tests/saucedemo-checkout --reporter=html
```

3. Open the generated HTML report in `playwright-report/index.html`.

## SauceDemo Test Credentials

- Username: `standard_user`
- Password: `secret_sauce`

## Key Test Coverage

The automated suite covers:

- Cart review and item management
- Checkout information validation
- Order overview and totals
- Successful checkout completion
- Error handling and validation feedback
- Navigation and cancel flows

## Notes

- The root workflow file `QAEnd2EndPromptFile.md` defines the 7-step process used to build and validate this repository.
- The test artifacts have been committed and pushed to the configured GitHub repository.
