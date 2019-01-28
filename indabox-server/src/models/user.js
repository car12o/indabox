const mongoose = require('mongoose');

const User = mongoose.Schema({
    email: String,
    nif: String,
    password: String,
    firstName: String,
    lastName: String,
    number: Number,
    role: { type: String, default: 'admin' },
});

User.method('store', function store(user) {

    return this.(query)
        .populate({
            path: 'courses',
            model: 'courses',
            populate: [
                {
                    path: 'languages',
                    model: 'languages',
                },
                {
                    path: 'category',
                    model: 'categories',
                },
                {
                    path: 'format',
                    model: 'formats',
                },
            ],
        })
        .populate({
            path: 'location.area location.travelFee.area',
            model: 'areas',
        });
});

module.exports = mongoose.model('users', User);
    
