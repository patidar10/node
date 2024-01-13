const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
require('dotenv').config();

const router = express.Router();
const cookieParser = require('cookie-parser');
const controller = require('../controllers/forms')
const app = express();
app.use(cookieParser());
var upload = multer();

var session = require('express-session');

app.set('view engine', 'pug');
app.set('views', '../views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

app.use(session({
    secret: "Its a secret",
    resave: false, // Set resave to false
    saveUninitialized: true
}));


router.get('/signup', async(req, res) => {
    try {
        res.render('signup');
    } catch (err) {
        console.log("failed", err);
    }
});
router.post('/signup', controller.signup);

router.get('/login', async(req, res) => {
    res.render('signin');
});
router.post('/login', controller.login);


router.get('/logout', controller.checksignin, async function(req, res) {
    res.render('logout');
});
router.post('/logout', controller.logout);



module.exports = router;