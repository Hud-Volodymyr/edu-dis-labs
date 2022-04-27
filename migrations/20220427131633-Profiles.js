'use strict';

module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('Profiles', {
            id        : { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true, unique: true },
            publicKey : { type: Sequelize.STRING, allowNUll: false, unique: true },
            name      : { type: Sequelize.STRING, allowNUll: true },
            lastName  : { type: Sequelize.STRING, allowNUll: true },
            email     : { type: Sequelize.STRING, allowNUll: true },
            created   : { type: Sequelize.DATE, allowNull: false },
            updated   : { type: Sequelize.DATE, allowNull: false }
        });
  },

    async down (queryInterface) {
        await queryInterface.dropTable('Profiles');
    }
};
