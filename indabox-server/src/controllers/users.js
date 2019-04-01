const { User } = require('../models/user');
require('../models/quota');
const { hashPassword } = require('../services/crypto');
const APIError = require('../services/error');

class UsersController {
    /**
     * get ...
     * @param {object} req
     * @param {object} res
     */
    static async get(req, res, next) {
        try {
            const { userId } = req.params;
            let query = { role: 10 };
            if (userId) {
                query = Object.assign({}, { _id: userId });
            }

            const user = await User.find(query)
                .select('-password')
                .populate('quotas', '-user');
            return res.send(userId ? user[0] : user);
        } catch (e) {
            return next(new APIError(e));
        }
    }

    /**
     * store ...
     * @param {object} req
     * @param {object} res
     */
    static async store(req, res, next) {
        try {
            let { password } = req.body;
            password = hashPassword(password);

            const data = Object.assign({}, req.body, { password });
            const user = await User.create(data);

            return res.send(user);
        } catch (e) {
            return next(new APIError(e));
        }
    }

    /**
     * update ...
     * @param {object} req
     * @param {object} res
     */
    static async update(req, res, next) {
        const { userId } = req.params;

        try {
            const user = await User.findOneAndUpdate(
                { _id: userId },
                req.body,
                { new: true },
            ).select('-password').populate('quotas');
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
