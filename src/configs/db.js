module.exports = {
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