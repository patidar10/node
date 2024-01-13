const mongoose = require('mongoose');

const movJson = require("./mov.json");
const movie = require('../models/movies');

const uri = "mongodb+srv://Sawan:7909569277@cluster10.yvl58.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri).then(() => {
    console.log("DB connected");

}).catch(err => {
    console.log("failed!!", err);
});


const start = async() => {
    try {
        await mongoose.connect(uri);
        await movie.create(movJson);
        console.log("data added succesfully!!");
    } catch (err) {
        console.log("failed to upload", err);
    }


}
const del = async() => {

    try {
        await movie.deleteMany({});
        console.log("data deleted successfully");
    } catch (err) {
        console.log("failed deletion", err);
    }


}

//del();
start();