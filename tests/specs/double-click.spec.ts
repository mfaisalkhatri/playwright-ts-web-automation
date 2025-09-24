import {test,expect} from '@playwright/test'

test('Test Double Click', async({page}) => {

    await page.goto('https://www.lambdatest.com/selenium-playground/checkbox-demo')
    await page.getByLabel('Click on check box').dblclick()
    await expect(page.getByLabel('Click on check box')).not.toBeChecked
})