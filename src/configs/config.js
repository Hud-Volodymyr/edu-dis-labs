const ENV = process.env;

module.exports = {
    appPort : ENV.APP_PORT || 3100,
    isSecure : ENV.IS_SECURE || 0,
    expireTime : ENV.NONCE_EXPIRE || 4000, // 4 seconds
}
