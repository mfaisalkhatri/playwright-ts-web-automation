import { test, expect } from '@playwright/test';

test.describe('LambdaTest E-Commerce Login - Invalid Credentials', () => {
  test('should display warning message for invalid email/password combination', async ({ page }) => {
    // Step 1: Navigate to LambdaTest E-Commerce Playground
    await page.goto('https://ecommerce-playground.lambdatest.io/');

    // Step 2: Navigate to the Login Page
    // Hover over "My Account" to reveal the dropdown, then click "Login"
    await page.getByRole('button', { name: 'My account' }).hover();
    await page.locator('a[href*="route=account/login"]').click();

    // Verify we're on the login page
    await expect(page).toHaveURL(/route=account\/login/);
    await expect(page.locator('h1, h2').filter({ hasText: /Returning Customer/i })).toBeVisible();

    // Step 3: Enter invalid email address
    await page.locator('#input-email').fill('johndoe881@email.com');

    // Step 4: Enter password
    await page.locator('#input-password').fill('Password@123');

    // Step 5: Click the Login button
    await page.locator('input[value="Login"], button:has-text("Login")').first().click();

    // Step 6: Verify the warning message is displayed
    const warningMessage = page.locator('.alert-danger');
    await expect(warningMessage).toBeVisible({ timeout: 10000 });
    await expect(warningMessage).toContainText(
      'Warning: No match for E-Mail Address and/or Password.'
    );
  });
});