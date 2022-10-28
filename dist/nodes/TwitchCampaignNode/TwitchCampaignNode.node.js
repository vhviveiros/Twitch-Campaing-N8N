"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwitchCampaignNode = void 0;
const DataFetch_1 = require("./DataFetch");
class TwitchCampaignNode {
    constructor() {
        this.description = {
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
    }
    async execute() {
        const result = await new DataFetch_1.DataFetch().fetch();
        console.log(result);
        return [this.helpers.returnJsonArray(result)];
    }
}
exports.TwitchCampaignNode = TwitchCampaignNode;
//# sourceMappingURL=TwitchCampaignNode.node.js.map