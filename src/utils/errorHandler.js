function dumpError(error) {
    return {
        code : error.code,
        errors : error.errors,
        errorMessage : error.message || 'Please, contact your system administrator'
    };
}

function errorHandler({ res, error }) {
    const errorDump = dumpError(error);

    switch (errorDump.code) {
        case 'NOT_FOUND':
            return res.status(404).send(errorDump);
        case 'FORMAT_ERROR':
            return res.status(422).send(errorDump);
        case 'PERMISSION_DENIED':
            return res.status(403).send(errorDump);
        case 'SERVER_ERROR':
            return res.status(500).send(errorDump);
        default:
            return res.status(520).send(errorDump);
    }
}

module.exports = {
    errorHandler
}