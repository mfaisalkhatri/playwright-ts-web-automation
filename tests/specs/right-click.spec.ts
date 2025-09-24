import { test } from '@playwright/test'

test('Test Right Click', async ({ page }) => {
 await page.goto('https://www.lambdatest.com/selenium-playground/context-menu')
 await page.locator('#hot-spot').click({button: "right"})
})
