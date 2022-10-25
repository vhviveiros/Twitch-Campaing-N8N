"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataFetch = void 0;
/* eslint-disable prettier/prettier */
const cookies_json_1 = __importDefault(require("../cookies.json"));
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
            for (const c of cookies_json_1.default) {
                driver.manage().addCookie(c);
            }
            await driver.get('https://www.twitch.tv/drops/campaigns');
            await driver.navigate().refresh();
            const return_result = [];
            for (const e of await driver.findElements(webdriver.By.xpath("//h4/preceding::div[contains(@class, 'Layout-sc-nxg1ff-0 ScAccordionHeaderContents-sc-ja4t0c-0')]"))) {
                const result = await e.getText();
                const result_json = this.generateJson(result);
                return_result.push(result_json);
            }
            return return_result;
        }
        finally {
            await driver.quit();
        }
    }
    generateJson(result) {
        let result_split = ['', '', ''];
        let period_split = ['', ''];
        try {
            result_split = result.split('\n');
            period_split = result_split[2].split(' - ');
        }
        catch (_a) { }
        const result_json = {
            game: result_split[0],
            distributor: result_split[1],
            start: period_split[0],
            end: period_split[1],
        };
        return result_json;
    }
}
exports.DataFetch = DataFetch;
//# sourceMappingURL=data_fetch.js.map