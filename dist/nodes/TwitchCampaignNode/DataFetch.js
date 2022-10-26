"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataFetch = void 0;
class DataFetch {
    async fetch() {
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
            const returnResult = [];
            for (const e of await driver.findElements(webdriver.By.xpath("//h4/preceding::div[contains(@class, 'Layout-sc-nxg1ff-0 ScAccordionHeaderContents-sc-ja4t0c-0')]"))) {
                const result = await e.getText();
                const resultJson = this.generateJson(result);
                returnResult.push(resultJson);
            }
            return returnResult;
        }
        finally {
            await driver.quit();
        }
    }
    generateJson(response) {
        let resultSplit = ['', '', ''];
        let periodSplit = ['', ''];
        try {
            resultSplit = response.split('\n');
            periodSplit = resultSplit[2].split(' - ');
        }
        catch {
            console.log('nothing');
        }
        const resultJson = {
            game: resultSplit[0],
            distributor: resultSplit[1],
            start: periodSplit[0],
            end: periodSplit[1],
        };
        return resultJson;
    }
}
exports.DataFetch = DataFetch;
//# sourceMappingURL=DataFetch.js.map