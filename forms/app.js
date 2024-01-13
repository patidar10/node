const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');
const app = express();
const routes = require('./routes/route');
var upload = multer();
const uri = "mongodb+srv://Sawan:7909569277@cluster10.yvl58.mongodb.net/?retryWrites=true&w=majority";
var session = require('express-session');
app.use(cookieParser());


app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

app.use('/form', routes);

mongoose.connect(uri).then(() => {

    console.log("DB connected");

}).catch(err => {
    console.log("DB not connected", err);
});

const start = async() => {
    try {
        app.listen(3000);
    } catch (error) {
        console.log(error);
    }
}
start();