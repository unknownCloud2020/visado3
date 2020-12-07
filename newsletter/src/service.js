const express = require('express');
const rootApp = express();
const newletterApp = express();
const bodyParse = require('body-parser');
const port = process.env.PORT || 8084;
const unqfyCliente = require('../clients/UnqfyClient');
const unqfyClientIntance = new unqfyCliente();
const GMailAPIClient = require('../clients/GMailAPIClient');
const gmailClient = new GMailAPIClient();

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
    //const isHandlerError = errors.find(error => error === error);
    //if (isHandlerError) {
     //   res.status(error.status);
      //  res.json({ status: error.status, errorCode: error.errorCode });
   // } else {
        res.status(500);
        res.json({ status: 500, errorCode: "INTERNAL_SERVER_ERROR" });
    //}
}


function isSucribe(email) {
    return suscritores.some(s => s.email === email);
}

async function existentArtist(artistId) {
    return await unqfyClientIntance.idArtist(artistId) === artistId;
}


function send_mail(body,email) {
    console.log(body,email)
    gmailClient.send_mail(
        body.subject,
        [
            body.message
        ],
        {
            "email": email,
        },
        {
            "name": "Unqfy Neswsletter",
            "email": "unqfyNewsletter@gmail.com",
        }
    ).then((gmailResponse) => {
        console.log("Mail enviado!");
        console.log(gmailResponse);
    }).catch((error) => {
        console.error("Algo salió mal");
        console.error(error);
    })
}

newletterApp.post('/subscribe', async (req, res, next) => {
    checkValidInput(req.body, { artistId: 'number', email: 'string' }, res, next);

    const suscritor = req.body;
    
    try {
        if (!isSucribe(suscritor.email) && await existentArtist(suscritor.artistId)) {
            suscritores.push(suscritor);
            
        }
    } catch (error) {
        throw error;
    }
    res.status(200);
    res.send();
});


newletterApp.post('/notify', async(req, res, next) => {
    //checkValidInput(req.body, { artistId: 'number', email: 'string' }, res, next);

    try {
        let suscritoresFiltrados = [];
        if (await existentArtist(req.body.artistId)) {
          suscritoresFiltrados = suscritores.filter(s => s.artistId === req.body.artistId); 
        }
    
       await suscritoresFiltrados.forEach(s => { send_mail(req.body,s.email) });

    } catch (error) {
        throw error;
    }

    res.status(200)
    res.send();
});


newletterApp.post('/unsubscribe', async (req, res, next) => {
    const suscritor = req.body;

    //checkValidInput(req.body, { artistId: 'number', email: 'string' }, res, next);


    try {
        if (isSucribe(suscritor.email) && await existentArtist(suscritor.artistId)) {
            const index = suscritores.findIndex(s => s.artistId === suscritor.artistId);
            suscritores.splice(index, 1,suscritor);
        }
        console.log(suscritores);

    } catch (error) {
        throw error;
    }
    res.status(200);
    res.send();
});

newletterApp.get('/subscriptions', async (req, res, next) => {
    const suscritoresFiltrados = []
    console.log(req.query)
    try {

        if (await existentArtist(req.query.artistId)) {
          suscritoresFiltrados = suscritores.filter(s => s.artistId === req.query.artistId); 
        }

    } catch (error) {
        throw error;
    }

    res.status(200).json( {
        "artistId": req.query.artistId,
        "subscriptors": suscritoresFiltrados
      })
});


newletterApp.delete('/subscriptions', (req, res, next) => {

    checkValidInput(req.body, { artistId: 'number' }, res, next);

    try {
        suscritores = suscribesForArtistId(req.body.artistId).filter(s => { !s.artistId === req.body.artistId });
    } catch (error) {
        throw error;
    }

    res.status(200);
    res.send();
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