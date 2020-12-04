const rp = require('request-promise');

class ClientDiscordHook {
    constructor() {
        this.options = this.getOptionsRequest();
    }

    getOptionsRequest() {
        const options = {
            uri: 'https://discord.com/api/webhooks/783469862768738324/z0PnvbeLwU7olSaP58FqMzWBNgP2aulMtNdqPGpgLhmyAaN38oGRMu4Ut8FP_RbaO1Zs',
            json: true,
            body: null
        };
        return options;
    }

    notify(message) {
        this.options.body = { content: message};
        rp.post(this.options)
    }
}

module.exports = {
    ClientDiscordHook: ClientDiscordHook,
};