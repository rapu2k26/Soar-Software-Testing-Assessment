import { test, expect } from '@playwright/test';

test('Create an automation script navigate to provided web application then Scroll down to the end of page then change items per page to the maximum number and assert that home page displays all of items.', async ({ page }) => {
  // Navigate to the web application
  await page.goto('https://juice-shop.herokuapp.com/#/');
  
  await page.getByLabel('Close Welcome Banner').click();

  // Wait for the homepage to load
  await page.waitForLoadState('networkidle');

  // Scroll to the bottom of the page
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  await page.getByLabel('dismiss cookie message').click();

  // Open the items-per-page dropdown and Select the maximum number of items per page
  await page.getByLabel('Items per page:').locator('div').nth(2).click();
  await page.getByText('48').click();

  // Validate all items are displayed on the page
  const allItems = page.locator('.product');
  const itemCount = await allItems.count();

  console.log(`Number of items displayed: ${itemCount}`);
  expect(itemCount).toBe(37);
  
  console.log('Test completed successfully.');

});