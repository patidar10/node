const person = require('../models/forms');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
let user;
const bcrypt = require('bcrypt');
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mv = require('../middlewares/forms');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

const signup = async(req, res) => {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);
    const newuser = { name: name, email: email, password: hashed };
    await person.create(newuser);
    const token = jwt.sign({ userId: newuser._id }, process.env.KEY_SECRET, { expiresIn: '1h' });
    newuser.token = token;
    res.render('logout', { message: "you have an account now!!" });
    // res.status(200).json({ message: 'Login successful', token });

}

const login = async(req, res) => {

    const { email, password } = req.body;

    user = await person.findOne({ email });

    if (!user) {
        res.render('signin', {
            message: "Invalid email"
        });
    } else {

        const hashedPassword = user ? user.password : null;
        const isvalid = await bcrypt.compare(password, hashedPassword);

        if (!isvalid) {
            res.render('signin', { message: "Invalid Password" });
        } else {
            const token = mv.setuser(user);
            user.token = token;
            user.save();
            res.cookie('cookie', token);
            console.log(token);
            //res.status(200).json({ message: 'Login successful', token });
            res.redirect('/form/logout');
        }

    }

}

function checksignin(req, res, next) {
    console.log("sid");
    const token = req.cookies.cookie // Assuming the token is sent in the Authorization header
    console.log(token);
    if (!token) {
        // No token provided
        console.error('Token not provided');
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }


    const data = mv.getuser(token);
    const { email } = data;
    const user = person.findOne({ email });
    const nt = user.token;
    jwt.verify(token, process.env.KEY_SECRET, (err, decoded) => {
        if (err) {
            // Token verification failed
            console.error('Token verification failed:', err);
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        } else {
            // Token verification successful, access decoded data
            console.log('Decoded token:', decoded);
            next();
        }
    });
}

const logout = async(req, res) => {

    try {
        const data = mv.getuser(req.cookies.cookie);
        const { email } = data || {};

        if (!email) {
            console.log("logout error");
        }
        const user = await person.findOne({ email });
        user.token = "";
        user.save();
        console.log(user);
        res.clearCookie('cookie');
        res.render('signin');
    } catch (err) {
        console.log("server error", err);
    }



}



module.exports = { signup, login, logout, checksignin };