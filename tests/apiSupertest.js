const queryString = require('query-string');
const supertest = require('supertest');
const {
    init,
    start
} = require('../src/app/app');

class ApiSupertest {
    constructor() {
        init();
        const app = start();
        this.request = supertest(app);
    }

    get(endpoint, options = {}, apiPrefix = '/api/v1') {
        const query = options.query
            ? queryString.stringify(options.query)
            : '';

        const result = this.request.get(`${apiPrefix}/${endpoint}?${query}`).set({
            ...options.headers
        });

        return result;
    }

    async post(endpoint, body, options = {}, apiPrefix = '/api/v1') {
        return this.request.post(`${apiPrefix}/${endpoint}`).set({
            ...options.headers
        }).send(body);
    }
}

module.exports = new ApiSupertest();
