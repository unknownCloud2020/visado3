const Observer = require("./Observer");
const LogginClient = require('../src/clientApi/LogginClient');
const LogginClientInstance = new LogginClient.LogginClient()


class ObserverLogging extends Observer {

    ObserverLoggingconstructor() {
        this. uri = {uri: 'http://localhost:8084/api'}
    }

    update(action, artist, album, track, error){
        switch (action) {
            case 'addArtist':
                LogginClientInstance.info(`Se ha agregado el artista: ${artist.name}`)
                break;
            case 'addAlbum':
                LogginClientInstance.info(`Se ha agregado el album: ${album.name}`)
                break;            
            case 'addTrack':
                LogginClientInstance.info(`Se ha agregado el album: ${track.name}`)
                break;
            case 'exception':
                LogginClientInstance.error(`Se ha producido un error: ${error.message}`)
                break;
            default:
                break;
        }
    }
}

module.exports = ObserverLogging;