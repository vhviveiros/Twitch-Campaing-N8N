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
                    displayName: 'Cookies',
                    name: 'cookies',
                    type: 'string',
                    default: '',
                    placeholder: 'Cookies from twitch.com',
                    description: 'Paste here your cookies from twitch or link from a previous variables',
                },
            ],
        };
    }
    async execute() {
        const input = this.getNodeParameter("cookies", 0);
        var result = [];
        for (let i = 0; i <= 3; ++i) {
            result = await new DataFetch_1.DataFetch().fetch(input);
            if (result.length > 0)
                break;
        }
        return [this.helpers.returnJsonArray(result)];
    }
}
exports.TwitchCampaignNode = TwitchCampaignNode;
//# sourceMappingURL=TwitchCampaignNode.node.js.map