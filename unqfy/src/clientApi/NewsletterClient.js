const rp = require('request-promise');

class NewsletterClient {

    constructor() {
        this.BASE_URL = process.env.NEWSLETTER_API_HOST + '/';
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
            rp.post(options).catch(er => console.log(er));
    }

    async notifyDeleteArtist(artistId) {
 
        const options = {
            uri: this.BASE_URL + `subscriptions`,
            json: true,
            body: {"artistId": artistId}
        };

        rp.delete(options).catch(error => console.log(error));
    } 


}

module.exports = NewsletterClient;