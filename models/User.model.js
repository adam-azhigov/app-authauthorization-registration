const mongoose = require('mongoose')

const userShema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    login: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        require: true,
    },
    dateOfBirth: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        require: true,
    },
    avatarUrl: {
        type: String,
        require: false
    }

},
{timestamps: true}
);

const User = mongoose.model('User', userShema);
module.exports = User;