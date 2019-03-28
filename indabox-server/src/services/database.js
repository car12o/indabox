const mongoose = require('mongoose');
const redis = require('redis');
const { promisify } = require('util');
const { User } = require('../models/user');
const { hashPassword } = require('../services/crypto');

module.exports = {
    mongo: {
        connect: async function connect(config) {
            await mongoose.connect(
                `mongodb://${config.user}:${config.password}@${config.host}:\
                ${config.port}/${config.name}?authSource=admin`, {
                    useNewUrlParser: true,
                    useCreateIndex: true,
                    socketTimeoutMS: 0,
                    keepAlive: true,
                    reconnectTries: 30,
                },
            );

            const hasAdmin = await this.hasAdmin(config.admin);
            if (!hasAdmin) {
                this.createAdmin(config.admin);
                log.info('Created admin user');
            }
        },
        hasAdmin: ({ email }) => User.findOne({ email }),
        createAdmin: ({ email, password }) => User.create({ email, password: hashPassword(password), role: 0 }),
    },
    redis: {
        client: undefined,
        connect: (config) => {
            if (this.client === undefined) {
                this.client = redis.createClient({
                    host: config.host,
                    port: config.port,
                    password: config.password,
                });
            }

            return this.client;
        },
        get: (key) => {
            const getAsync = promisify(this.client.get).bind(this.client);
            return getAsync(key);
        },
        set: (key, value) => this.client.set(key, value),
    },
};
