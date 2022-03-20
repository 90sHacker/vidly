require('winston-mongodb');
const winston = require('winston');
require('express-async-errors');

module.exports = function() {
    winston.exceptions.handle(
        new winston.transports.File({ filename: 'uncaughtExceptions.log'}),
        new winston.transports.Console({ colorize: true, prettyPrint: true}));
       
    winston.add(new winston.transports.Console({ colorize: true, prettyPrint: true}));
    winston.add(new winston.transports.File({filename: 'logfile.log'}));
    winston.add(new winston.transports.MongoDB({ db: 'mongodb://127.0.0.1/vidly'}));
}