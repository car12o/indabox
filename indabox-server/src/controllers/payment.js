const { User } = require('../models/user');
const { Quota } = require('../models/quota');
const { Payment, paymentTypes, paymentStatus } = require('../models/payment');
const { MbReference } = require('../models/mbReference');
const APIError = require('../services/error');

class PaymentController {
    /**
     * create ...
     * @param {Object} req
     * @param {Object} res
     * @param {Object} next
     */
    static async create(req, res, next) {
        try {
            const { quotas, type } = req.body;
            let mbReference = null;

            const dbQuotas = await Quota.find({ _id: { $in: quotas } });

            const belongs = Quota.belongsSameUser(dbQuotas);
            if (!belongs) {
                throw new APIError('Every quota must belong to the same user', {
                    payload: { quotas },
                });
            }

            const quotasWithPayment = Quota.getWithPayment(dbQuotas);
            if (quotasWithPayment.length > 0) {
                throw new APIError('Some quotas have already payment', {
                    payload: {
                        quotas,
                        quotasWithPayment,
                    },
                });
            }

            const value = dbQuotas.reduce((accum, quota) => accum + quota.value, 0);

            if (type === paymentTypes.mbReference) {
                const { reference, refId } = await MbReference.generate(value);
                mbReference = await MbReference.create({
                    value, quotas, reference, refId,
                });
            }

            const { user } = dbQuotas[0];
            const { _id } = req.session.user;
            const quotasId = dbQuotas.map(quota => quota.id);
            const payment = await Payment.create({
                type,
                value,
                status: {
                    label: paymentStatus.unpaid.label,
                    value: paymentStatus.unpaid.value,
                },
                createdBy: _id,
                updatedBy: _id,
                user,
                quotas: quotasId,
                mbReference: mbReference ? mbReference.id : null,
            });

            await Quota.updateMany({ _id: quotasId }, { payment: payment.id });
            await User.findByIdAndUpdate(user, { $push: { payments: payment.id } });
            const dbUser = await User.fetch(payment.user);

            res.json(dbUser);
        } catch (e) {
            next(e);
        }
    }

    /**
     * updateInvoice ...
     * @param {Object} req
     * @param {Object} res
     * @param {Object} next
     */
    static async updateInvoice(req, res, next) {
        try {
            const { id } = req.params;
            const { invoiceEmited } = req.body;

            const payment = await Payment.findByIdAndUpdate(id, { invoiceEmited }, { new: true });
            const user = await User.fetch(payment.user);

            res.json(user);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = PaymentController;
