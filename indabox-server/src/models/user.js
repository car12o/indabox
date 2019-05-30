const mongoose = require('mongoose');
const Joi = require('joi');
const { hashPassword } = require('../services/crypto');

const userRoles = {
    root: {
        label: 'root',
        value: 0,
    },
    admin: {
        label: 'admin',
        value: 10,
    },
    holder: {
        label: 'Sócio Titular',
        value: 30,
    },
};

const userTitle = [
    'Dr.',
    'Dra.',
];

const userCountries = [
    'Portugal',
    'Inglaterra',
    'França',
    'Alemannha',
    'Espanha',
];

const User = mongoose.Schema({
    role: {
        label: { type: String, default: userRoles.holder.label },
        value: { type: Number, default: userRoles.holder.value },
    },
    number: { type: Number, default: 0 },
    title: { type: String, default: userTitle[0] },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    nif: { type: String, default: '' },
    email: { type: String, default: '' },
    password: { type: String, default: () => hashPassword('123456') },
    ballotNumber: { type: String, default: '' },
    specialty: { type: String, default: '' },
    specialtySessions: { type: String, default: '' },
    newsletter: { type: Boolean, default: false },
    alerts: { type: Boolean, default: false },
    address: {
        road: { type: String, default: '' },
        postCode: { type: String, default: '' },
        city: { type: String, default: '' },
        country: { type: String, default: '' },
    },
    phone: { type: String, default: '' },
    mobile: { type: String, default: '' },
    billing: {
        name: { type: String, default: '' },
        nif: { type: String, default: '' },
        address: {
            road: { type: String, default: '' },
            postCode: { type: String, default: '' },
            city: { type: String, default: '' },
            country: { type: String, default: '' },
        },
    },
    notes: { type: String, default: '' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    deletedBy: { type: String, default: null },
    deletedAt: { type: Date, default: null },
    quotas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quota', default: null }],
    payments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Payment', default: null }],
}, { timestamps: true });

const userSchema = Joi.object().keys({
    role: Joi.number().valid(userRoles.admin.value, userRoles.holder.value),
    number: Joi.number().min(0),
    title: Joi.string().valid(...userTitle),
    firstName: Joi.string().min(3, 'UTF-8'),
    lastName: Joi.string().min(3, 'UTF-8'),
    nif: Joi.string().min(9, 'UTF-8').max(9, 'UTF-8'),
    email: Joi.string().email({ minDomainAtoms: 2 }),
    password: Joi.string().min(6, 'UTF-8'),
    ballotNumber: Joi.string().min(6, 'UTF-8'),
    specialty: Joi.string().min(3, 'UTF-8'),
    specialtySessions: Joi.string().min(3, 'UTF-8'),
    newsletter: Joi.boolean(),
    alerts: Joi.boolean(),
    address: {
        road: Joi.string().min(3, 'UTF-8'),
        postCode: Joi.string().min(4, 'UTF-8'),
        city: Joi.string().min(3, 'UTF-8'),
        country: Joi.string().valid(...userCountries),
    },
    phone: Joi.string().min(9, 'UTF-8'),
    mobile: Joi.string().min(9, 'UTF-8'),
    billing: {
        name: Joi.string().min(3, 'UTF-8'),
        nif: Joi.string().min(9, 'UTF-8').max(9, 'UTF-8'),
        address: {
            road: Joi.string().min(3, 'UTF-8'),
            postCode: Joi.string().min(4, 'UTF-8'),
            city: Joi.string().min(3, 'UTF-8'),
            country: Joi.string().valid(...userCountries),
        },
    },
    notes: Joi.string(),
});

module.exports = {
    User: mongoose.model('User', User, 'users'),
    userSchema,
    userRoles,
    userTitle,
    userCountries,
};
