const rp = require('request-promise');

class UnqfyClient {

    constructor() {
        this.BASE_URL = 'http://localhost:8084/api/';
    }

    async artist(artistId) {

        const options = {
            uri: this.BASE_URL + `artists/:${artistId}`,
            json: true
        };

        return rp.get(this.options).then(response => {
            return response;
        }).catch(error => { throw error });
    }

    async notify(artistId) {

        const options = {
            uri: this.BASE_URL + `artists/:${artistId}`,
            json: true
        };

        return rp.get(this.options).then(response => {
            return response;
        }).catch(error => { throw error });
    }

    async notifyDeleteArtist(artistId) {

        const options = {
            uri: this.BASE_URL + `artists/:${artistId}`,
            json: true
        };

        return rp.get(this.options).then(response => {
            return response;
        }).catch(error => { throw error });
    } 


}

module.exports = UnqfyClient;