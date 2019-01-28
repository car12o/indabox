const mongoose = require('mongoose');

module.exports = {
    connect: database => mongoose.connect(
        `mongodb://${database.user}:${database.password}@${database.host}:\
            ${database.port}/${database.name}?authSource=admin`, {
            useNewUrlParser: true,
            socketTimeoutMS: 0,
            keepAlive: true,
            reconnectTries: 30,
        },
    ),
};
