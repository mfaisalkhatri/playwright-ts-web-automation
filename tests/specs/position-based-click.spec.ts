import {test,expect} from '@playwright/test'

test('Test Position based click', async({page})=> {

    await page.goto("https://www.lambdatest.com/selenium-playground/simple-form-demo")
    await page.locator('#sum1').fill("1")
    await page.locator('#sum2').fill("2")
    await page.getByRole('button', {name: 'Get Sum'}).click({position: {x:10, y:5}})
    await expect(page.locator('#addmessage')).toHaveText("3")
})