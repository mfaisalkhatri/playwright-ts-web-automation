import {test, expect} from '@playwright/test'

test('Test drag and drop action manually', async({page}) => {

    await page.goto('https://www.lambdatest.com/selenium-playground/drag-and-drop-demo')
    await page.getByText('Draggable 1').hover()
    await page.mouse.down()
    await page.locator('#mydropzone').hover()
    await page.mouse.up()
    await expect(page.locator('#droppedlist')).toHaveText('Draggable 1')
})