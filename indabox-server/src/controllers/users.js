// const _ = require('lodash/fp');
const { User } = require('../models/user');
require('../models/quota');
require('../models/payment');
const { hashPassword } = require('../services/crypto');
const APIError = require('../services/error');

class UsersController {
    /**
     * getAll ...
     * @param {object} req
     * @param {object} res
     */
    static async getAll(req, res, next) {
        try {
            const { user } = req.session;
            const users = await User.find().where('role.value').gte(user.role.value)
                .select('-password');

            return res.send(users);
        } catch (e) {
            return next(new APIError(e));
        }
    }

    /**
     * get ...
     * @param {object} req
     * @param {object} res
     */
    static async get(req, res, next) {
        try {
            const { userId } = req.params;
            const user = await User.findOne({ _id: userId })
                .select('-password')
                .populate({
                    path: 'quotas',
                    select: '-user',
                    populate: {
                        path: 'payment',
                        populate: {
                            path: 'quotas',
                            select: 'year',
                        },
                    },
                });

            return res.send(user);
        } catch (e) {
            return next(new APIError(e));
        }
    }

    /**
     * create ...
     * @param {object} req
     * @param {object} res
     */
    // static async create(req, res, next) {
    //     try {
    //         let { password } = req.body;
    //         password = hashPassword(password);

    //         const data = Object.assign({}, req.body, { password });
    //         const user = await User.create(data);

    //         return res.send(_.omit('_doc.password', user));
    //     } catch (e) {
    //         return next(new APIError(e));
    //     }
    // }

    /**
     * update ...
     * @param {object} req
     * @param {object} res
     */
    static async update(req, res, next) {
        const { userId } = req.params;
        const { body } = req;

        if (body.password) {
            body.password = hashPassword(body.password);
        }

        try {
            const user = await User.findOneAndUpdate(
                { _id: userId },
                body,
                { new: true },
            ).select('-password')
                .populate({
                    path: 'quotas',
                    select: '-user',
                    populate: {
                        path: 'payment',
                        populate: {
                            path: 'quotas',
                            select: 'year',
                        },
                    },
                });

            return res.send(user);
        } catch (e) {
            return next(new APIError(e));
        }
    }

    /**
     * delete ...
     * @param {object} req
     * @param {object} res
     */
    // static async delete(req, res) {
    //     const { id } = req.params;

    //     try {
    //         const user = await User.deleteOne({ _id: id });

    //         return res.send(user);
    //     } catch (e) {
    //         log.error(e);
    //         return res.status(500).send(e);
    //     }
    // }
}

module.exports = UsersController;
