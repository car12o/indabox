const app = require("express")()
const helmet = require("helmet")
const cors = require("cors")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const logger = require("./services/logging")
const { mongo, redis } = require("./services/database/database")
const Auth = require("./middleware/auth")
const router = require("./routes/router")
const config = require("../config/default.json")

// Security ...
app.use(helmet())
app.use(cors())

// BodyParser ...
app.use(bodyParser.json())

// Logging ...
log = logger
app.use(morgan("dev"))

// Database ...
mongo.connect(config)
  .then(() => log.info("Successfully connected to mongo"))
  .catch(() => log.error("Failed to connect to mongo"))

redis.connect(config)

// Middleware
app.use(Auth.handleToken)

// Routes ...
app.use(router)

app.listen(process.env.APP_PORT || config.APP_PORT, () => {
  log.info(`Listening and serving HTTP on port: ${process.env.APP_PORT || config.APP_PORT}`)
})
