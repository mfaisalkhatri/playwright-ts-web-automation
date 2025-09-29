import {test, expect} from '@playwright/test'

test('Test drag and drop action', async({page}) => {

    await page.goto("https://www.lambdatest.com/selenium-playground/drag-and-drop-demo")
    await page.getByText('Draggable 1').dragTo(page.locator('#mydropzone'))
    await expect(page.locator('#droppedlist')).toHaveText('Draggable 1')
})