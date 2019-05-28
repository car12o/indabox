const mongoose = require('mongoose');
const { ifthen } = require('../../config/default.json');
const { getPaymentRef } = require('../services/payment');

const MbReference = mongoose.Schema({
    ententy: { type: String, default: ifthen.ententy },
    subEntety: { type: String, default: ifthen.subEntety },
    value: { type: Number, required: true },
    reference: { type: String, required: true },
    refId: { type: String, required: true },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
}, { timestamps: true });

MbReference.static('generate', value => getPaymentRef(ifthen.ententy, ifthen.subEntety, value));

module.exports = {
    MbReference: mongoose.model('MbReference', MbReference, 'mbReferences'),
};
