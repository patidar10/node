var mongoose = require('mongoose');

var personSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: Number,
    company: String,
    date: {
        type: Date,
        default: Date.now(),
    },
    contact: Number
});

module.exports = mongoose.model("personInfo", personSchema);