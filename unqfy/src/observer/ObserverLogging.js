const Observer = require("./Observer");

class ObserverLogging extends Observer {

    ObserverLoggingconstructor() {
        this. uri = {uri: 'http://localhost:8084/api'}
    }

    update(artist,album,track){
        
    }
}

module.exports = ObserverLogging;