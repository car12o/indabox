const mongoose = require('mongoose');

const User = mongoose.Schema({
    email: { type: String, unique: true },
    nif: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
    number: { type: Number, default: 1 },
    role: { type: String, default: 'admin' },
});

module.exports = mongoose.model('users', User);
