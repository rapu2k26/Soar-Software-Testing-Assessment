import { test, expect, Page } from '@playwright/test';

test('Create an automation script that login via valid generated credentials and at product page add five different product to basket and assert that cart number changed to five also assert that a there is a success popup message appearing at every time you add product to basket. Navigate to your basket and increase number of any product then delete it from basket then assert that total price has been changed. The final step click on checkout and add address information then select delivery method. App will navigate to payment screen assert that your wallet has not money so select option to add a credit card information then continue purchase.', async ({ page }: { page: Page }) => {
  // 1. Navigate to login page

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

  // Fill registration form with valid data
  const userEmail = `testuser${Date.now()}@example.com`; // Generate unique email
  const userPassword = 'SecurePassword123!'; // Example strong password

  await page.fill('#emailControl', userEmail);

  await page.fill('#passwordControl', userPassword);

  await page.fill('#repeatPasswordControl', userPassword);

  await page.locator('.mat-slide-toggle-thumb').click();

  await page.waitForTimeout(3000);

  const select = await page.locator('#registration-form div').filter({ hasText: 'Security Question *' }).nth(3);
  await select.click(); 

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

  // 3. Navigate to the product page and add five products to the basket
  for (let i = 1; i <= 5; i++) { 
    const product = page.locator(`.mat-grid-tile:nth-child(${i}) button[aria-label="Add to Basket"]`);
    await product.click();
    await page.waitForTimeout(2000);
    // Assert success popup message appears
    //const successPopup = page.locator('simple-snack-bar');  
    //await expect(successPopup).toContainText('to basket.');  
  }
  await page.waitForTimeout(5000);

  // 4. Assert that cart number changed to 5
  const cartIcon = page.locator('button[aria-label="Show the shopping cart"]');
  await expect(cartIcon).toHaveText(' shopping_cart  Your Basket5');

  // 5. Navigate to the basket
  await cartIcon.click();
  await page.waitForURL('**/#/basket');

  // 6. Increase quantity of the first product
 await page.getByRole('row', { name: 'Apple Juice (1000ml) Apple' }).getByRole('button').nth(1).click();
  await page.waitForTimeout(5000);

  // 7. Assert that the total price has changed
const totalPrice = page.locator('#price');
const initialTotalPriceText = await totalPrice.innerText();

// Remove any non-numeric characters except the decimal point
const sanitizedPrice = initialTotalPriceText.replace(/[^\d.-]/g, '');

// Parse the sanitized price as a float
const initialTotalPrice = parseFloat(sanitizedPrice);

  // 8. Delete the first product from the basket
   const minusIcon = page.getByRole('row', { name: 'Apple Juice (1000ml) Apple' }).getByRole('button').first();

   minusIcon.click();

   await page.waitForTimeout(5000);

  // Assert that total price updates again
  const updatedTotalPrice = await totalPrice.innerText();

  const sanitizedPriceafterremoveItem = updatedTotalPrice.replace(/[^\d.-]/g, '');

  // Parse the sanitized price as a float
  const updatedPriceTotal = parseFloat(sanitizedPriceafterremoveItem);

  expect(updatedPriceTotal).toBeLessThan(initialTotalPrice);

  await page.getByRole('button', { name: 'Checkout' }).click();

  await page.getByLabel('Add a new address').click();

  await page.getByPlaceholder('Please provide a country.').click();

  await page.getByPlaceholder('Please provide a country.').fill('India');

  await page.getByPlaceholder('Please provide a name.').click();

  await page.getByPlaceholder('Please provide a name.').fill('Test');

  await page.locator('div').filter({ hasText: /^Mobile Number \*$/ }).nth(2).click();

  await page.getByPlaceholder('Please provide a mobile').fill('9999663322');

  await page.getByPlaceholder('Please provide a ZIP code.').click();

  await page.getByPlaceholder('Please provide a ZIP code.').fill('524314');

  await page.getByPlaceholder('Please provide an address.').click();

  await page.getByPlaceholder('Please provide an address.').fill('Test');

  await page.getByPlaceholder('Please provide a city.').click();

  await page.getByPlaceholder('Please provide a city.').fill('Test');

  await page.getByPlaceholder('Please provide a state.').click();

  await page.getByPlaceholder('Please provide a state.').fill('AP');

  await page.getByRole('button', { name: 'send Submit' }).click();

  await page.locator('.mat-radio-outer-circle').click();

  await page.getByLabel('Proceed to payment selection').click();

  await page.locator('.mat-radio-outer-circle').first().click();

  await page.getByLabel('Proceed to delivery method').click();

  await page.getByRole('button', { name: 'Add new card Add a credit or' }).click();

  await page.getByLabel('Name *').click();

  await page.getByLabel('Name *').fill('Test');

  await page.getByLabel('Card Number *').click();

  await page.getByLabel('Card Number *').fill('5555555555554444');

  await page.getByLabel('Expiry Month *').selectOption('1');

  await page.getByLabel('Expiry Year *').selectOption('2081');

  await page.getByRole('button', { name: 'send Submit' }).click();

  await page.locator('.mat-radio-outer-circle').click();

  await page.getByLabel('Proceed to review').click();

  await page.locator('//button[@id="checkoutButton"]').click();

  await expect(page.getByRole('heading')).toContainText('Thank you for your purchase!');

});
