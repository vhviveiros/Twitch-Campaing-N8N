import { DataFetch } from './DataFetch'
import { IExecuteFunctions } from 'n8n-core'
import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	JsonObject,
	NodeOperationError,
} from 'n8n-workflow'

export class TwitchCampaignNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Twitch Campaigns',
		name: 'twitchCampaigns',
		icon: 'file:twitch.svg',
		group: ['transform'],
		version: 1,
		description: 'Obtains a list of current twitch campaigns.',
		defaults: {
			name: 'Twitch Campaigns Node',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			// Node properties which the user gets displayed and
			// can change on the node.
			{
				displayName: 'Cookies',
				name: 'cookies',
				type: 'string',
				default: '',
				placeholder: 'Cookies from twitch.com',
				description: 'Paste here your cookies from twitch or link from a previous variables',
			},
		],
	}

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const input = this.getNodeParameter("cookies", 0) as string
		var result: JsonObject[] = []

		//Response can be empty, so we will try 3 times to get something
		for (let i = 0; i <= 3; ++i) {
			result = await new DataFetch().fetch(input)
			if (result.length > 0)
				break
		}

		return [this.helpers.returnJsonArray(result)]
	}
}
