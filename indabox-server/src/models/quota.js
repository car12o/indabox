const mongoose = require('mongoose');
const Joi = require('joi');

const Quota = mongoose.Schema({
    year: { type: Number },
    state: {
        value: { type: String, default: 'Unpaid' },
        payment: { type: mongoose.Schema.Types.ObjectId, ref: 'payments', default: null },
    },
    value: { type: Number, default: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    invoiceEmited: { type: Boolean, default: false },
}, { timestamps: true });

const QuotaSchema = Joi.object().keys({
    year: Joi.Number().min(2015),
    state: Joi.object().keys({
        value: Joi.String(),
        payment: Joi.String().allow(['Unpaid', 'Paid']),
    }),
    value: Joi.Number(),
    user: Joi.String(),
    invoiceEmited: Joi.Boolean(),
});

module.exports = mongoose.model('quotas', Quota);
module.exports.QuotaSchema = QuotaSchema;
