const mongoose = require('mongoose');

const Quota = mongoose.Schema({
    year: { type: Number, required: true },
    value: { type: Number, default: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', default: null },
}, { timestamps: true });

module.exports = {
    Quota: mongoose.model('Quota', Quota, 'quotas'),
};
