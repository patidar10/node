//const db = require('./db/connect');

const fs = require('fs');
const mongoose = require('mongoose');
const product = require('./models/product');

const prodJson = require('./product.json');

const uri = "mongodb+srv://Sawan:7909569277@cluster10.yvl58.mongodb.net/?retryWrites=true&w=majority";


// const data = JSON.parse(fs.readFileSync('./product.json', 'utf-8'));
// console.log(data);
mongoose.connect(uri).then(() => {

    //         console.log("Success");
    console.log("DB connected");



}).catch(err => {
    console.error("failed!!", err);


});

const deleteAllData = async() => {
    try {
        await product.deleteMany({}); // Delete all documents in the 'product' collection
        console.log("All data deleted from the 'product' collection");
    } catch (error) {
        console.log("Error deleting data:", error);
    }
};

const start = async() => {
    try {
        await mongoose.connect(uri);
        await product.create(prodJson);
        console.log("Data imported Successfully!!");
    } catch (error) {
        console.log(error);
    }
}

// const importData = async() => {
//     try {
//         await product.create(data);
//         console.log('data successfully imported');
//         // to exit the process
//         process.exit();
//     } catch (error) {
//         console.log('error', error);
//     }
// }

start();
//deleteAllData();