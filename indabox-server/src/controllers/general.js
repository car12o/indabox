const User = require('../models/user');

class GeneralController {
    /**
     * state ...
     * @param {object} req
     * @param {object} res
     */
    static async state(req, res) {
        try {
            const { user } = req.session;
            if (user) {
                const result = await User.findOne({ _id: user.id });
                req.session.setUser(result);
            }

            return res.send(req.session.json());
        } catch (e) {
            log.error(e);
            return res.status(500).send(e);
        }
    }

    /**
     * login ...
     * @param {object} req
     * @param {object} res
     */
    static async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).send({ err: 'Invalid email' });
            }

            if (user.password !== password) {
                return res.status(401).send({ err: 'Invalid password' });
            }

            req.session.setLogged(true);
            req.session.setUser(user);
            return res.send(req.session.json());
        } catch (e) {
            log.error(e);
            return res.status(500).send(e);
        }
    }
}

module.exports = GeneralController;
