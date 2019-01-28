const User = require('../models/user');

class UsersController {
    /**
     * get ...
     * @param {Object} req
     * @param {Object} res
     */
    static async get(req, res) {
        return res.send('Hello wordl!');
        // try {
        //     const result = await category.find({});
        //     return res.send(result);
        // } catch (e) {
        //     log.error(e);
        //     return res.status(500).send(e);
        // }
    }

    /**
     * store ...
     * @param {*} res
     * @param {*} req
     */
    static async store(res, req) {
        const result = new User();
        result.save

        return res.send('Hello wordl!');
    }
}

module.exports = UsersController;
