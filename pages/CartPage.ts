import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * CartPage - Page Object for the shopping cart page
 */
export class CartPage extends BasePage {
  readonly pageTitle: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  /**
   * Get all product names currently in cart
   */
  async getCartProductNames(): Promise<string[]> {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }

  /**
   * Get total number of items in cart
   */
  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  /**
   * Remove item from cart by product name
   */
  async removeItem(productName: string): Promise<void> {
    const item = this.page.locator('.cart_item', { hasText: productName });
    await item.locator('button', { hasText: 'Remove' }).click();
  }

  /**
   * Proceed to checkout
   */
  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  /**
   * Assert cart page is displayed
   */
  async assertPageLoaded(): Promise<void> {
    await expect(this.pageTitle).toHaveText('Your Cart');
  }

  /**
   * Assert specific product is in cart
   */
  async assertProductInCart(productName: string): Promise<void> {
    await expect(
      this.page.locator('.inventory_item_name', { hasText: productName })
    ).toBeVisible();
  }
}
