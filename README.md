# Playwright Automation Framework

[![Playwright Tests](https://github.com/YOUR_USERNAME/playwright-automation-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/YOUR_USERNAME/playwright-automation-framework/actions/workflows/playwright.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.48-green.svg)](https://playwright.dev/)

A production-ready end-to-end test automation framework built with **Playwright** and **TypeScript**, following the **Page Object Model** pattern with reusable fixtures, custom utilities, and full CI/CD integration.

This framework is designed as a reference implementation demonstrating how to build scalable, maintainable test automation for modern web applications.

---

## Key Features

- **TypeScript-first** — Full type safety, IntelliSense support, easier refactoring
- **Page Object Model** — Clean separation between test logic and page interactions
- **Custom Fixtures** — Pre-authenticated sessions, auto-instantiated page objects
- **Cross-browser testing** — Chromium, Firefox, WebKit, plus mobile viewports
- **Parallel execution** — Tests run in parallel by default for faster feedback
- **Rich reporting** — HTML, JSON, JUnit (for CI integration), and list reporters
- **Test tagging** — `@smoke`, `@regression`, `@negative` for selective runs
- **CI/CD ready** — GitHub Actions workflow with matrix builds across browsers
- **Environment configuration** — `.env` support for multiple test environments
- **Screenshots & videos on failure** — Automatic debugging artifacts
- **Test traces** — Step-by-step playback for failed tests

---

## Project Structure

```
playwright-automation-framework/
├── .github/
│   └── workflows/
│       └── playwright.yml          # CI/CD pipeline
├── config/
│   └── testData.ts                 # Centralized test data
├── fixtures/
│   └── baseFixture.ts              # Custom test fixtures
├── pages/
│   ├── BasePage.ts                 # Abstract base page class
│   ├── LoginPage.ts                # Login page object
│   ├── InventoryPage.ts            # Products page object
│   ├── CartPage.ts                 # Cart page object
│   └── CheckoutPage.ts             # Checkout flow page object
├── tests/
│   ├── login.spec.ts               # Login functionality tests
│   ├── inventory.spec.ts           # Product listing tests
│   └── purchase-flow.spec.ts       # End-to-end purchase tests
├── utils/
│   └── logger.ts                   # Logging utility
├── .env.example                    # Environment variable template
├── playwright.config.ts            # Playwright configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Dependencies and scripts
```

---

## Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/playwright-automation-framework.git
cd playwright-automation-framework

# Install dependencies
npm install

# Install Playwright browsers
npm run install:browsers

# Copy environment variables template
cp .env.example .env
```

### Running tests

```bash
# Run all tests in all browsers
npm test

# Run in a specific browser
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Run in headed mode (see the browser)
npm run test:headed

# Run with UI mode (great for debugging)
npm run test:ui

# Run only smoke tests (critical path)
npm run test:smoke

# Run regression suite
npm run test:regression

# Debug a single test
npm run test:debug

# View the HTML report after a run
npm run report
```

---

## Architecture Highlights

### Page Object Model

Each page in the application is represented by a class that encapsulates locators and actions. Test files stay clean and readable:

```typescript
// Clean test code - no raw selectors or page.click() calls
test('should login successfully', async ({ loginPage, inventoryPage }) => {
  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.assertPageLoaded();
});
```

### Custom Fixtures

Instead of manually instantiating page objects in every test, fixtures handle it automatically. The `authenticatedPage` fixture even logs in before the test starts — perfect for tests that don't need to validate the login flow:

```typescript
test('should add item to cart', async ({ authenticatedPage, cartPage }) => {
  // User is already logged in - go straight to the test
  await authenticatedPage.addProductToCart('Sauce Labs Backpack');
  await authenticatedPage.openCart();
  await cartPage.assertProductInCart('Sauce Labs Backpack');
});
```

### Test Tagging

Tests are tagged for selective execution:
- `@smoke` — Fast critical-path tests, run on every commit
- `@regression` — Full suite, run before releases
- `@negative` — Error handling and edge cases

```bash
# Run only smoke tests in PR pipeline (2-3 minutes)
npx playwright test --grep @smoke
```

### CI/CD Integration

The included GitHub Actions workflow:
- Runs tests in parallel across Chromium, Firefox, and WebKit
- Runs smoke tests on every PR for fast feedback
- Runs the full suite on main branch pushes
- Schedules nightly runs at 2 AM UTC
- Uploads HTML reports and test artifacts for debugging

---

## Test Coverage

The framework currently demonstrates coverage across:

| Area | Tests | Types |
|------|-------|-------|
| Login | 6 | Positive, negative, edge cases |
| Inventory | 5 | UI validation, sorting, cart badge |
| Purchase Flow | 3 | End-to-end, multi-item, cart manipulation |

**Total:** 14 tests × 3 browsers = 42 test executions per CI run

---

## Design Decisions

### Why TypeScript over JavaScript?
Type safety catches bugs before runtime. Refactoring is safer. IntelliSense makes writing tests faster. For any framework meant to scale with a team, TypeScript is the obvious choice.

### Why Page Object Model?
When the UI changes (and it will), you update one file — the page object — instead of hunting through hundreds of tests. This is non-negotiable for maintainable automation.

### Why custom fixtures over `beforeEach` hooks?
Fixtures are more composable, cleaner to read, and Playwright's type system ensures you can't forget to set them up. They also support dependency chaining (e.g., `authenticatedPage` depends on `page`).

### Why three reporters?
- **HTML** — For developers debugging failures locally
- **JUnit** — For Jenkins, GitHub Actions, and other CI tools
- **JSON** — For custom dashboards and metrics pipelines

---

## What This Framework Demonstrates

This project showcases practical skills that clients look for in a senior SDET:

- Building a framework from scratch that a team can adopt
- Writing maintainable, type-safe test code
- Handling test data, authentication, and environment configuration correctly
- Setting up CI/CD for test automation (not just running locally)
- Designing for scalability — adding new tests doesn't require framework changes
- Balancing test speed with coverage through tagging and selective execution

---

## About the Author

**Piyush Singhal** — SDET with 5+ years in test automation across SaaS, ad-tech, and enterprise networking products.

- [LinkedIn](https://www.linkedin.com/in/nitb-piyush-singhal/)
- [Upwork Profile](https://www.upwork.com/freelancers/~01d6783f97ce092c7f)
- ISTQB Certified (Foundation Level + Generative AI Testing)

---

## License

MIT — Feel free to use this as a reference for your own projects.
