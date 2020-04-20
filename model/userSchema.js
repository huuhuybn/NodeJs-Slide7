let mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
})
module.exports = userSchema
