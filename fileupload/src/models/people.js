const mongoose = require('mongoose');
const multer = require('multer');
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    profile: {
        type: String
        
    }
});

module.exports = mongoose.model('dataPerson', personSchema);