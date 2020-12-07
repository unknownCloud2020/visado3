const Observer = require("./Observer");
const newletterClient = require('../clientApi/NewsletterClient');
const newletterClientIntance = new newletterClient();

class ObserverNewletter extends Observer {


  update(action, artist, album, track, error) {
    if (action === 'addAlbum') {
      newletterClientIntance.notify(artist, album).then(
        response => response
      ).catch(
        error => error
      )

    }

    if (action === 'deleteArtist') {
      newletterClientIntance.notifyDeleteArtist(artist).then(
        response => response
      ).catch(
        error => error
      )

    }

  }

}

module.exports = ObserverNewletter;









