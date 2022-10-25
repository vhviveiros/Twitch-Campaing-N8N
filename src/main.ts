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
    var return_result = []

    for (let e of await driver.findElements(
      webdriver.By.xpath("//h4/preceding::div[contains(@class, 'Layout-sc-nxg1ff-0 ScAccordionHeaderContents-sc-ja4t0c-0')]"))) {
      const result = await e.getText()
      var result_split = ["", "", ""]
      var period_split = ["", ""]

      try {
        result_split = result.split("\n")
        period_split = result_split[2].split(" - ")
      }
      catch { }

      const result_json = {
        game: result_split[0],
        distributor: result_split[1],
        start: period_split[0],
        end: period_split[1]
      }

      return_result.push(result_json)
    }
    console.log(return_result)

  } finally {
    await driver.quit();
  }
})()


