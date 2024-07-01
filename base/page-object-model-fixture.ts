import { expect, chromium, test as baseTest } from "@playwright/test";
import { HomePage } from "../tests/pageobjects/home-page";
import { RegistrationPage } from "../tests/pageobjects/registration-page";
import dotenv from 'dotenv';
import path from "path";

type pages = {
  homePage: HomePage;
  registrationPage: RegistrationPage;
};

dotenv.config({ path: path.resolve(__dirname, '.env') });
// LambdaTest capabilities
const capabilities = {
  browserName: "Chrome", // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
  browserVersion: "latest",
  "LT:Options": {
    platform: "Windows 10",
    build: "Playwright Test Build",
    name: "Playwright Test",
    user: process.env.LT_USERNAME,
    accessKey: process.env.LT_ACCESS_KEY,
    network: true,
    video: true,
    console: true,
    tunnel: false, // Add tunnel configuration if testing locally hosted webpage
    tunnelName: "", // Optional
    geoLocation: "", // country code can be fetched from https://www.lambdatest.com/capabilities-generator/
  },
};

// Patching the capabilities dynamically according to the project name.
const modifyCapabilities = (configName, testName) => {
  let config = configName.split("@lambdatest")[0];
  let [browserName, browserVersion, platform] = config.split(":");
  capabilities.browserName = browserName;
  capabilities.browserVersion = browserVersion;
  capabilities["LT:Options"]["platform"] = platform || capabilities["LT:Options"]["platform"];
  capabilities["LT:Options"]["name"] = testName;
};

const getErrorMessage = (obj, keys) =>
  keys.reduce(
    (obj, key) => (typeof obj == "object" ? obj[key] : undefined),
    obj
  );

const testPages = baseTest.extend<pages,{workerStorageState: string;}>({
  page: async ({}, use, testInfo) => {
    if (testInfo.project.name.match(/lambdatest/)) {
      modifyCapabilities(testInfo.project.name, `${testInfo.title}`);
      const browser =
        await chromium.connect(`wss://cdp.lambdatest.com/playwright?capabilities=
        ${encodeURIComponent(JSON.stringify(capabilities))}`);
      const context = await browser.newContext(testInfo.project.use);
      const ltPage = await context.newPage();
      await use(ltPage);

      const testStatus = {
        action: "setTestStatus",
        arguments: {
          status: testInfo.status,
          remark: getErrorMessage(testInfo, ["error", "message"]),
        },
      };
      await ltPage.evaluate(() => {},
      `lambdatest_action: ${JSON.stringify(testStatus)}`);
      await ltPage.close();
      await context.close();
      await browser.close();
    } else {
      const browser = await chromium.launch();
      const context = await browser.newContext();
      const page = await context.newPage();
      await use(page);
    }
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },
  storageState: ({ workerStorageState }, use) => use(workerStorageState),
  workerStorageState: [
    async ({ browser }, use) => {
      const id = test.info().parallelIndex;
      const fileName = path.resolve(
        test.info().project.outputDir,
        `.auth/${id}.json`
      );

      const page = await browser.newPage({ storageState: undefined });
      await page.goto("https://ecommerce-playground.lambdatest.io/");

      const homePage = new HomePage(page);
      await homePage.navigateToRegistrationPage();
    
      const registrationPage = new RegistrationPage(page);
      await expect(registrationPage.pageTitle).toBeVisible();
    
      const myAccountPage = await registrationPage.registerUser(
        "Johnny15",
        "Bonzela15",
        "johnn15@demo.com",
        "0076765476",
        "Password@123"
      );
      await expect(myAccountPage.pageHeader).toBeVisible();
    
      await page.context().storageState({ path: fileName });

      await use(fileName);
    },
    { scope: "worker" },
  ],
});

export const test = testPages;