import { test, expect } from '../fixtures/baseFixture';

/**
 * Inventory page tests - sorting, product listing, cart badge behavior
 */

test.describe('Inventory Page', () => {
  test('@smoke should display all 6 products', async ({
    authenticatedPage: inventoryPage,
  }) => {
    const products = await inventoryPage.getProductNames();
    expect(products).toHaveLength(6);
  });

  test('@regression should sort products A-Z', async ({
    authenticatedPage: inventoryPage,
  }) => {
    await inventoryPage.sortBy('az');
    const products = await inventoryPage.getProductNames();
    const sorted = [...products].sort();
    expect(products).toEqual(sorted);
  });

  test('@regression should sort products Z-A', async ({
    authenticatedPage: inventoryPage,
  }) => {
    await inventoryPage.sortBy('za');
    const products = await inventoryPage.getProductNames();
    const sorted = [...products].sort().reverse();
    expect(products).toEqual(sorted);
  });

  test('@regression cart badge should update correctly', async ({
    authenticatedPage: inventoryPage,
  }) => {
    expect(await inventoryPage.getCartItemCount()).toBe(0);

    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    expect(await inventoryPage.getCartItemCount()).toBe(1);

    await inventoryPage.addProductToCart('Sauce Labs Bike Light');
    expect(await inventoryPage.getCartItemCount()).toBe(2);

    await inventoryPage.removeProductFromCart('Sauce Labs Backpack');
    expect(await inventoryPage.getCartItemCount()).toBe(1);
  });

  test('@regression should logout successfully', async ({
    authenticatedPage: inventoryPage,
    loginPage,
  }) => {
    await inventoryPage.logout();
    await expect(loginPage.loginButton).toBeVisible();
  });
});
