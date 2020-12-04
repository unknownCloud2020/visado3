const Observer = require("./Observer");

class ObserverLogging extends Observer {

    ObserverLoggingconstructor() {
        this. uri = {uri: 'http://localhost:8084/api'}
    }

    update(artist,album,track){
        //LogginClientInstance.info(`Se ha agregado el artista: ${artist.name}`)
    }
}

module.exports = ObserverLogging;