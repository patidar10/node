const express = require('express');
const router = express.Router();
const control = require('../controllers/people');
const upload = require('../middleware/people');
const multer = require('multer');


router.get('/alldata', control.getalldata);
router.post('/create', upload.single('profile'), control.insertData);
router.put('/update/:id', upload.single('profile'), control.updateData);
router.delete('/delete/:id', control.deleteData);

module.exports = router;