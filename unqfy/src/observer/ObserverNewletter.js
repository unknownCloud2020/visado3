const ClientAPI = require('../client/ClientAPI');
const ClientAPIInstance = new ClientAPI.ClientAPI();

class ObserverNewletter extends Observer {

    constructor() {
       this.uri = 'http://localhost:8084/api'
    }

    update(artist,album,track) {
      ClientAPIInstance.notify(this.uri + '/notify',artist,album).then(
        response => 
    ).catch(
        response => response
    )
      
      // endpoint
    }

}

module.exports = ObserverNewletter;









