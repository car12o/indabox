const Session = require('../services/session');
const APIError = require('../services/error');
const { userRoles } = require('../models/user');

class Auth {
    /**
     * handleToken ...
     * @param {object} req
     * @param {object} res
     * @param {object} next
     */
    static async handleToken(req, res, next) {
        const token = req.get('Token');
        req.session = await new Session().init(token);
        res.set('Token', req.session.token);
        res.set('Access-Control-Expose-Headers', 'Content-Type, Token, X-Requested-With');
        return next();
    }

    /**
     * authorization ...
     * @param {object} req
     * @param {object} res
     * @param {object} next
     */
    static authorization(role) {
        return (req, res, next) => {
            const { user, logged } = req.session;

            if (!logged) {
                return next(new APIError('Unauthorized!', { status: 401 }));
            }

            if (user.role.value > role.value) {
                return next(new APIError('Unauthorized!', { status: 401 }));
            }

            const { userId } = req.params;
            const { _id } = user;
            if (userId && (userId !== _id && user.role.value > userRoles.admin.value)) {
                return next(new APIError('Unauthorized!', { status: 401 }));
            }

            return next();
        };
    }
}

module.exports = Auth;
