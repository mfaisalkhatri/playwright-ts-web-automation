import { test, expect } from "@playwright/test";
import { HomePage } from "../pageobjects/home-page";

test("Add product to cart", async ({ page }) => {
  await page.goto("https://ecommerce-playground.lambdatest.io/");

  const homePage = new HomePage(page);

  await homePage.hoverMyAccountLink();
  await expect(homePage.logoutLink).toBeVisible();

  const searchResultPage = await homePage.searchForProduct("iPhone");
  await searchResultPage.addProductToCart();

  await expect(searchResultPage.successMessage).toContainText(
    "Success: You have added iPhone to your shopping cart!"
  );
  const shoppingCart = await searchResultPage.viewCart();
  await expect(shoppingCart.productName).toContainText("iPhone");
});