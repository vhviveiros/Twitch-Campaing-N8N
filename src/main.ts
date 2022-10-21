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
    for (let c in cookies) {
      driver.manage().addCookie(cookies[c])
    }
    await driver.get("https://www.twitch.tv/drops/campaigns")
    await driver.navigate().refresh()

    for (let e of await driver.findElements(
      webdriver.By.xpath("//h4/preceding::h3[contains(@class, 'tw-title')]"))) {
      console.log(await e.getText())
      // const next = await driver.findElement(webdriver.By.xpath("./child::*"))
      // console.log(await next.getText())
    }

    // console.log(await driver.findElement(
    //   webdriver.By.xpath("//div[contains(@class, 'Layout-sc-nxg1ff-0 iFiRut')]/preceding::p[contains(@class, 'CoreText-sc-cpl358-0')]/preceding::div[contains(@class, 'Layout-sc-nxg1ff-0 iFiRut')]")).getText())

    // for (let e of await driver.findElements(
    //   webdriver.By.xpath("//div[contains(@class, 'Layout-sc-nxg1ff-0 iFiRut')]/preceding::p[contains(@class, 'CoreText-sc-cpl358-0')]/preceding::div[contains(@class, 'Layout-sc-nxg1ff-0 iFiRut')]"))) {
    //   console.log(await e.getText());
    // }



  } finally {
    await driver.quit();
  }
})()


