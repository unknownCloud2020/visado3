class Observer {
  
   constructor() {
    
   } 
    
   update(artist,album,track) {
       throw Error('Override method subclass');
   }
}

module.exports = Observer;