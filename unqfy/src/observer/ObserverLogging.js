const Observer = require("./Observer");
const LogginClient = require('../clientApi/LogginClient');
const LogginClientInstance = new LogginClient.LogginClient()

class ObserverLogging extends Observer {

    update(action, artist, album, track, error){
        switch (action) {
            case 'addArtist':
                LogginClientInstance.info(`Se ha agregado el artista: ${artist.name}`);
                break;
            case 'addAlbum':
                LogginClientInstance.info(`Se ha agregado el album: ${album.name}`);       
                break;
            case 'addTrack':
                LogginClientInstance.info(`Se ha agregado el track: ${track.name}`);
                break;
            case 'deleteArtist':
                LogginClientInstance.info(`Se ha eliminado el artista: ${artist.name}`);
                break;
            case 'deleteAlbum':
                LogginClientInstance.info(`Se ha eliminado el album: ${album.name}`);
                break;
            case 'deleteTrack':
                LogginClientInstance.info(`Se ha eliminado el track: ${track.name}`);
                break;
            case 'exception':
                LogginClientInstance.error(`Se ha producido un error: ${error.message}`);
                break;
            default:
                break;
        }
    }
}

module.exports = ObserverLogging;