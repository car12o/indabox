const mongoose = require('mongoose');
const Joi = require('joi');
const _ = require('lodash/fp');

const paymentStatus = {
    canceled: {
        label: 'Cancelado',
        value: 2,
    },
    paid: {
        label: 'Pago',
        value: 1,
    },
    unpaid: {
        label: 'Não pago',
        value: 0,
    },
};

const paymentTypes = {
    imported: 'Importado',
    manual: 'Manual',
    mbReference: 'Referencia MB',
};

const Payment = mongoose.Schema({
    quotas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quota', required: true }],
    status: {
        label: { type: String, default: paymentStatus.unpaid.label },
        value: { type: Number, default: paymentStatus.unpaid.value },
    },
    value: { type: Number, default: 0 },
    type: { type: String, required: true },
    mbReference: { type: mongoose.Schema.Types.ObjectId, ref: 'MbReference', default: null },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
}, { timestamps: true });

const paymentSchema = Joi.object().keys({
    quotas: Joi.array().items(Joi.string()),
    status: Joi.object().keys({
        label: Joi.string().allow(_.transform((accm, value) => {
            accm.push(value.label);
            return accm;
        }, [], paymentStatus)),
        value: Joi.string().allow(_.transform((accm, value) => {
            accm.push(value.value);
            return accm;
        }, [], paymentStatus)),
    }),
    value: Joi.number(),
    type: Joi.string().allow(_.transform((accm, value) => {
        accm.push(value);
        return accm;
    }, [], paymentTypes)),
    mbReference: Joi.string(),
});

module.exports = {
    Payment: mongoose.model('Payment', Payment, 'payments'),
    paymentSchema,
    paymentStatus,
    paymentTypes,
};
