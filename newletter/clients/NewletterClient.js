const rp = require('request-promise');

class NewletterClient {

    constructor() {
        this.BASE_URL = 'http://localhost:8085/api/';
    }

    async notify(artist,album) {

        const options = {
            uri: this.BASE_URL + `notify`,
            json: true,
            body: {
                "artistId": artist.artistId,
                "subject": `Nuevo Album para artsta ${artist.name}`, 
                "message": `Se ha agregado el album ${album.name} al artista ${artist.name}`
                }
        };

        return rp.post(this.options).then(response => {
            return response;
        }).catch(error => { throw error });
    }

    async notifyDeleteArtist(artist) {
 
        const options = {
            uri: this.BASE_URL + `subscriptions`,
            json: true,
            body: {"artistId": artist.artistId}
        };

        return rp.delete(this.options).then(response => {
            return response;
        }).catch(error => { throw error });
    } 


}

module.exports = UnqfyClient;