const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: String,
    director: String,
    rating: Number,
    year: Number,
    download: {
        type: String,
        default: "www.google.com",
    },
    genre: String,
    language: {
        type: String,
        default: "Hindi",
    },
    avatar: {
        type: String
    }

});

module.exports = mongoose.model("movieInfo", movieSchema);