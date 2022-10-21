import cookies from "../cookies.json"
require("chromedriver")
const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

(async function example() {
  var options = new chrome.Options()
  options.addArguments(["--headless"])
  let driver = new webdriver.Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();
  try {
    for (let c of cookies) {
      driver.manage().addCookie(c)
    }
    await driver.get("https://www.twitch.tv/drops/campaigns")
    await driver.navigate().refresh()

    for (let e of await driver.findElements(
      webdriver.By.xpath("//h4/preceding::div[contains(@class, 'Layout-sc-nxg1ff-0 ScAccordionHeaderContents-sc-ja4t0c-0')]"))) {
      console.log(await e.getText())
    }

  } finally {
    await driver.quit();
  }
})()


