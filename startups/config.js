const config = require('config');

module.exports = function() {
    if (!config.get('jwtPrivateKey')) {
        throw new Error("FATAL ERROR: Missing jwtPrivateKey"); //throw error object not string to see stack trace
    }
}