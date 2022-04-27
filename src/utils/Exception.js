class Exception extends Error {
    constructor({
        message,
        code,
        errors = []
    }) {
        super();
        if (!message) throw new Error('"message" required');

        if (code) this.code = code;
        this.message = message;
        this.errors = errors;
    }
}

module.exports = Exception;