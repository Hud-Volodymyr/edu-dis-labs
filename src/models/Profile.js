const { DataTypes: DT } = require('sequelize');
const Base              = require('./Base');

class Profile extends Base {
    static schema() {
        return {
            id        : { type: DT.UUID, defaultValue: DT.UUIDV4, primaryKey: true, unique: true },
            publicKey : { type: DT.STRING, allowNUll: false, unique: true },
            name      : { type: DT.STRING, allowNUll: true },
            lastName  : { type: DT.STRING, allowNUll: true },
            email     : { type: DT.STRING, allowNUll: true },
            created   : { type: DT.DATE, allowNull: false },
            updated   : { type: DT.DATE, allowNull: false }
        };
    }
}

module.exports = Profile;
