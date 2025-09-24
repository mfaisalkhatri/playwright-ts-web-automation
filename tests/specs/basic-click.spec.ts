import { test, expect } from '@playwright/test'

test('Test Mouse Click', async ({ page }) => {
 await page.goto('https://www.lambdatest.com/selenium-playground/')
 await page.getByRole('link', {name: "Ajax Form Submit"}).click()
 await expect(page.getByRole('heading', {name: "Form Submit Demo"})).toHaveText("Form Submit Demo")
})
