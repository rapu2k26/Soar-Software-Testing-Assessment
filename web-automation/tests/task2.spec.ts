import { test, expect, Page } from '@playwright/test';

test('Create an automation script navigates to provided web application, let your script click on the first product ‘AppleJuice’ then assert that there is an popup appeared and image of product exists. Then if there is an review click on it to expand this review. Wait for couple of second then close product form.', async ({ page }: { page: Page }) => {

  // Navigate to the provided web application
  await page.goto('https://juice-shop.herokuapp.com/#/');

  await page.getByLabel('Close Welcome Banner').click();

  // Wait for the homepage to load
  await page.waitForLoadState('networkidle');

  // Scroll to the bottom of the page
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  await page.getByLabel('dismiss cookie message').click();

  // Click on the first product 'Apple Juice'
  const appleJuiceProduct = page.getByRole('button', { name: 'Apple Juice (1000ml)' }); 
  await appleJuiceProduct.click();

  // Assert that the popup appears
  const productPopup = page.locator('#mat-dialog-1');
  await expect(productPopup).toBeVisible();

  // Check if the product image exists within the popup
  const productImage = page.getByRole('img', { name: 'Apple Juice (1000ml)' }); 
  await expect(productImage).toBeVisible();

  await page.waitForTimeout(5000);

  // Check if a review section is present and expand it
  const reviewSection = page.locator('//body//div//div[@dir="ltr"]//span//span[2]');
  if (await reviewSection.isVisible()) {
    await reviewSection.click();

    // Wait for the review to expand
    await page.waitForTimeout(10000); 
  } else {
    console.log('No reviews available for this product.');
  }

  // Close the product popup
  const closeButton = productPopup.locator('button[aria-label="Close Dialog"]');
  await closeButton.click();

  // Validate that the popup is no longer visible
  await expect(productPopup).toBeHidden();

  console.log('Test completed successfully.');
});
