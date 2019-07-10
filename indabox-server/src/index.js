const app = require('express')();
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('./services/logging');
const { mongo, redis } = require('./services/database');
const Auth = require('./middleware/auth');
const router = require('./routes/router');
const { port, database } = require('../config/default.json');

// Security ...
app.use(helmet());
app.use(cors());

// BodyParser ...
app.use(bodyParser.json());

// Logging ...
log = logger;
app.use(morgan('dev'));

// Database ...
mongo.connect(database.mongo)
    .then(() => log.info('Successfully connected to mongo'))
    .catch(e => log.error(e));

redis.connect(database.redis);

// Middleware
app.use(Auth.handleToken);

// Routes ...
app.use(router);

app.listen(port || 8080, () => {
    log.info(`Listening and serving HTTP on port: ${port}`);
});
