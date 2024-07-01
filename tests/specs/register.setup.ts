// import {test as setup,expect} from "@playwright/test";

// const authFile = "playwright/.auth/user.json";

// setup("Register a user", async ({ page }) => {
//   await page.goto("https://ecommerce-playground.lambdatest.io/");

//   const homePage = new HomePage(page);
//   await homePage.navigateToRegistrationPage();

//   const registrationPage = new RegistrationPage(page);
//   await expect(registrationPage.pageTitle).toBeVisible();

//   const myAccountPage = await registrationPage.registerUser(
//     "Johnny10",
//     "Bonzela10",
//     "johnn10@demo.com",
//     "0076765476",
//     "Password@123"
//   );
//   await expect(myAccountPage.pageHeader).toBeVisible();

//   await page.context().storageState({ path: authFile });
// });
