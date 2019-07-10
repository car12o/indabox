const _ = require('lodash/fp');
const { Quota } = require('../models/quota');
const { MbReference } = require('../models/mbReference');
const APIError = require('../services/error');

class MbReferences {
    /**
     * create ...
     * @param {Object} req
     * @param {Object} res
     * @param {Object} next
     */
    static async create(req, res, next) {
        try {
            const { quotas } = req.body;
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
            const { reference, refId } = await MbReference.generate(value);
            const mbReference = await MbReference.create({
                value, quotas, reference, refId,
            });

            res.json(_.omit('quotas', mbReference.toObject()));
        } catch (e) {
            next(e);
        }
    }
}

module.exports = MbReferences;
