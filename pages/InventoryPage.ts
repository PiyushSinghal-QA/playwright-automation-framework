import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * InventoryPage - Page Object for the products listing page
 */
export class InventoryPage extends BasePage {
  readonly pageTitle: Locator;
  readonly inventoryList: Locator;
  readonly productItems: Locator;
  readonly cartIcon: Locator;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.title');
    this.inventoryList = page.locator('.inventory_list');
    this.productItems = page.locator('.inventory_item');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  /**
   * Add a specific product to the cart by name
   */
  async addProductToCart(productName: string): Promise<void> {
    const productCard = this.page.locator('.inventory_item', {
      hasText: productName,
    });
    await productCard.locator('button', { hasText: 'Add to cart' }).click();
  }

  /**
   * Remove a specific product from the cart by name
   */
  async removeProductFromCart(productName: string): Promise<void> {
    const productCard = this.page.locator('.inventory_item', {
      hasText: productName,
    });
    await productCard.locator('button', { hasText: 'Remove' }).click();
  }

  /**
   * Get the number of items currently in the cart
   */
  async getCartItemCount(): Promise<number> {
    if (await this.cartBadge.isVisible()) {
      const text = await this.cartBadge.textContent();
      return parseInt(text || '0', 10);
    }
    return 0;
  }

  /**
   * Navigate to the cart page
   */
  async openCart(): Promise<void> {
    await this.cartIcon.click();
  }

  /**
   * Sort products by a given option
   */
  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  /**
   * Get all product names currently displayed
   */
  async getProductNames(): Promise<string[]> {
    const names = await this.page
      .locator('.inventory_item_name')
      .allTextContents();
    return names;
  }

  /**
   * Log out from the application
   */
  async logout(): Promise<void> {
    await this.menuButton.click();
    await this.logoutLink.click();
  }

  /**
   * Assert the inventory page loaded correctly
   */
  async assertPageLoaded(): Promise<void> {
    await expect(this.pageTitle).toHaveText('Products');
    await expect(this.inventoryList).toBeVisible();
  }
}
