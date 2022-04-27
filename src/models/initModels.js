const Sequelize = require('sequelize');
const Profile = require('./Profile');
const config = require('../configs/db');

function initializeModels() {
    const {
        database,
        username,
        password,
        host,
        port,
        dialect,
        pool,
        logging
    } = config[process.env.NODE_ENV || 'dev'];
    const models = {
        Profile
    };
    const sequelize = new Sequelize(database, username, password, {
        host,
        port,
        dialect,
        pool,
        logging
    });

    Object.values(models).forEach(model => model.init(sequelize, {
        createdAt: 'created', updatedAt: 'updated'
    }));

    return {
        ...models,
        sequelize
    }
}

module.exports = initializeModels;