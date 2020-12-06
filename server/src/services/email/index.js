const {
  sendCreatedUserEmail,
  sendMbCanceledEmail,
  sendMbGeneratedEmail
} = require("./providers/mailgun")

module.exports = {
  sendCreatedUserEmail,
  sendMbCanceledEmail,
  sendMbGeneratedEmail
}
