/**
 * Module dependencies.
 */
const connect = require('connect');
const serveStatic = require('serve-static');

/**
 * Create a connect app.
 */

const app = connect();

/**
 * Handle static files.
 */

app.use(serveStatic(__dirname + '/website'));

/**
 * Listen.
 */

app.listen(3000);
