const Observer = require("./Observer");
const newletterClient = require('../');
const newletterClientIntance = new newletterClient();

class ObserverNewletter extends Observer {

  constructor() { }

  update(action, artist, album, track) {
    if (action === 'addAlbum') {
      newletterCliente.notify(artist, album).then(
        response => response
      ).catch(
        error => error
      )

    }

    if (action === 'deleteArtist') {
      newletterCliente.notifyDeleteArtist(artist).then(
        response => response
      ).catch(
        error => error
      )

    }



    // endpoint
  }

}

module.exports = ObserverNewletter;









