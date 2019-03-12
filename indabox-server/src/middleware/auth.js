const Session = require('../services/session');

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
    static authorization(req, res, next) {
        if (!req.session.logged) {
            return res.status(401).send({ err: 'Unauthorized!' });
        }

        const { userId } = req.params;
        if (userId && (userId !== req.session.user.id || req.session.user.role > 0)) {
            return res.status(401).send({ err: 'Unauthorized!' });
        }

        return next();
    }
}

module.exports = Auth;
