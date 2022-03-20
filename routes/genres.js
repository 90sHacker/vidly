const validatObjectId = require('../middleware/validateObjectId');
const { Genres, validate } = require('../models/genres');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();

// const genres = [
//     {id: 1, name: 'Action'},
//     {id: 2, name: 'Comedy'},
//     {id: 3, name: 'Thriller'},
//     {id: 4, name: 'Drama'},
//     {id: 5, name: 'Horror'},
//     {id: 6, name: 'Sci-Fi'}
// ];

router.get('/', async (req, res) => {
    const genres = await Genres.find();
    res.send(genres);
});

router.get('/:id', validatObjectId, async (req, res) => {
    const genre = await Genres.findById(req.params.id);
    if(!genre) return res.status(404).send('The requested genre was not found');

    res.send(genre);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try {
        let genre = new Genres({ name: req.body.name});
        genre = await genre.save();
        res.send(genre);
    }
    catch(err) {
        res.send(err.message);
    }
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genres.findByIdAndUpdate(req.params.id, { name: req.body.name}, { new: true });
    if(!genre) return res.status(404).send('The requested genre was not found');

    res.send(genre);
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const genre = await Genres.findByIdAndRemove(req.params.id);
    if(!genre) return res.status(404).send('The requested genre was not found');
    
    res.send(genre);
});

module.exports = router;