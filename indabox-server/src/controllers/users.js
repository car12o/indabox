const fp = require('lodash/fp');
const {
    User,
    userTitle,
    userRoles,
    userCountries,
} = require('../models/user');
require('../models/quota');
require('../models/payment');
const { hashPassword } = require('../services/crypto');
const APIError = require('../services/error');

class UsersController {
    /**
     * getAll ...
     * @param {object} req
     * @param {object} res
     * @param {object} next
     */
    static async getAll(req, res, next) {
        try {
            const { user } = req.session;
            const users = await User.find().where('role.value').gte(user.role.value)
                .select('-password');

            return res.json(users);
        } catch (e) {
            return next(new APIError(e));
        }
    }

    /**
     * get ...
     * @param {object} req
     * @param {object} res
     * @param {object} next
     */
    static async get(req, res, next) {
        try {
            const { userId } = req.params;
            const user = await User.findOne({ _id: userId })
                .select('-password')
                .populate([
                    {
                        path: 'quotas',
                        select: '-user',
                        populate: {
                            path: 'payment',
                            select: ['status', 'updatedAt'],
                        },
                    },
                    {
                        path: 'payments',
                        select: '-user',
                        populate: {
                            path: 'quotas',
                            select: 'year',
                        },
                    },
                    {
                        path: 'createdBy',
                        select: 'firstName',
                    },
                    {
                        path: 'updatedBy',
                        select: 'firstName',
                    },
                    {
                        path: 'deletedBy',
                        select: 'firstName',
                    },
                ]);

            return res.json(user);
        } catch (e) {
            return next(new APIError(e));
        }
    }

    /**
    * update ...
    * @param {object} req
    * @param {object} res
    * @param {object} next
    */
    static async update(req, res, next) {
        const { userId } = req.params;
        const { body } = req;

        if (body.password) {
            body.password = hashPassword(body.password);
        }

        body.updatedBy = fp.get('session.user._id', req);

        try {
            const user = await User.findOneAndUpdate(
                { _id: userId },
                body,
                { new: true },
            ).select('-password')
                .populate([
                    {
                        path: 'quotas',
                        select: '-user',
                        populate: {
                            path: 'payment',
                            select: ['status', 'updatedAt'],
                        },
                    },
                    {
                        path: 'payments',
                        select: '-user',
                        populate: {
                            path: 'quotas',
                            select: 'year',
                        },
                    },
                    {
                        path: 'createdBy',
                        select: 'firstName',
                    },
                    {
                        path: 'updatedBy',
                        select: 'firstName',
                    },
                    {
                        path: 'deletedBy',
                        select: 'firstName',
                    },
                ]);

            return res.json(user);
        } catch (e) {
            return next(new APIError(e));
        }
    }

    /**
     * getTitles ...
     * @param {object} req
     * @param {object} res
     */
    static getTitles(req, res) {
        res.json({ titles: userTitle });
    }

    /**
     * getTitles ...
     * @param {object} req
     * @param {object} res
     */
    static getRoles(req, res) {
        const { role } = req.session.user;

        const result = fp.transform((accum, elem) => {
            if (elem.value >= role.value) {
                return accum.push(elem);
            }
            return accum;
        }, [], userRoles);

        res.json({ roles: result });
    }

    /**
     * getTitles ...
     * @param {object} req
     * @param {object} res
     */
    static getCountries(req, res) {
        res.json({ countries: userCountries });
    }
}

module.exports = UsersController;
