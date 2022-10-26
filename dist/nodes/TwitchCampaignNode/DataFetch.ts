/* eslint-disable prettier/prettier */
import { JsonObject } from 'n8n-workflow';

export class DataFetch {
  async fetch(): Promise<JsonObject[]> {
    require('chromedriver');
    const webdriver = require('selenium-webdriver');
    const chrome = require('selenium-webdriver/chrome');

    const options = new chrome.Options();
    options.addArguments(['--headless']);
    const driver = new webdriver.Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
    try {
      const cookies = require('./cookies.json');
      for (const c of cookies) {
        driver.manage().addCookie(c);
      }
      await driver.get('https://www.twitch.tv/drops/campaigns');
      await driver.navigate().refresh();
      const return_result = [];

      for (const e of await driver.findElements(
        webdriver.By.xpath(
          "//h4/preceding::div[contains(@class, 'Layout-sc-nxg1ff-0 ScAccordionHeaderContents-sc-ja4t0c-0')]"
        )
      )) {
        const result = await e.getText();
        const result_json = this.generateJson(result);

        return_result.push(result_json);
      }
      return return_result;
    } finally {
      await driver.quit();
    }
  }

  private generateJson(response: String): JsonObject {
    let result_split = ['', '', ''];
    let period_split = ['', ''];

    try {
      result_split = response.split('\n');
      period_split = result_split[2].split(' - ');
    } catch { }

    const result_json = {
      game: result_split[0],
      distributor: result_split[1],
      start: period_split[0],
      end: period_split[1],
    };
    return result_json;
  }
}
