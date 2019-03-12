const uuidv4 = require('uuid/v4');
const { redis } = require('./database');

class Session {
    /**
     * init ...
     * @param {string} authToken
     */
    async init(authToken = '') {
        try {
            const value = await redis.get(authToken);
            this.build(value);
            return this;
        } catch (e) {
            this.create();
            return this;
        }
    }

    /**
     * create ...
     */
    create() {
        this.token = uuidv4();
        this.logged = false;
        redis.set(this.token, JSON.stringify(this));
    }

    /**
     * build ...
     * @param {string} value
     */
    build(value) {
        const { token, logged, user } = JSON.parse(value);
        this.token = token;
        this.logged = logged;
        this.user = user;
    }

    /**
     * setLogged ...
     * @param {boolean} value
     */
    setLogged(value = false) {
        this.logged = value;
        redis.set(this.token, JSON.stringify(this));
    }

    /**
     * setUser ...
     * @param {object} value
     */
    setUser(value) {
        this.user = value;
        redis.set(this.token, JSON.stringify(this));
    }

    /**
     * json ...
     */
    json() {
        return {
            logged: this.logged,
            user: this.user,
        };
    }
}

module.exports = Session;
