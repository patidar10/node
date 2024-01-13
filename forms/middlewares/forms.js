const jwt = require('jsonwebtoken');
require('dotenv').config();
const user = require('../models/forms');

function setuser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email
    }, process.env.KEY_SECRET, { expiresIn: '10m' });
}

function getuser(token) {

    if (!token)
        return null;

    return jwt.verify(token, process.env.KEY_SECRET);
}

module.exports = { getuser, setuser };      