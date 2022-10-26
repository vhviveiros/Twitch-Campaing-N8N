import { DataFetch } from './DataFetch';
import { IExecuteFunctions } from 'n8n-core';
import {
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';

export class CampaignNode implements INodeType {
  description: INodeTypeDescription = {
    // Basic node details here
    displayName: 'Twitch Campaigns',
    name: 'twitchCampaigns',
    icon: 'file:twitch.svg',
    version: 1,
    group: ['transform'],
    description: 'Obtains a list of current twitch campaigns.',
    defaults: {
      name: 'Twitch Campaigns Node',
      color: '#BF40BF',
    },
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'string',
        default: 'campaign',
      },
    ],
    inputs: ['main'],
    outputs: ['main'],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const result = await new DataFetch().fetch();
    console.log(result);
    return [this.helpers.returnJsonArray(result)];
  }
}
