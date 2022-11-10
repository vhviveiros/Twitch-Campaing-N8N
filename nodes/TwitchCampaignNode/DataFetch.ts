/* eslint-disable prettier/prettier */
import { JsonObject } from 'n8n-workflow'

export class DataFetch {
	async fetch(cookies: any): Promise<JsonObject[]> {
		require('chromedriver')
		const webdriver = require('selenium-webdriver')
		const chrome = require('selenium-webdriver/chrome')

		const options = new chrome.Options()
		options.addArguments(['--headless'])
		const driver = new webdriver.Builder()
			.forBrowser('chrome')
			.setChromeOptions(options)
			.build()
		try {
			for (const c of JSON.parse(cookies)) {
				driver.manage().addCookie(c)
				console.log("\nCookie: " + c + "\n")
			}
			await driver.get('https://www.twitch.tv/drops/campaigns')
			await driver.navigate().refresh()
			const returnResult = []

			for (const e of await driver.findElements(
				webdriver.By.xpath(
					"//h4/preceding::div[contains(@class, 'Layout-sc-nxg1ff-0 ScAccordionHeaderContents-sc-ja4t0c-0')]",
				),
			)) {
				const result = await e.getAttribute("innerText")
				const resultJson = this.generateJson(result)
				returnResult.push(resultJson)
			}
			return returnResult
		} finally {
			driver.close()
			driver.quit()
		}
	}

	private generateJson(response: string): JsonObject {
		const removeEmptyLines = (str: string) => str.split(/\r?\n/).filter((line) => line.trim() !== '').join('\n')
		response = removeEmptyLines(response)
		let resultSplit = ['', '', '']
		let periodSplit = ['', '']

		try {
			resultSplit = response.split('\n')
			periodSplit = resultSplit[2].split(' - ')
		} catch { }

		const resultJson = {
			game: resultSplit[0],
			distributor: resultSplit[1],
			start: periodSplit[0],
			end: periodSplit[1],
		}
		return resultJson
	}
}
