/* eslint-disable prettier/prettier */
import { JsonObject } from 'n8n-workflow'

export class DataFetch {
	/**
 * Fetches the desired data from the Twitch campaigns page and returns it as a promise that resolves to an array of JSON objects.
 *
 * @param {any} cookies - An array of cookies to be added to the browser before navigating to the Twitch campaigns page.
 * @returns {Promise<JsonObject[]>} - A promise that resolves to an array of JSON objects containing the desired data. Each object has the following properties:
 *   - `game` (`string`): The name of the game for which campaigns are being offered.
 *   - `distributor` (`string`): The name of the distributor offering the campaigns.
 *   - `start` (`string`): The start date of the campaign period.
 *   - `end` (`string`): The end date of the campaign period.
 *
 * @example
 * const dataFetch = new DataFetch()
 * const cookies = [{ name: 'myCookie', value: 'cookieValue' }]
 * dataFetch.fetch(cookies).then((data) => {
 *   console.log(data)
 *   // Output: [{ game: 'Game 1', distributor: 'Distributor 1', start: '2022-01-01', end: '2022-01-31' }, { game: 'Game 2', distributor: 'Distributor 2', start: '2022-02-01', end: '2022-02-28' }]
 * })
 */
	async fetch(cookies: any): Promise<JsonObject[]> {
		const webdriver = require('selenium-webdriver')
		const firefox = require('selenium-webdriver/firefox')

		// Create a new Firefox browser instance with the `--headless` flag
		const options = new firefox.Options()
		options.addArguments('--headless')
		const driver = new webdriver.Builder()
			.forBrowser('firefox')
			.setFirefoxOptions(options)
			.build()
		try {
			// Add the provided cookies to the browser
			for (const c of cookies) {
				driver.manage().addCookie(c)
			}

			// Navigate to the Twitch campaigns page and refresh it
			await driver.get('https://www.twitch.tv/drops/campaigns')
			await driver.navigate().refresh()
			const returnResult = []

			// Find all the elements with the desired class and get their inner text
			for (const e of await driver.findElements(
				webdriver.By.xpath(
					"//h4/preceding::div[contains(@class, 'Layout-sc') and contains(@class, 'ScAccordionHeaderContents-sc')]",
				),
			)) {
				const result = await e.getAttribute("innerText")
				const resultJson = this.generateJson(result)
				returnResult.push(resultJson)
			}
			return returnResult
		} finally {
			// Close the browser instance when done
			driver.quit()
		}
	}

	/**
 * Generates a JSON object from the provided response string.
 *
 * @param {string} response - The response string to be converted to a JSON object.
 * @returns {JsonObject} - A JSON object containing the following properties:
 *   - `game` (`string`): The name of the game for which campaigns are being offered.
 *   - `distributor` (`string`): The name of the distributor offering the campaigns.
 *   - `start` (`string`): The start date of the campaign period.
 *   - `end` (`string`): The end date of the campaign period.
 *
 * @example
 * const dataFetch = new DataFetch()
 * const response = 'Game 1\nDistributor 1\n2022-01-01 - 2022-01-31'
 * console.log(dataFetch.generateJson(response))
 * // Output: { game: 'Game 1', distributor: 'Distributor 1', start: '2022-01-01', end: '2022-01-31' }
 */
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
