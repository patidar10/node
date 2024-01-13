const express = require('express');
const movie = require('../models/movies');
const getallMovies = async(req, res) => {
    try {

        let filteredMovies = new Object();

        const { name, director, genre, year, sort, select, direction } = req.query;

        if (select) {
            var newselect = select.split(',').join(' ');
            filteredMovies = await movie.find({}).select(newselect);
        } else
            filteredMovies = await movie.find({});

        // Filtering based on query parameters with regex
        if (name) {
            const regexName = new RegExp(name, 'i'); // 'i' flag for case-insensitive search
            filteredMovies = filteredMovies.filter(movie => regexName.test(movie.name));
        }

        if (director) {
            const regexDirector = new RegExp(director, 'i');
            filteredMovies = filteredMovies.filter(movie => regexDirector.test(movie.director));
        }

        if (genre) {
            const regexGenre = new RegExp(genre, 'i');
            filteredMovies = filteredMovies.filter(movie => regexGenre.test(movie.genre));
        }

        if (year) {
            const regexYear = new RegExp(year);
            filteredMovies = filteredMovies.filter(movie => regexYear.test(movie.year.toString()));
        }

        if (sort) {
            var str = req.query.sort;

            if (direction == 'asc')
                filteredMovies.sort(byField(str));

            else if (direction == 'dsc')
                filteredMovies.sort(byField1(str));

        }
        // Return the filtered results



        res.json({ movies: filteredMovies });





    } catch (err) {
        console.log("response error", err);
    }
}

const byField = (f) => {
    return (a, b) => a[f] > b[f] ? 1 : -1;
}

const byField1 = (f) => {
    return (a, b) => a[f] < b[f] ? 1 : -1;

}

const createMovie = async(req, res) => {
    try {

        //res.json(req.body);

        console.log(req.body);

        if (!req.body) {
            return res.status(400).json({ message: "Bad Request: Request body is empty or missing" });
        }
        const { name, director, rating, year, genre } = req.body;

        const yr = Number(year);

        if (!name || !director || !rating || !yr || !genre) {
            return res.status(400).json({ message: "Bad Request: Missing required fields" });
        }

        if (!yr.toString().match(/^[0-9]{4}$/) || !rating.toString().match(/^[0-9]\.[0-9]$/)) {
            return res.status(400).json({ message: "Bad Request: Invalid field format" });
        }

        const newMovie = {
            name: name,
            director: director,
            rating: rating,
            year: yr,
            genre: genre

        };


        const createdMovie = await movie.create(newMovie);
        return res.status(201).json({ message: "New movie created.", location: "/movies/" + createdMovie.id });
    } catch (err) {
        console.log("Insertion failed", err);
        return res.status(500).json({ message: "Insertion failed" });
    }
}


const updateMovie = async(req, res) => {
    const movieId = req.params.id;
    //const sanid = movieId.replace(':', '');

    try {
        const update = await movie.findOneAndUpdate({ _id: movieId }, { name: req.body.name, director: req.body.director, rating: req.body.rating, year: req.body.year });
        if (!update) {
            return res.status(404).json({ message: "movie not found" });
        } else {
            return res.json({ message: "movie with id " + movieId + "  updated!!" });
        }
    } catch (err) {
        console.log("failed updation", err);
    }
}

const deleteMovie = async(req, res) => {
    try {
        const movieId = req.params.id;

        // Find the movie by ID and remove it
        const sanid = movieId.replace(':', '');
        const deletedMovie = await movie.findOneAndDelete({ _id: sanid });

        if (!deletedMovie) {
            return res.status(404).json({ message: "Movie not found" });
        } else
            return res.json({ message: `Movie with ID ${movieId} has been deleted` });
    } catch (err) {
        console.error("Deletion failed", err);
        return res.status(500).json({ message: "Deletion failed" });
    }
}

module.exports = { getallMovies, createMovie, updateMovie, deleteMovie };