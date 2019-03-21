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
        // eslint-disable-next-line no-underscore-dangle
        this.user = value;
        if (value) {
            const { _id, __v, ...user } = value.toObject();
            this.user = Object.assign({}, user, { id: value.id });
        }
        redis.set(this.token, JSON.stringify(this));
    }

    /**
     * json ...
     */
    json() {
        const result = {
            logged: this.logged,
        };

        if (this.user) {
            result.user = {
                id: this.user.id,
                role: this.user.role,
                type: this.user.type,
                firstName: this.user.firstName,
                lastName: this.user.lastName,
                email: this.user.email,
                nif: this.user.nif,
                phone: this.user.phone,
                address: this.user.address,
                postCode: this.user.postCode,
                city: this.user.city,
                country: this.user.country,
                notes: this.user.notes,
                alerts: this.user.alerts,
                newsletter: this.user.newsletter,
                createdBy: this.user.createdBy || 'Imported',
                createdAt: this.user.createdAt,
                updatedBy: this.user.updatedBy || 'Imported',
                updatedAt: this.user.updatedAt,
            };
        }

        return result;
    }
}

module.exports = Session;
