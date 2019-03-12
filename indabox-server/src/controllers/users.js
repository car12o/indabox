const User = require('../models/user');

class UsersController {
    /**
     * get ...
     * @param {object} req
     * @param {object} res
     */
    static async get(req, res) {
        try {
            const { userId } = req.params;
            let query = {};
            if (userId) {
                query = Object.assign({}, query, { _id: userId });
            }

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
        try {
            const user = await new User(req.body).save();

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
        const { userId } = req.params;

        try {
            const user = await User.updateOne({ _id: userId }, req.body);

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
