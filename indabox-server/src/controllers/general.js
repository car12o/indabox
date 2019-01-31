const User = require('../models/user');

class GeneralController {
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
                return res.status(401).send({ err: 'Invalid email or nif!' });
            }

            if (user.password !== password) {
                return res.status(401).send({ err: 'Invalid password!' });
            }

            req.session.setLogged(true);
            req.session.setUser(user);
            return res.send(req.session);
        } catch (e) {
            log.error(e);
            return res.status(500).send(e);
        }
    }
}

module.exports = GeneralController;
