const mongoose = require('mongoose');
const redis = require('redis');
const { promisify } = require('util');

module.exports = {
    mongo: {
        connect: config => mongoose.connect(
            `mongodb://${config.user}:${config.password}@${config.host}:\
                ${config.port}/${config.name}?authSource=admin`, {
                useNewUrlParser: true,
                useCreateIndex: true,
                socketTimeoutMS: 0,
                keepAlive: true,
                reconnectTries: 30,
            },
        ),
    },
    redis: {
        client: undefined,
        connect: (config) => {
            if (this.client === undefined) {
                this.client = redis.createClient({
                    host: config.host,
                    port: config.port,
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
