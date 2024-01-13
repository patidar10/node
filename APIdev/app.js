var express = require('express');
var app = express();

var mongoose = require('mongoose');

const prod_routes = require('./routes/product');

app.get('/', (req, res) => {
    res.send("Hello");
});

app.use('/api/products', prod_routes);
const uri = "mongodb+srv://Sawan:7909569277@cluster10.yvl58.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri).then(() => {
    console.log("DB connected");
}).catch(err => {
    console.error("failed!!");



});


app.listen(8080);

// const start = async() => {
//     try {
//         app.listen(3000);
//     } catch (error) {
//         console.log(error);
//     }
// }