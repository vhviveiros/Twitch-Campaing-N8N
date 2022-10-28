import { DataFetch } from './DataFetch';
import { IExecuteFunctions } from 'n8n-core';
import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

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
				displayName: 'Resource',
				name: 'resource',
				type: 'string',
				default: '',
				placeholder: 'Placeholder value',
				description: 'The description text',
			},
		],
	};

	// The function below is responsible for actually doing whatever this node
	// is supposed to do. In this case, we're just appending the `myString` property
	// with whatever the user has entered.
	// You can make async calls and use `await`.
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const result = await new DataFetch().fetch();
		console.log(result);
		return [this.helpers.returnJsonArray(result)];
	}
}
