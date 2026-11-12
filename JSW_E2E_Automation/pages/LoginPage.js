class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('input[type="text"]');
    this.passwordInput = page.locator('input[type="password"]');
    this.loginButton = page.locator('button:has-text("Login")');
  }

  async goto() {
    // Navigate directly to the reporting login system instead of the master splash screen
    await this.page.goto('/login/reporting');
  }

  async login(username, password) {
    // Wait for inputs to be visible
    await this.usernameInput.waitFor({ state: 'visible', timeout: 10000 });
    
    // Fill credentials
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    
    // Click login
    await this.loginButton.click();
    
    // Wait for navigation
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = { LoginPage };

