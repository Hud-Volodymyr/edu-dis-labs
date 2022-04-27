const { errorHandler } = require('../../../src/utils/errorHandler');

function nextExample (err) {
    return err;
}

const resExample = {
    status (code) {
        return {
            send (error) {
                return { code, error };
            }
        };
    }
};

const reqExample = {};

describe('errorHandler', () => {
    it('should return 520 status code', () => {
        const errorExample = {
            code : 'test',
            message : 'test message',
            errors : []
        };

        const result = errorHandler({ req: reqExample, res: resExample, next: nextExample, error: errorExample });

        expect(result).toMatchObject({
            code  : 520,
            error : {
                code : 'test',
                errorMessage : 'test message',
                errors: []
            }
        });
    });
    it('should return 404 status code (NOT_FOUND)', () => {
        const errorExample = {
            code    : 'NOT_FOUND',
            message : 'Test message',
            errors  : []
        };

        const result = errorHandler({ req: reqExample, res: resExample, next: nextExample, error: errorExample });

        expect(result).toMatchObject({
            code  : 404,
            error : {
                code          : 'NOT_FOUND',
                errorMessage : 'Test message',
                errors: []
            }
        });
    });
    it('should return 422 status code (FORMAT_ERROR)', () => {
        const errorExample = {
            code    : 'FORMAT_ERROR',
            message : 'Test message',
            errors  : []
        };

        const result = errorHandler({ req: reqExample, res: resExample, next: nextExample, error: errorExample });

        expect(result).toMatchObject({
            code  : 422,
            error : {
                code          : 'FORMAT_ERROR',
                errorMessage : 'Test message',
                errors        : []
            }
        });
    });
    it('should return 403 status code (PERMISSION_DENIED)', () => {
        const errorExample = {
            code    : 'PERMISSION_DENIED',
            message : 'Test message',
            errors  : []
        };

        const result = errorHandler({ req: reqExample, res: resExample, next: nextExample, error: errorExample });

        expect(result).toMatchObject({
            code  : 403,
            error : {
                code : 'PERMISSION_DENIED',
                errorMessage : 'Test message',
                errors : []
            }
        });
    });
    it('should return 500 status code (SERVER_ERROR)', () => {
        const errorExample = {
            code    : 'SERVER_ERROR',
            message : 'Test message',
            errors  : []
        };

        const result = errorHandler({ req: reqExample, res: resExample, next: nextExample, error: errorExample });

        expect(result).toMatchObject({
            code  : 500,
            error : {
                code : 'SERVER_ERROR',
                errorMessage : 'Test message',
                errors : []
            }
        });
    });
    it('should return error', () => {
        const errorExample = {
            code    : 'FORMAT_ERROR',
            message : 'Test message',
            errors  : [
                {
                    message : 'test message',
                    uri     : 'test'
                }
            ]
        };

        const result = errorHandler({ req: reqExample, res: resExample, next: nextExample, error: errorExample });

        expect(result).toMatchObject({
            code  : 422,
            error : {
                code : 'FORMAT_ERROR',
                errorMessage : 'Test message',
                errors : [
                    {
                        message : 'test message',
                        uri     : 'test'
                    }
                ]
            }
        });
    });
});
