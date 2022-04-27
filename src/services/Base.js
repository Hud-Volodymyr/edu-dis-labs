const LIVR = require('livr');

const Exception = require('../utils/Exception');

class Base {
    constructor() {
        this.cachedValidator = null;
    }
    async run(params = {}) {
        const validatedParams = await this.validate(params);

        return this.execute(validatedParams);;
    };

    async execute() {
        throw new Error('This function has not been implemented');
    }

    validate(data) {
        const validator = this.constructor.cachedValidator
            || new LIVR.Validator(this.constructor.validationRules).prepare();

        /* eslint-disable-next-line */
        this.constructor.cachedValidator = validator;

        return this._doValidationWithValidator(data, validator);
    }

    async _doValidationWithValidator(data, validator) {
        const result = validator.validate(data);

        if (!result) {
            const exception = new Exception({ code: 'FORMAT_ERROR', errors: validator.getErrors(), message: 'Validation error' });

            throw exception;
        }

        return result;
    }
}

module.exports = Base;