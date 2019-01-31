const User = require('../models/user');

class UsersController {
    /**
     * get ...
     * @param {object} req
     * @param {object} res
     */
    static async get(req, res) {
        const { id } = req.params;
        let query = {};
        if (id) {
            query = Object.assign({}, query, { _id: id });
        }

        try {
            const user = await User.find(query);
            return res.send(user);
        } catch (e) {
            log.error(e);
            return res.status(500).send(e);
        }
    }

    /**
     * store ...
     * @param {object} req
     * @param {object} res
     */
    static async store(req, res) {
        const {
            email, nif, password, firstName, lastName,
        } = req.body;

        try {
            const user = await new User({
                email,
                nif,
                password,
                firstName,
                lastName,
            }).save();

            return res.send(user);
        } catch (e) {
            log.error(e);
            return res.status(500).send(e);
        }
    }

    /**
     * update ...
     * @param {object} req
     * @param {object} res
     */
    static async update(req, res) {
        const { id } = req.params;
        const {
            email, nif, password, firstName, lastName,
        } = req.body;

        try {
            const user = await User.updateOne({ _id: id }, {
                email,
                nif,
                password,
                firstName,
                lastName,
            });

            return res.send(user);
        } catch (e) {
            log.error(e);
            return res.status(500).send(e);
        }
    }

    /**
     * delete ...
     * @param {object} req
     * @param {object} res
     */
    static async delete(req, res) {
        const { id } = req.params;

        try {
            const user = await User.deleteOne({ _id: id });

            return res.send(user);
        } catch (e) {
            log.error(e);
            return res.status(500).send(e);
        }
    }
}

module.exports = UsersController;
