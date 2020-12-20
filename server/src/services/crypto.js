const crypto = require("crypto")

const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString("hex")
  const hash = crypto
    .pbkdf2Sync(password, salt, 2048, 32, "sha512")
    .toString("hex")
  return [salt, hash].join("$")
}

const verifyHash = (password, original) => {
  const [salt, originalHash] = original.split("$")
  const hash = crypto
    .pbkdf2Sync(password, salt, 2048, 32, "sha512")
    .toString("hex")

  return hash === originalHash
}

module.exports = {
  hashPassword,
  verifyHash
}
