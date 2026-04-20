import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * LoginPage - Page Object for the SauceDemo login page
 *
 * Encapsulates all interactions with the login page,
 * keeping test files clean and maintainable.
 */
export class LoginPage extends BasePage {
  // Locators - defined once, reused everywhere
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly loginLogo: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.loginLogo = page.locator('.login_logo');
  }

  /**
   * Navigate to the login page
   */
  async navigate(): Promise<void> {
    await this.goto('/');
    await this.waitForVisible(this.loginLogo);
  }

  /**
   * Perform login with provided credentials
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Get the current error message text
   */
  async getErrorMessage(): Promise<string> {
    await this.waitForVisible(this.errorMessage);
    return (await this.errorMessage.textContent()) || '';
  }

  /**
   * Assert login was successful (user navigated to inventory page)
   */
  async assertLoginSuccess(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory/);
  }

  /**
   * Assert an error message is displayed
   */
  async assertErrorDisplayed(expectedMessage: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedMessage);
  }
}
