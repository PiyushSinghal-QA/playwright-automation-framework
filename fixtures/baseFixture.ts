import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { testUsers } from '../config/testData';

/**
 * Custom fixtures extend Playwright's test runner to:
 * - Auto-instantiate page objects (no boilerplate in tests)
 * - Provide a pre-authenticated session for tests that don't test login
 *
 * Usage in tests:
 *   test('my test', async ({ loginPage, inventoryPage }) => { ... });
 */

type TestFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  authenticatedPage: InventoryPage;
};

export const test = base.extend<TestFixtures>({
  // Provide fresh page object instances to every test
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  // Pre-authenticated fixture - logs in before test starts
  // Useful for tests that don't care about the login flow itself
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.navigate();
    await loginPage.login(testUsers.standard.username, testUsers.standard.password);
    await inventoryPage.assertPageLoaded();

    await use(inventoryPage);
  },
});

export { expect } from '@playwright/test';
