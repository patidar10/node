const express = require('express');

const router = express.Router();

const controller = require('../controllers/movie');

const upload = require('../middlewares/upload');

router.get('/', controller.getallMovies);




router.post('/insertmovie', controller.createMovie);

router.delete('/deletemovie/:id', controller.deleteMovie);

router.put('/updatemovie/:id', controller.updateMovie);
module.exports = router;