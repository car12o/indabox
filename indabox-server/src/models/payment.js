const mongoose = require('mongoose');

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
    type: { type: String, required: true },
    value: { type: Number, required: true },
    invoiceEmited: { type: Boolean, default: false },
    status: {
        label: { type: String, default: paymentStatus.unpaid.label },
        value: { type: Number, default: paymentStatus.unpaid.value },
    },
    quotas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quota' }],
    mbReference: { type: mongoose.Schema.Types.ObjectId, ref: 'MbReference', default: null },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
}, { timestamps: true });

module.exports = {
    Payment: mongoose.model('Payment', Payment, 'payments'),
    paymentStatus,
    paymentTypes,
};
