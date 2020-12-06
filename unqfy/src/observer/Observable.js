
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

    changed(action,artist,album,track) {
        this.subscribers.forEach(s => {s.update(action,artist,album,track)})
    }
}

module.exports = Observable;