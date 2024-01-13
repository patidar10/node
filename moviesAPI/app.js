var express = require('express');
var app = express();

var cors = require('cors');
//var fileupload = require('express-fileupload');
var morgan = require('morgan');
var multer = require('multer');
var bodyParser = require('body-parser');
require('dotenv').config();


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
var mongoose = require('mongoose');

var mov_route = require('./routes/movie');

app.use('/allmovies', mov_route);

mongoose.connect(process.env.URI_DB).then(() => {
    console.log("DB connected");
}).catch(err => {
    console.log("failed!!", err);
});

app.listen(3000);