"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataFetch = void 0;
class DataFetch {
    async fetch(cookies) {
        const webdriver = require('selenium-webdriver');
        const firefox = require('selenium-webdriver/firefox');
        const options = new firefox.Options();
        options.addArguments('--headless');
        const driver = new webdriver.Builder()
            .forBrowser('firefox')
            .setFirefoxOptions(options)
            .build();
        try {
            for (const c of cookies) {
                driver.manage().addCookie(c);
            }
            await driver.get('https://www.twitch.tv/drops/campaigns');
            await driver.navigate().refresh();
            const returnResult = [];
            for (const e of await driver.findElements(webdriver.By.xpath("//h4/preceding::div[contains(@class, 'Layout-sc') and contains(@class, 'ScAccordionHeaderContents-sc')]"))) {
                const result = await e.getAttribute("innerText");
                const resultJson = this.generateJson(result);
                returnResult.push(resultJson);
            }
            return returnResult;
        }
        finally {
            driver.quit();
        }
    }
    generateJson(response) {
        const removeEmptyLines = (str) => str.split(/\r?\n/).filter((line) => line.trim() !== '').join('\n');
        response = removeEmptyLines(response);
        let resultSplit = ['', '', ''];
        let periodSplit = ['', ''];
        try {
            resultSplit = response.split('\n');
            periodSplit = resultSplit[2].split(' - ');
        }
        catch { }
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