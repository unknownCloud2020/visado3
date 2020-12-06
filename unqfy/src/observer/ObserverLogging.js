const Observer = require("./Observer");
const logginClient = require('../');
const logginClientIntance = new logginClient();

class ObserverLogging extends Observer {

    ObserverLoggingconstructor() {
        this.uri = { uri: 'http://localhost:8084/api' }
    }

    update(action, artist, album, track) {
        if (action === 'addArtist') {
            logginClientIntance.info('add').then(
                response => response
            ).catch(
                error => error
            )

        }

        if (action === 'addAlbum') {
            logginClientIntance.info('add').then(
                response => response
            ).catch(
                error => error
            )

        }

        if (action === 'addTrack') {
            logginClientIntance.info('add').then(
                response => response
            ).catch(
                error => error
            )

        }


        if (action === 'deleteArtist') {
            logginClientIntance.notifyDeleteArtist(artist).then(
                response => response
            ).catch(
                error => error
            )

        }

        if (action === 'deleteAlbum') {
            logginClientIntance.notifyDeleteArtist(artist).then(
                response => response
            ).catch(
                error => error
            )

        }

        if (action === 'deleteTrack') {
            logginClientIntance.notifyDeleteArtist(artist).then(
                response => response
            ).catch(
                error => error
            )

        }


        //LogginClientInstance.info(`Se ha agregado el artista: ${artist.name}`)
    }
}

module.exports = ObserverLogging;