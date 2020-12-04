
class Observable {

    constructor() {
        this.subscribers = []
    }

    addSubscribe(service) {
         this.subscribers.push(service);
    }
    
    unsubscriber(service) {
        this.subscribers.shift(service);
    }

    changed(artist,album,track) {
        this.subscribers.forEach(s => {s.update(artist,album,track)})
    }
}

module.exports = Observable;