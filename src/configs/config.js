const ENV = process.env;

module.exports = {
    appPort : ENV.APP_PORT || 3100,
    isSecure : ENV.IS_SECURE || 0,
    expireTime: 4000000, // 40 seconds
    db : {
        port : 3306,
        username : 'myUser',
        password : 'strongPassword',
        database : 'signatureDb',
        host : 'localhost',
        dialect : 'mysql',
        pool : {
            min : 5,
            max : 50,
            idle : 10000,
            acquire : 120000
        },
        logging : false
    }
}
