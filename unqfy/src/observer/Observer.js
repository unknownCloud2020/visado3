class Observer {
  
   constructor() {
    
   } 
    
   update(artist,album) {
       throw Error('Override method subclass');
   }
}

module.exports = Observer;