const {
  sendCreatedUserEmail,
  sendMbCanceledEmail,
  sendMbGeneratedEmail
} = require("./providers/smtp")

module.exports = {
  sendCreatedUserEmail,
  sendMbCanceledEmail,
  sendMbGeneratedEmail
}
