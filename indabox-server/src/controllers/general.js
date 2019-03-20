const User = require('../models/user');
const { verifyHash } = require('../services/crypto');
const APIError = require('../services/error');

class GeneralController {
    /**
     * state ...
     * @param {object} req
     * @param {object} res
     */
    static async state(req, res, next) {
        try {
            const { user } = req.session;
            if (user) {
                const result = await User.findOne({ _id: user.id });
                req.session.setUser(result);
            }

            return res.send(req.session.json());
        } catch (e) {
            return next(new APIError(e));
        }
    }

    /**
     * login ...
     * @param {object} req
     * @param {object} res
     */
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return next(new APIError('Invalid email', { status: 400 }));
            }

            if (!verifyHash(password, user.password)) {
                return next(new APIError('Invalid password', { status: 400 }));
            }

            req.session.setLogged(true);
            req.session.setUser(user);
            return res.send(req.session.json());
        } catch (e) {
            return next(new APIError(e));
        }
    }
}

module.exports = GeneralController;
