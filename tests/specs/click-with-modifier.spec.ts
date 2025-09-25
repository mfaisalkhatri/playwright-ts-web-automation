import { test, expect } from '@playwright/test'

test('Test Click with Modifier', async ({ page,context }) => {
 await page.goto('https://www.lambdatest.com/selenium-playground/')
 await page.getByRole('link', {name: "Input Form Submit"}).click({ modifiers: ['Shift']})
 const pagePromise = context.waitForEvent('page');
 const pageTwo = await pagePromise;
 await expect(pageTwo.getByRole('heading', {name: 'Form Demo'})).toHaveText('Form Demo')
})
