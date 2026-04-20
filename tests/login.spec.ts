import { test, expect } from '../fixtures/baseFixture';
import { testUsers, errorMessages } from '../config/testData';

/**
 * Login functionality test suite
 *
 * Tags:
 *   @smoke      - Critical path tests run on every commit
 *   @regression - Full suite run before releases
 *   @negative   - Negative test scenarios
 */

test.describe('Login Functionality', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test('@smoke should login successfully with valid credentials', async ({
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.login(testUsers.standard.username, testUsers.standard.password);
    await inventoryPage.assertPageLoaded();
    expect(await inventoryPage.getUrl()).toContain('inventory');
  });

  test('@regression @negative should display error for locked out user', async ({
    loginPage,
  }) => {
    await loginPage.login(testUsers.locked.username, testUsers.locked.password);
    await loginPage.assertErrorDisplayed(errorMessages.lockedOut);
  });

  test('@regression @negative should display error for invalid credentials', async ({
    loginPage,
  }) => {
    await loginPage.login(testUsers.invalid.username, testUsers.invalid.password);
    await loginPage.assertErrorDisplayed(errorMessages.invalidCredentials);
  });

  test('@regression @negative should require username', async ({ loginPage }) => {
    await loginPage.login('', 'any_password');
    await loginPage.assertErrorDisplayed(errorMessages.missingUsername);
  });

  test('@regression @negative should require password', async ({ loginPage }) => {
    await loginPage.login('any_user', '');
    await loginPage.assertErrorDisplayed(errorMessages.missingPassword);
  });

  test('@regression performance glitch user should still login (may be slow)', async ({
    loginPage,
    inventoryPage,
  }) => {
    test.setTimeout(60000); // Allow extra time for slow user
    await loginPage.login(
      testUsers.performanceGlitch.username,
      testUsers.performanceGlitch.password
    );
    await inventoryPage.assertPageLoaded();
  });
});
