const ServiceController = require('../utils/ServiceController');
const ShowProfile = require('../services/profiles/Show');
const CreateProfile = require('../services/profiles/Create');

module.exports = {
    show: ServiceController(ShowProfile, req => {
        const headers = req.headers;

        return {
            nonce : headers['nonce'],
            signature : headers['signature'],
            publicKey : headers['publickey']
        };
    }),
    create: ServiceController(CreateProfile, req => ({ ...req.body }))
};
