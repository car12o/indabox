const { User } = require('../models/user');
const { verifyHash } = require('../services/crypto');
const APIError = require('../services/error');

class GeneralController {
    /**
     * state ...
     * @param {object} req
     * @param {object} res
     * @param {object} next
     */
    static async state(req, res, next) {
        try {
            const { user } = req.session;
            if (!user) {
                next(new APIError('Internal server error'));
            }

            const { _id } = user;
            const result = await User.findOne({ _id });

            req.session.setUser(result);

            res.json(req.session.json());
        } catch (e) {
            next(e);
        }
    }

    /**
     * login ...
     * @param {object} req
     * @param {object} res
     * @param {object} next
     */
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                next(new APIError('ValidationError', {
                    status: 400,
                    payload: [{
                        path: 'email',
                        err: 'Invalid email',
                    }],
                }));
            }

            if (!verifyHash(password, user.password)) {
                next(new APIError('ValidationError', {
                    status: 400,
                    payload: [{
                        path: 'password',
                        err: 'Invalid password',
                    }],
                }));
            }

            req.session.setLogged(true);
            req.session.setUser(user);

            res.json(req.session.json());
        } catch (e) {
            next(e);
        }
    }

    /**
     * logout ...
     * @param {object} req
     * @param {object} res
     * @param {object} next
     */
    static async logout(req, res) {
        req.session.setLogged(false);
        req.session.setUser(null);
        res.json(req.session.json());
    }
}

module.exports = GeneralController;
