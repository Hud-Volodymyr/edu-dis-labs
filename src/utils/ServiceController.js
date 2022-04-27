const { errorHandler } = require('./errorHandler');

function defaultReponse(req, res, next, result) {
    res.send(result);
}

module.exports = function ServiceController(serviceClass, params, response = defaultReponse) {
    return async (req, res, next) => {
        let data;


        if (params && typeof params === 'function') {
            data = params(req);
        } else {
            data = {};
        }

        const service = new serviceClass();

        try {
            const result = await service.run(data);

            return response(req, res, next, result);
        } catch (error) {
            return errorHandler({ req, res, next, error });
        }
    }
}