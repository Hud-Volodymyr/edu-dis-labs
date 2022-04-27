const models = require('../../src/models');

module.exports = async function truncate(excludedModels = []) {
    for (const modelName in models) {
        if (!modelName) continue;
        if (excludedModels.includes(modelName)) continue;
        if (models[modelName].destroy) {
            await models[modelName].destroy({ where: {}, force: true });
        }
    }
};
