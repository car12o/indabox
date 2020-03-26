const { createValidator } = require("express-joi-validation")

module.exports = {
  validator: createValidator({ passError: true })
}
