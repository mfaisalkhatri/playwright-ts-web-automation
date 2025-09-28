import {test, expect} from '@playwright/test'
import { posix } from 'path'

test('Test Slider', async({page}) => {

    await page.goto('https://www.lambdatest.com/selenium-playground/drag-drop-range-sliders-demo')
    const slider = page.locator('#slider1')
    const sliderBoundingBox = await slider.boundingBox()
    const startX  = sliderBoundingBox.x + 1
    const centerY = sliderBoundingBox.y + (sliderBoundingBox.height/2)
    const targetX = sliderBoundingBox.x + (sliderBoundingBox.width*0.5)
    await page.mouse.move(startX,centerY)
    await page.mouse.down();
    await page.mouse.move(targetX, centerY, {steps:15});
    await page.mouse.up();
    await expect(page.locator('#range')).toHaveText('60')
})