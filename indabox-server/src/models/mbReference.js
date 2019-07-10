const mongoose = require('mongoose');
const { getPaymentRef } = require('../services/payment');
const APIError = require('../services/error');

const { IFTHEN_ENTETY, IFTHEN_SUBENTETY } = process.env;

const MbReference = mongoose.Schema({
    ententy: { type: String, default: IFTHEN_ENTETY },
    subEntety: { type: String, default: IFTHEN_SUBENTETY },
    value: { type: Number, required: true },
    reference: { type: String, required: true },
    refId: { type: String, required: true },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
}, { timestamps: true });

MbReference.static('generate', (value) => {
    if (IFTHEN_ENTETY === '' || IFTHEN_SUBENTETY === '') {
        throw new APIError('Missing IFTHEN credentials');
    }
    return getPaymentRef(IFTHEN_ENTETY, IFTHEN_SUBENTETY, value);
});

module.exports = {
    MbReference: mongoose.model('MbReference', MbReference, 'mbReferences'),
};
