const app = require("express")()
const helmet = require("helmet")
const cors = require("cors")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const config = require("../config/default.json")
const { assignSession, errorHandler } = require("./middleware")
const { connect } = require("./services/database")
const { cron } = require("./services/cron")
const { initRoot } = require("./user")
const { log } = require("./services/logging")
const { router } = require("./router")

app
  .use(helmet())
  .use(cors())
  .use(bodyParser.json())
  .use(morgan("dev"))
  .use(assignSession)
  .use(router)
  .use(errorHandler)

connect()
  .then(() => {
    log.info("Successfully connected to databases")
    initRoot()
  })
  .catch((error) => log.error(error))

cron.init()

app.listen(process.env.APP_PORT || config.APP_PORT, () => {
  log.info(`Listening and serving HTTP on port: ${process.env.APP_PORT || config.APP_PORT}`)
})
