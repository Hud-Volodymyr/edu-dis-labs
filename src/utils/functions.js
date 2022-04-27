const express = require('express');
const cors = require('cors');

module.exports = {
    urlencoded : express.urlencoded({ extended: true }),
    cors       : cors({ origin: true, credentials: true }),
    json       : express.json(),
};
