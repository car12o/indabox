const {
  sendCreatedUserEmail,
  sendMbCanceledEmail,
  sendMbGeneratedEmail
} = require("./providers/gmail")

module.exports = {
  sendCreatedUserEmail,
  sendMbCanceledEmail,
  sendMbGeneratedEmail
}
