import { test, expect } from '@playwright/test'

test('Test Mouse Click', async ({ page }) => {
 await page.goto('https://www.lambdatest.com/selenium-playground/')
 await page.getByRole('link', {name: "Drag and Drop"}).click({delay: 3000 })
 await expect(page.getByRole('heading', {name: "Drag and Drop Demo"})).toHaveText("Drag and Drop Demo")
})
