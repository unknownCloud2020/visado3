const rp = require('request-promise');

class NewsletterClient {

    constructor() {
        this.BASE_URL = 'http://localhost:8084/api' + '/';
    }

    async notify(artist,album) {

        const options = {
            uri: this.BASE_URL + `notify`,
            json: true,
            body: {
                "artistId": artist.id,
                "subject": `Nuevo Album para artsta ${artist.name}`, 
                "message": `Se ha agregado el album ${album.name} al artista ${artist.name}`
                }
        };
            rp.post(options);
    }

    async notifyDeleteArtist(artist) {
 
        const options = {
            uri: this.BASE_URL + `subscriptions`,
            json: true,
            body: {"artistId": artist.artistId}
        };

        rp.post(options);
    } 


}

module.exports = NewsletterClient;