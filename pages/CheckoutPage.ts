import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * CheckoutPage - Page Object for the multi-step checkout flow
 */
export class CheckoutPage extends BasePage {
  // Step 1: Information page
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;

  // Step 2: Overview page
  readonly finishButton: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;

  // Step 3: Complete page
  readonly completeHeader: Locator;
  readonly backToProductsButton: Locator;

  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    // Step 1 locators
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');

    // Step 2 locators
    this.finishButton = page.locator('[data-test="finish"]');
    this.subtotalLabel = page.locator('.summary_subtotal_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');

    // Step 3 locators
    this.completeHeader = page.locator('.complete-header');
    this.backToProductsButton = page.locator('[data-test="back-to-products"]');

    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Fill in customer information (step 1 of checkout)
   */
  async fillCustomerInfo(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  /**
   * Complete the purchase (step 2 of checkout)
   */
  async completePurchase(): Promise<void> {
    await this.finishButton.click();
  }

  /**
   * Assert the order was placed successfully
   */
  async assertOrderComplete(): Promise<void> {
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }

  /**
   * Get the order total from the overview page
   */
  async getOrderTotal(): Promise<string> {
    return (await this.totalLabel.textContent()) || '';
  }
}
