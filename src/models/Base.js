const Sequelize = require('sequelize');

class Base extends Sequelize.Model {
    static init(sequelize, options = {}) {
        super.init(this.schema(), { ...options, sequelize });
    }
}

module.exports = Base;
