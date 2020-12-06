// imports
const express = require('express');
const bodyParse = require('body-parser');
const path = require('path');
var methodOverride = require('method-override');
const BadRequestError = require('./BadRequestError');
const port = process.env.PORT || 8086;
const app = express();

let serviceEnable = true;

// configs
var winston = require('winston');
var winlog = require('winston-loggly-bulk');
winston.add(new winlog.Loggly({
    token: "fd403c22-8509-4baf-8ad0-f659c527b137",
    subdomain: "unknownCloud",
    tags: ["Winston-NodeJS"],
    json: true,
    bufferOptions: {
        size: 1000,
        retriesInMilliSeconds: 60 * 1000
    }
}));

var log4js = require("log4js");

var logger = log4js.getLogger();
log4js.configure({
    appenders: { cheese: { type: "file", filename: path.join(__dirname, 'log/cheese.log') } },
    categories: { default: { appenders: ["cheese"], level: "info" } }
});

app.use(bodyParse.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(bodyParse.json());
app.listen(port, () => console.log('Listening on ' + port));

// end points
app.post('/api/log', function (req, res, next) {

    if (serviceEnable) {
        checkValidInput(req.body, { level: 'string', message: 'string', service: 'string' }, res, next);

        logger.level = 'info';
        logger.info(req.body.service);

        logger.level = req.body.level;
        const logAction = builderLogActionByType[req.body.level];
        logAction(req.body.message)

        winston.log('info', req.body.service);
        winston.log(req.body.level, req.body.message);

        res.status(200);
        res.json("ok");
    } else {
        res.status(200)
        res.json("El servicio se encuentra desactivado")
    }
});

app.get('/api/ping', function (req, res) {
    res.status(200);
    res.json("pong");
});

app.post('/api/shutdown', function (req, res) {
    serviceEnable = false;
    res.status(200);
    res.json("Servicio desactivado");
});

app.post('/api/poweron', function (req, res) {
    serviceEnable = true;
    res.status(200);
    res.json("Servicio activado");
});

// functions

const errorAction = msg => logger.error(msg);
const infoAction = msg => logger.info(msg);
const warningAction = msg => logger.warn(msg);
const debugAction = msg => logger.debug(msg);

const builderLogActionByType = {
    'error': errorAction,
    'warning': warningAction,
    'info': infoAction,
    'debug': debugAction
};

function valid(data, expectedKeys) {
    return Object.keys(expectedKeys).every(key => {
        return (typeof data[key]) === expectedKeys[key];
    });

}

function checkValidInput(data, expectedKeys, res, next) {
    if (!valid(data, expectedKeys)) {
        throw next(new BadRequestError());
    }
}

function errorHandler(error, req, res, next) {
    logger.level = 'error'
    logger.error("INTERNAL_SERVER_ERROR");
    winston.log("error", "INTERNAL_SERVER_ERROR");
    winston.log('info', "segunda prueba!");
    res.status(500);
    res.json({ status: 500, errorCode: "INTERNAL_SERVER_ERROR" });
}

app.use(errorHandler);