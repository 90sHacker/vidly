const morgan = require('morgan');
const debug = require('debug')('app:db');
const winston = require('winston');
const app = require('express')();

require('./startups/routes')(app);
require('./startups/db')();
require('./startups/logger')();
require('./startups/config')();
require('./startups/prod')(app);

// process.on('uncaughtException', (ex) => {
//     console.log('Uncaught Exception');
//     winston.error(ex.message, ex);
// });

// process.on('unhandledRejection', (ex) => {
//     console.log('unhandled rejection');
//     winston.error(ex.message, ex);
// });

// throw new Error('something failed');

// const p = Promise.reject('something failed')
//     .then(() => console.log('done'));

app.set('view engine', 'pug');
app.set('views', './views');

// console.log(`Application name: ${config.get('name')}`);
// console.log(`Application host: ${config.get('mail.host')}`);
// console.log(`Password: ${config.get('mail.password')}`);

if(app.get('env') === "development"){
    app.use(morgan('tiny'));
    debug('Morgan enabled...');
};

const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`listening on port ${port}`));

module.exports = server;