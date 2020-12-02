
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

    changed(artist,album) {
        this.subscribers.forEach(s => {s.update(artist,album)})
    }
}

module.exports = Observable;