import { test, expect, Page } from '@playwright/test';

test('Create an automation script that navigates to user registration page then assert that frontend team added an input validation by clicking on all fields without adding any values on it this must trigger a validation message. Fill registration form fields with required data [Self Generated Information] and click on show password advice then register to application. Assert the successful message of registration. App will redirect to login page use same generated information to login to web application.', async ({ page }: { page: Page }) => {
  // Navigate to the provided web application
  await page.goto('https://juice-shop.herokuapp.com/#/');

  await page.getByLabel('Close Welcome Banner').click();

  // Wait for the homepage to load
  await page.waitForLoadState('networkidle');

  // Scroll to the bottom of the page
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  await page.getByLabel('dismiss cookie message').click();

  await page.getByLabel('Show/hide account menu').click();

  await page.getByRole('menuitem', { name: 'Go to login page' }).click();

  await page.getByRole('link', { name: 'Not yet a customer?' }).click();

   await page.locator('div').filter({ hasText: /^Email \*$/ }).nth(2).click();

   await page.getByLabel('Field for the password').click();

   await expect(page.getByText('Please provide an email')).toContainText('Please provide an email address.');

   await page.getByLabel('Field to confirm the password').click();

   await expect(page.getByText('Please provide a password.')).toContainText('Please provide a password.');
   
   await page.locator('.mat-slide-toggle-thumb').click();

   await expect(page.getByText('Please repeat your password.')).toContainText('Please repeat your password.');

   await expect(page.locator('mat-card-content')).toContainText('contains at least one lower character');

   await expect(page.locator('mat-card-content')).toContainText('contains at least one upper character');

   await expect(page.locator('mat-card-content')).toContainText('contains at least one digit');

   await expect(page.locator('mat-card-content')).toContainText('contains at least one special character');

   await expect(page.locator('mat-card-content')).toContainText('contains at least 8 characters');

   await page.getByLabel('Selection list for the').locator('span').click();

   page.locator(".cdk-overlay-backdrop").click();

   await expect(page.getByText('Please select a security')).toContainText('Please select a security question.');

   await page.locator('div').filter({ hasText: /^Answer \*$/ }).nth(2).click();

   await page.getByText('Email *Please provide an email address.Password *Please provide a password.').click();

   await expect(page.getByText('Please provide an answer to')).toContainText('Please provide an answer to your security question.');

  // Fill registration form with valid data
  const userEmail = `testuser${Date.now()}@example.com`; 
  const userPassword = 'SecurePassword123!'; 

  await page.fill('#emailControl', userEmail);

  await page.fill('#passwordControl', userPassword);

  await page.fill('#repeatPasswordControl', userPassword);

  await page.locator('.mat-slide-toggle-thumb').click();

  await page.locator('#mat-select-value-3').click();

  await page.getByText('Mother\'s maiden name?').click();

  await page.getByPlaceholder('Answer to your security').click();

  await page.getByPlaceholder('Answer to your security').fill('Test');

  await page.getByLabel('Button to complete the').click();

  await expect(page.locator('simple-snack-bar')).toContainText('Registration completed successfully. You can now log in.');

  console.log(userEmail);

  console.log(userPassword);

  await page.getByLabel('Text field for the login email').fill(userEmail);

  await page.getByLabel('Text field for the login password').click();

  await page.getByLabel('Text field for the login password').fill(userPassword);

  await page.getByLabel('Login', { exact: true }).click();

  await page.getByLabel('Show/hide account menu').click();

  // Assert successful login redirection or UI confirmation
  const logout = page.locator('//button[@aria-label="Logout"]//span');
  
  await expect(logout).toBeVisible();

  console.log('Registration and Login Process successfully completed.');
});
