const fp = require('lodash/fp');
const mongoose = require('mongoose');
const Joi = require('joi');
const { hashPassword } = require('../services/crypto');

const userRoles = {
    root: {
        label: 'Root',
        value: 0,
    },
    admin: {
        label: 'Admin',
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
        active: { type: Boolean, default: false },
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

User.static('fetch', function fetch(_id) {
    return this.findOne({ _id })
        .select('-password')
        .populate([
            {
                path: 'quotas',
                select: '-user',
                populate: {
                    path: 'payment',
                    select: ['status', 'createdAt', 'paymentDate'],
                },
            },
            {
                path: 'payments',
                select: '-user',
                match: { deletedAt: null },
                options: { sort: { updatedAt: -1 } },
                populate: [
                    {
                        path: 'quotas',
                        select: 'year',
                    },
                    {
                        path: 'mbReference',
                        select: '-refId',
                    },
                    {
                        path: 'createdBy',
                        select: 'firstName',
                    },
                    {
                        path: 'updatedBy',
                        select: 'firstName',
                    },
                ],
            },
            {
                path: 'createdBy',
                select: 'firstName',
            },
            {
                path: 'updatedBy',
                select: 'firstName',
            },
            {
                path: 'deletedBy',
                select: 'firstName',
            },
        ]);
});

User.static('patch', function patch(_id, user) {
    return this.findOneAndUpdate(
        { _id },
        user,
        { new: true },
    ).select('-password')
        .populate([
            {
                path: 'quotas',
                select: '-user',
                populate: {
                    path: 'payment',
                    select: ['status', 'updatedAt'],
                },
            },
            {
                path: 'payments',
                select: '-user',
                match: { deletedAt: null },
                populate: [
                    {
                        path: 'quotas',
                        select: 'year',
                    },
                    {
                        path: 'mbReference',
                        select: '-refId',
                    },
                    {
                        path: 'createdBy',
                        select: 'firstName',
                    },
                    {
                        path: 'updatedBy',
                        select: 'firstName',
                    },
                ],
            },
            {
                path: 'createdBy',
                select: 'firstName',
            },
            {
                path: 'updatedBy',
                select: 'firstName',
            },
            {
                path: 'deletedBy',
                select: 'firstName',
            },
        ]);
});

const userSchema = Joi.object().keys({
    role: Joi.object().keys({
        label: Joi.string().valid(...fp.transform((accum, v) => accum.push(v.label), [], userRoles)),
        value: Joi.number().valid(...fp.transform((accum, v) => accum.push(v.value), [], userRoles)),
    }),
    number: Joi.number().min(0),
    title: Joi.string().valid(...userTitle),
    firstName: Joi.string().min(3, 'UTF-8').allow(''),
    lastName: Joi.string().min(3, 'UTF-8').allow(''),
    nif: Joi.string().min(9, 'UTF-8').max(9, 'UTF-8').allow(''),
    email: Joi.string().email({ minDomainAtoms: 2 }).allow(''),
    password: Joi.string().min(6, 'UTF-8').allow(''),
    rePassword: Joi.string().min(6, 'UTF-8').when('password', {
        is: Joi.exist(),
        then: Joi.ref('password'),
        otherwise: Joi.allow(''),
    }).options({ language: { any: { allowOnly: '!!Passwords do not match' } } }),
    ballotNumber: Joi.string().min(6, 'UTF-8').allow(''),
    specialty: Joi.string().min(3, 'UTF-8').allow(''),
    specialtySessions: Joi.string().min(3, 'UTF-8').allow(''),
    newsletter: Joi.boolean(),
    alerts: Joi.boolean(),
    address: {
        road: Joi.string().min(3, 'UTF-8').allow(''),
        postCode: Joi.string().min(4, 'UTF-8').allow(''),
        city: Joi.string().min(3, 'UTF-8').allow(''),
        country: Joi.string().valid(...userCountries).allow(''),
    },
    phone: Joi.string().min(9, 'UTF-8').allow(''),
    mobile: Joi.string().min(9, 'UTF-8').allow(''),
    billing: {
        name: Joi.string().min(3, 'UTF-8').allow(''),
        nif: Joi.string().min(9, 'UTF-8').max(9, 'UTF-8').allow(''),
        active: Joi.boolean(),
        address: {
            road: Joi.string().min(3, 'UTF-8').allow(''),
            postCode: Joi.string().min(4, 'UTF-8').allow(''),
            city: Joi.string().min(3, 'UTF-8').allow(''),
            country: Joi.string().valid(...userCountries).allow(''),
        },
    },
    notes: Joi.string().allow(''),
});

const userCreateSchema = Joi.object().keys({
    role: Joi.string().valid(...fp.transform((accum, v) => accum.push(v.label), [], userRoles)).required(),
    firstName: Joi.string().min(3, 'UTF-8').required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().min(6, 'UTF-8').required(),
    rePassword: Joi.string().min(6, 'UTF-8').required().valid(Joi.ref('password'))
        .options({ language: { any: { allowOnly: '!!Passwords do not match' } } }),
});

module.exports = {
    User: mongoose.model('User', User, 'users'),
    userSchema,
    userCreateSchema,
    userRoles,
    userTitle,
    userCountries,
};
