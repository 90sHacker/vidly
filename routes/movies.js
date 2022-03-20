const { Genres } = require('../models/genres');
const { Movies, validate } = require('../models/movies');
const auth = require('../middleware/auth');
const router = require('express').Router();

router.get('/', async (req, res) => {
    const movies = await Movies.find().sort('title');

    res.send(movies);
});

router.get('/:id', async(req, res) => {
    const movie = await Movies.findById(req.params.id);
    if(!movie) return res.status(404).send(`The movie with the requested id ${req.params.id} was not found`);

    res.send(movie);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genres.findById(req.body.genreId);
    if(!genre) return res.status(404).send('Invalid genre')

    try {
        let movie = new Movies({
            title: req.body.title,
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate,
            genre: {
                _id: genre._id,
                name: genre.name
            }
        });
        movie = await movie.save();
        res.send(movie);
    }
    catch(err) {
        res.send(err.message);
    }
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const movie = await Movies.findByIdAndUpdate(req.params.id, req.body, { new: true});
    if(!movie) res.status(404).send(`The movie with the requested id ${req.params.id} was not found`);
    res.send(movie);
});

router.delete('/:id', async (req, res) => {
    const movie = await Movies.findByIdAndRemove(req.params.id);
    if(!movie) return res.status(404).send(`The movie with the requested id ${req.params.id} was not found`);
    
    res.send(movie);
});

module.exports = router;