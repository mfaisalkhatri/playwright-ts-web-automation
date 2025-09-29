import {test,expect} from '@playwright/test'

test('Test Programmatic click', async({page})=> {

    await page.goto('https://www.lambdatest.com/selenium-playground/')
    await page.getByRole('link', {name: "Shadow DOM"}).dispatchEvent('click')
    await expect(page.getByRole('heading', {name: "Shadow DOM"})).toHaveText("Shadow DOM")

})