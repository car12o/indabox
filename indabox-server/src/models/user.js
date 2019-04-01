const mongoose = require('mongoose');
const Joi = require('joi');
const { hashPassword } = require('../services/crypto');
const { quotaSchema } = require('./quota');

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

const userSchema = Joi.object().keys({
    number: Joi.number().min(0),
    role: Joi.number().min(5),
    type: Joi.string().min(3, 'UTF-8'),
    alerts: Joi.boolean(),
    newsletter: Joi.boolean(),
    firstName: Joi.string().min(3, 'UTF-8'),
    lastName: Joi.string().min(3, 'UTF-8'),
    nif: Joi.string().min(9, 'UTF-8').max(9, 'UTF-8'),
    email: Joi.string().email({ minDomainAtoms: 2 }),
    password: Joi.string().min(9, 'UTF-8'),
    phone1: Joi.string().min(9, 'UTF-8'),
    phone2: Joi.string().min(9, 'UTF-8'),
    mobile: Joi.string().min(9, 'UTF-8'),
    address: Joi.string().min(9, 'UTF-8'),
    postCode: Joi.string().min(4, 'UTF-8'),
    city: Joi.string().min(3, 'UTF-8'),
    country: Joi.string().min(3, 'UTF-8'),
    ballotNumber: Joi.string().min(9, 'UTF-8'),
    specialty: Joi.string().min(9, 'UTF-8'),
    notes: Joi.string(),
    quotas: Joi.array().items(quotaSchema),
});

module.exports = {
    User: mongoose.model('users', User),
    userSchema,
};
