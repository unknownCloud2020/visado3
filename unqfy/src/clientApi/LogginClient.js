const rp = require('request-promise');
const BASE_URL = process.env.LOGGIN_API_HOST + '/log';

class LogginClient {
    constructor() {
        this.options = this.getOptionsRequest();
    }

    getOptionsRequest() {
        const options = {
            uri: BASE_URL,
            json: true
        };
        return options;
    }

    async info(message) {
        this.options.body = { message: message, level: 'info', service: 'unqfy' };
        rp.post(this.options).then(succes => {
            
        }).catch(error => console.log(error));
    }

    async error(message) {
        this.options.body = { message: message, level: 'error', service: 'unqfy' };
        rp.post(this.options);
    }

    async debug(message) {
        this.options.body = { message: message, level: 'debug', service: 'unqfy' };
        rp.post(this.options);
    }
}

module.exports = {
    LogginClient: LogginClient,
};