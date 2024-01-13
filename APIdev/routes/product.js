var express = require('express');
var router = express.Router();

var product = require('../models/product');

//const { products, testing } = require('../controllers/product');
//product.deleteMany({});
//product.create({ name: "rahul", age: 21, company: "apple", contact: 7905545466 });

router.get('/', async(req, res) => {
    try {

        let filteredMovies = new Object();

        const { name, age, company, contact, sort, select } = req.query;

        if (select) {
            var newselect = select.split(',').join(' ');
            filteredMovies = await product.find({}).select(newselect);
        } else
            filteredMovies = await product.find({});

        // Filtering based on query parameters with regex
        if (name) {
            const regexName = new RegExp(name, 'i'); // 'i' flag for case-insensitive search
            filteredMovies = filteredMovies.filter(product => regexName.test(product.name));
        }

        if (age) {
            const regexDirector = new RegExp(age, 'i');
            filteredMovies = filteredMovies.filter(product => regexDirector.test(product.age.toString()));
        }

        if (company) {
            const regexGenre = new RegExp(company, 'i');
            filteredMovies = filteredMovies.filter(product => regexGenre.test(product.company));
        }

        if (contact) {
            const regexYear = new RegExp(contact);
            filteredMovies = filteredMovies.filter(product => regexYear.test(product.contact.toString()));
        }

        if (sort) {
            var str = req.query.sort;
            filteredMovies.sort(byField(str));
        }
        // Return the filtered results



        res.json({ movies: filteredMovies });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/test', (req, res) => {
    res.json({ name: "Sawan Patidar" })

});

const byField = function(s) {
    return (a, b) => a[s] > b[s] ? 1 : -1;
}

module.exports = router;