const {
  sendCreatedUserEmail,
  sendMbCanceledEmail,
  sendMbGeneratedEmail,
  sendUserPwChangeEmail
} = require("./providers/smtp")

module.exports = {
  sendCreatedUserEmail,
  sendMbCanceledEmail,
  sendMbGeneratedEmail,
  sendUserPwChangeEmail
}
