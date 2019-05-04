const mongoose = require('mongoose');
const Joi = require('joi');
const { ifthen } = require('../../config/default.json');
const { getPaymentRef } = require('../services/payment');

const MbReference = mongoose.Schema({
    ententy: { type: String, default: ifthen.ententy },
    subEntety: { type: String, default: ifthen.subEntety },
    value: { type: Number, required: true },
    reference: { type: String, required: true },
    refId: { type: String, required: true },
    quotas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quota', required: true }],
}, { timestamps: true });

MbReference.static('generate', value => getPaymentRef(ifthen.ententy, ifthen.subEntety, value));

const mbReferenceSchema = Joi.object().keys({
    ententy: Joi.string(),
    subEntety: Joi.string(),
    value: Joi.number(),
    reference: Joi.string(),
    quota: Joi.array().items(Joi.string()),
});

module.exports = {
    MbReference: mongoose.model('MbReference', MbReference, 'mbReferences'),
    mbReferenceSchema,
};
