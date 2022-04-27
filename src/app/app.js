const express = require('express');
const router = require('./router');
const secureApp = require('https');
const helpers = require('../utils/functions');
const { promisify } = require('util');
const {
    isSecure,
    appPort
} = require('../configs/config');
const fs = require('fs');
require('../models');

const app = express();

let server = null;

function init() {
    app.use(helpers.urlencoded);
    app.use(helpers.json);
    app.use(helpers.cors);
    app.use('/api/v1', router());
    
    return app
}

function start() {
    const securedApp = isSecure ? secure(app) : app;

    server = securedApp.listen(appPort, () => {});

    server.shutdown = promisify(server.close);
}

function secure(httpsApp) {
    const httpsOptions = {
        key  : fs.readFileSync('./certs/localhost-key.pem'),
        cert : fs.readFileSync('./certs/localhost.pem')
    };

    return secureApp.createServer(httpsOptions, httpsApp);
}

module.exports = {
    init,
    async stop() {
        if (!server) return;

        await server.shutdown();
    },
    start
}