import { test, expect } from '../fixtures/baseFixture';
import { testProducts, testCustomer } from '../config/testData';

/**
 * End-to-end purchase flow tests
 *
 * These tests use the `authenticatedPage` fixture to skip the login step,
 * focusing on the shopping + checkout experience.
 */

test.describe('End-to-End Purchase Flow', () => {
  test('@smoke should complete full purchase flow with single item', async ({
    authenticatedPage: inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    // Add product to cart
    await inventoryPage.addProductToCart(testProducts.backpack);
    expect(await inventoryPage.getCartItemCount()).toBe(1);

    // Navigate to cart and verify
    await inventoryPage.openCart();
    await cartPage.assertPageLoaded();
    await cartPage.assertProductInCart(testProducts.backpack);

    // Proceed through checkout
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCustomerInfo(
      testCustomer.firstName,
      testCustomer.lastName,
      testCustomer.postalCode
    );

    // Complete purchase and verify success
    await checkoutPage.completePurchase();
    await checkoutPage.assertOrderComplete();
  });

  test('@regression should complete purchase flow with multiple items', async ({
    authenticatedPage: inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    // Add multiple products
    await inventoryPage.addProductToCart(testProducts.backpack);
    await inventoryPage.addProductToCart(testProducts.bikeLight);
    await inventoryPage.addProductToCart(testProducts.tshirt);
    expect(await inventoryPage.getCartItemCount()).toBe(3);

    // Verify all items in cart
    await inventoryPage.openCart();
    expect(await cartPage.getCartItemCount()).toBe(3);
    const cartItems = await cartPage.getCartProductNames();
    expect(cartItems).toContain(testProducts.backpack);
    expect(cartItems).toContain(testProducts.bikeLight);
    expect(cartItems).toContain(testProducts.tshirt);

    // Complete checkout
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCustomerInfo(
      testCustomer.firstName,
      testCustomer.lastName,
      testCustomer.postalCode
    );
    await checkoutPage.completePurchase();
    await checkoutPage.assertOrderComplete();
  });

  test('@regression should allow removing items from cart', async ({
    authenticatedPage: inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addProductToCart(testProducts.backpack);
    await inventoryPage.addProductToCart(testProducts.bikeLight);
    await inventoryPage.openCart();

    expect(await cartPage.getCartItemCount()).toBe(2);
    await cartPage.removeItem(testProducts.backpack);
    expect(await cartPage.getCartItemCount()).toBe(1);
  });
});
