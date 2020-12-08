const rp = require('request-promise');
const BASE_URL = process.env.UNQFY_API_HOST + '/';

class UnqfyClient {

    constructor() {
        
    }

    async idArtist(artistId) {
       
        const options = {
            uri: BASE_URL + `artists/${artistId}`,
            json: true,

        };

        return rp.get(options).then(response => {
            return response.id;
        }).catch(error => { throw error });
    }


}

module.exports = UnqfyClient;