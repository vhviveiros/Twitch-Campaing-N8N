import { DataFetch } from './data_fetch';
import { IExecuteFunctions } from 'n8n-core';
import { INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';

export class ExampleNode implements INodeType {
  description: INodeTypeDescription = {
    // Basic node details here
    displayName: "Twitch Campaigns",
    name: "twitch_campaigns",
    icon: 'file:twitch.svg',
    group: [],
    description: "Obtains a list of current twitch campaigns.",
    defaults: {
      name: "campaigns",
      color: "#BF40BF",
    },
    properties: [
      {
        displayName: "Resource",
        name: "resource", 
        type: "",
        noDataExpression: true
      },
    ],
    inputs: ["main"],
    outputs: ["main"]
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const result = new DataFetch().fetch();
    console.log(await result)
    return result;
  }
};
