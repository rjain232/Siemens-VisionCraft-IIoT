const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('JSW Smoke Tests', () => {
  test('Successful login and navigation to Dashboard', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // 1. Navigate to the app
    await loginPage.goto();

    // 2. Perform Login (Replace with actual dev credentials if needed)
    // Note: If you have a mock or skip login mechanism in dev, adjust accordingly.
    await loginPage.login('uphadpiy@schaeffler.com', 'priyanka@123');

    // 3. Verify successful redirection to Dashboard
    // Assuming the URL changes or a specific dashboard element appears
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator('text="Production Overview"')).toBeVisible({ timeout: 10000 });
  });

  test('Detailed Production Count Report loads without crashing', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('uphadpiy@schaeffler.com', 'priyanka@123');

    // Navigate to the report
    await page.goto('/production/detailed-production');

    // Verify the page doesn't show the "Connection Refused / Reload App" error boundary
    const errorBoundaryMsg = page.locator('text="The app lost its connection"');
    await expect(errorBoundaryMsg).not.toBeVisible();

    // Verify a chart or table container exists
    const filtersPane = page.locator('.bg-white', { hasText: 'Area' });
    await expect(filtersPane.first()).toBeVisible({ timeout: 15000 });
  });
});

