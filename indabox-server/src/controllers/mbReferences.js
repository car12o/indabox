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
            let { quotas } = req.body;
            quotas = await Quota.find({ _id: { $in: quotas } });

            const value = quotas.reduce((accum, quota) => accum + quota.value, 0);

            const { reference, refId } = await MbReference.generate(value);
            const mbReference = await MbReference.create({
                value, quotas, reference, refId,
            });

            return res.send(_.omit('_doc.quotas', mbReference));
        } catch (e) {
            return next(new APIError(e));
        }
    }
}

module.exports = MbReferences;
