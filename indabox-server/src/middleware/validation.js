const Joi = require('joi');
const APIError = require('../services/error');

/**
 * validation ...
 * @param {object} schema
 */
const validation = schema => async (req, res, next) => {
    try {
        await Joi.validate(req.body, schema, {
            abortEarly: false,
        });
        return next();
    } catch (e) {
        const payload = e.details.reduce((acc, err) => {
            const { key } = err.context;
            if (!acc.find(elem => elem.key === key)) {
                acc.push({
                    key,
                    err: err.message,
                });
            }
            return acc;
        }, []);

        return next(new APIError(e.name, {
            status: 400,
            payload,
        }));
    }
};

module.exports = validation;
