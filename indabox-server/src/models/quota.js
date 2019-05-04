const mongoose = require('mongoose');
const Joi = require('joi');

const Quota = mongoose.Schema({
    year: { type: Number, required: true },
    value: { type: Number, default: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', default: null },
    invoiceEmited: { type: Boolean, default: false },
}, { timestamps: true });

const quotaSchema = Joi.object().keys({
    year: Joi.number(),
    value: Joi.number(),
    user: Joi.string(),
    payment: Joi.string(),
    invoiceEmited: Joi.boolean(),
});

module.exports = {
    Quota: mongoose.model('Quota', Quota, 'quotas'),
    quotaSchema,
};
