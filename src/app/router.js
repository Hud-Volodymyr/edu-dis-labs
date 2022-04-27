const express = require('express');

const router = express.Router();
const controllers = require('../controllers');

module.exports = function init() {
    router.get('/show', controllers.profiles.show);
    router.post('/create', controllers.profiles.create);


    return router;
};

