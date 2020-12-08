const Observer = require("./Observer");
const newletterClient = require('../clientApi/NewsletterClient');
const newletterClientIntance = new newletterClient();

class ObserverNewletter extends Observer {


  update(action, artist, album, track, error) {

    switch (action) {
      case 'addAlbum':
        newletterClientIntance.notify(artist, album);
        break;
      case 'deleteArtist':
        newletterClientIntance.notifyDeleteArtist(artist);
        break;
    }
  }

}

module.exports = ObserverNewletter;









