const mongoose = require('mongoose');

const User = mongoose.Schema({
    number: { type: Number },
    role: { type: Number, default: 10 },
    type: { type: String, default: 'Sócio Titular' },
    alerts: { type: Boolean, default: false },
    newsletter: { type: Boolean, default: false },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    nif: { type: String, unique: true, default: '' },
    email: { type: String, unique: true, default: '' },
    password: { type: String, default: '654321' },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    postCode: { type: String, default: '' },
    city: { type: String, default: '' },
    country: { type: String, default: '' },
    notes: { type: String, default: '' },
    quotas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'quotas', default: null }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', default: null },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', default: null },
    deletedBy: { type: String, default: null },
    deletedAt: { type: Date, default: null },
}, { timestamps: true });

module.exports = mongoose.model('users', User);
