import {test,expect} from '@playwright/test'

test('Test mouse hover and force click', async({page}) => {

    await page.goto("https://ecommerce-playground.lambdatest.io/")
    await page.getByRole('button',{name:"My account"}).hover()
    await page.getByRole('link', {name:"Login"}).click({force: true})
    await expect(page.getByRole('heading', {name: "Returning Customer"})).toHaveText("Returning Customer") 
})