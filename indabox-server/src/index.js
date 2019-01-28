const app = require('express')();
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('./services/logging');
// const db = require('./services/database');
const router = require('./router');
const { port, database } = require('../config/default.json');

// Security ...
app.use(helmet());
app.use(cors());

// Logging ...
global.log = logger;
app.use(morgan('dev'));

// Database ...
// db.connect(database)
//     .then(() => log.info('Successfully connected to mongo'))
//     .catch(e => log.error(e));

// Routes ...
app.use(router);

app.listen(port || 8080, () => {
    log.info(`Listening and serving HTTP on port: ${port}`);
});
