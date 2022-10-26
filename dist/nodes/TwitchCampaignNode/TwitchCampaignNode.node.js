"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignNode = void 0;
const DataFetch_1 = require("./DataFetch");
class CampaignNode {
    constructor() {
        this.description = {
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
    }
    async execute() {
        const result = await new DataFetch_1.DataFetch().fetch();
        console.log(result);
        return [this.helpers.returnJsonArray(result)];
    }
}
exports.CampaignNode = CampaignNode;
//# sourceMappingURL=TwitchCampaignNode.node.js.map