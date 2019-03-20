const crypto = require('crypto');

/**
 * hashPassword
 * @param {string} password
 */
function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
        .pbkdf2Sync(password, salt, 2048, 32, 'sha512')
        .toString('hex');
    return [salt, hash].join('$');
}

/**
 * verifyHash ...
 * @param {string} password
 * @param {string} original
 */
function verifyHash(password, original) {
    const originalHash = original.split('$')[1];
    const salt = original.split('$')[0];
    const hash = crypto
        .pbkdf2Sync(password, salt, 2048, 32, 'sha512')
        .toString('hex');

    return hash === originalHash;
}

module.exports = { hashPassword, verifyHash };