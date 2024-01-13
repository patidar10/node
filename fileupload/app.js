const express = require('express');
const app = express();
const dataRouter = require('./src/routes/people');

const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use('/', dataRouter);
//app.use('/uploads', express.static('uploads'));
const uri = "mongodb+srv://Sawan:7909569277@cluster10.yvl58.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri).then(() => {
    console.log("DB connected");
}).catch(err => {
    console.log("Connection failed", err);
});

// Default error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});