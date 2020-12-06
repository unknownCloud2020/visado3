const express = require('express');
const rootApp = express();
const newletterApp = express();
const bodyParse = require('body-parser');
const port = process.env.PORT || 8084;
const unqfyCliente = require('../clients/UnqfyClient');
const unqfyClientIntance = new unqfyCliente();

let suscritores = [];


function valid(data, expectedKeys) {
    return Object.keys(expectedKeys).every(key => {
        return (typeof data[key]) === expectedKeys[key];
    });

}

function checkValidInput(data, expectedKeys, res, next) {
    if (!valid(data, expectedKeys)) {
        throw next(new badRequest());
    }
}

function invalidJsonHandler(err, req, res, next) {
    if (err) {
        throw next(new badRequest());
    }
}

function errorHandler(error, req, res, next) {
    const isHandlerError = errors.find(error => error === error);
    if (isHandlerError) {
        res.status(error.status);
        res.json({ status: error.status, errorCode: error.errorCode });
    } else {
        res.status(500);
        res.json({ status: 500, errorCode: "INTERNAL_SERVER_ERROR" });
    }
}


function isSucribe(email) {
    return this.suscritores.any(s => s.email === email);
}

function existentArtist(artistId) {
    return unqfyClientIntance.artist(artistId).id === artistId;
}

function suscribesForArtistId(artistId) {

    if(this.existentArtist(artistId)) {
       const suscritoresFiltrados = this.suscritores.filter(s => s.artistId === artistId);
       return suscritoresFiltrados;
    }
    
}

newletterApp.post('/subscribe', (req, res, next) => {
    checkValidInput(req.body, { artistId: 'number', email: 'string' }, res, next);

    const suscritor = req.body;

    try {
        if (!this.isSucribe(suscritor.email) && this.existentArtist(suscritor.artistId)) {
            this.suscritores.add(suscritor);
        }
    } catch (error) {
        throw error;
    }
});



newletterApp.post('/notify', (req, res, next) => {
    checkValidInput(req.body, { artistId: 'number', email: 'string' }, res, next);
    
    try {  
       this.suscribesForArtistId(req.body.artistId).forEach(s => {  });
        
    } catch(error) {
        throw error;
    }

    res.status(200);
});


newletterApp.post('/unsubscribe', (req, res, next) => {
    const suscritor = req.body;

    checkValidInput(req.body, { artistId: 'number', email: 'string' }, res, next);

    try {
        if(this.isSucribe(suscritor.email) && this.existentArtist(suscritor.artistId)) {
          this.suscritores.unshift(suscritor);
        }
        
    } catch (error) {
        throw error;
    }
    res.status(200).json();
});

newletterApp.get('/subscriptions?artistId=<artistID>', (req, res, next) => {
    const suscritoresFiltrados = []

    try {

        if(this.existentArtist(suscritor.artistId)) {
         suscritoresFiltrados = this.suscritores.filter(s => s.artistId === req.query.artistId);
        }

    } catch(error){
        throw error;
    } 

    res.status(200).json({ artistId: req.query.artistId,
                           subscriptors: suscritoresFiltrados
    });
});


newletterApp.delete('/subscriptions', (req, res, next) => {
     
    checkValidInput(req.body, { artistId: 'number' }, res, next);
      
    try {
        this.suscritores = this.suscribesForArtistId(req.body.artistId).filter(s => { !s.artistId === req.body.artistId});
    } catch(error){
        throw error;
    } 

    res.status(200);
});

rootApp.get('/api/ping', function (req, res) {
    res.status(200);
    res.json("pong");
});

rootApp.use(bodyParse.urlencoded({ extended: true }));
rootApp.use(bodyParse.json());
rootApp.use(invalidJsonHandler);
rootApp.use('/api', newletterApp);

rootApp.use((req, res) => {
    res.status(404);
    res.json({ status: 404, errorCode: 'RESOURCE_NOT_FOUND' });
});

rootApp.use(errorHandler);

rootApp.listen(port, () => console.log('Listening on ' + port));