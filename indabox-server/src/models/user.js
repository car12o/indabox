const mongoose = require('mongoose');
const { hashPassword } = require('../services/crypto');

const User = mongoose.Schema({
    number: { type: Number, default: 0 },
    role: { type: Number, default: 10 },
    type: { type: String, default: 'Sócio Titular' },
    alerts: { type: Boolean, default: false },
    newsletter: { type: Boolean, default: false },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    nif: { type: String, default: '' },
    email: { type: String, default: '' },
    password: { type: String, default: () => hashPassword('12345'), selected: false },
    phone1: { type: String, default: '' },
    phone2: { type: String, default: '' },
    mobile: { type: String, default: '' },
    address: { type: String, default: '' },
    postCode: { type: String, default: '' },
    city: { type: String, default: '' },
    country: { type: String, default: 'Portugal' },
    ballotNumber: { type: String, default: '' },
    specialty: { type: String, default: '' },
    notes: { type: String, default: '' },
    quotas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'quotas', default: null }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', default: null },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', default: null },
    deletedBy: { type: String, default: null },
    deletedAt: { type: Date, default: null },
}, { timestamps: true });

module.exports = mongoose.model('users', User);
