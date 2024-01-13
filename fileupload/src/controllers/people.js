const person = require('../models/people');
const express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const multer = require('multer');
const getalldata = async(req, res) => {
    const alluser = await person.find({});
    res.json(alluser);
}

const insertData = async(req, res) => {

    try {
        const { name, age } = req.body;

        if (!req.body) {
            res.json({ message: "Empty body" });
        }

        if (!name || !age) {
            res.json({ message: "Please upload all data" });
        }

        const newPerson = {
            name: name,
            age: age
        }
        console.log(newPerson);

        if (req.file) {
            newPerson.profile = req.file.path;

            await person.create(newPerson);

            res.json({ message: "new person created" });
        } else {
            res.json({ messsage: "please provide profile pic" });
        }




    } catch (err) {
        console.log(err);
    }





}
const updateData = async(req, res) => {

    try {

        if (!req.body) {
            res.json({ message: "body not found" });
        }
        const { name, age } = req.body;
        const id = req.params.id;
        console.log(req.body);
        let user = await person.findById(id);

        if (!user)
            res.json({ message: "user not found with this id" });

        if (name)
            user.name = name;

        if (age)
            user.age = age;

        if (req.file) {
            // mv.upload.single('profile');
            const presenFilepath = user.profile;
            user.profile = req.file.path;

            const par = path.join(__dirname, '..');

            const filepath = path.join(par, presenFilepath);
            fs.unlink(filepath, err => {
                if (err) {
                    console.log("facing issues in deleting file", err);
                }
            });


        }
        await user.save();
        res.json({ message: "data updated for id " + id });
    } catch (err) {
        console.log("updation failed", err);
    }
}
const deleteData = async(req, res) => {
    try {
        const id = req.params.id;

        const deleted = await person.findOneAndDelete({ _id: id });

        if (deleted) {
            const par = path.join(__dirname, '..');

            const filepath = path.join(par, deleted.profile);
            fs.unlink(filepath, err => {
                if (err) {
                    console.log("facing issues in deleting file", err);
                } else {
                    res.json({ message: "Data from server deleted" });
                }
            });
            //res.json({ message: "Data with id " + id + " is deleted!!" });
        } else {
            res.json({ message: "User not found with this id" });
        }
    } catch (err) {
        console.log("deletion failed", err);
    }
}

module.exports = { insertData, getalldata, updateData, deleteData };