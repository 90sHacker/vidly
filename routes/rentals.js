const router = require('express').Router();
const {Rental, validate} = require('../models/rentals');
const {Customers} = require('../models/customer');
const {Movies} = require('../models/movies');
const auth = require('../middleware/auth');
// const Fawn = require('fawn');
const { default: mongoose } = require('mongoose');

// new Fawn.init(mongoose);

router.get('/', async (req, res) => {
    const rental = await Rental.find().sort('-dateOut');
    res.send(rental);
});

router.get(':/id', async (req, res) => {
   const rental = await Rental.findById(req.params.id);
   if(!rental) return res.status(400).send('Rental info not found');

   res.send(rental);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customers.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid Customer ID');

    const movie = await Movies.findById(req.body.movieId);
    if(!movie) return res.status(400).send('Invalid Movie ID');

    if(movie.numberInStock === 0) return res.status(400).send('Movie not in stock');

    let rental = new Rental({
        customer: {
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone
        },
        movie: {
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });
    try {
        // new Fawn.Task()
        //     .save('rentals', rental)
        //     .update('movies', { _id: movie._id }, {
        //         $inc: { numberInStock: -1 }
        //     })
        //     .run();
        rental = await rental.save();

        movie.numberInStock--;
        movie.save();

        res.send(rental);
    }
    catch(err) {
        res.status(500).send(err.message);
    }
});

// router.put(':/id', async (req, res) => {
//     const { error } = validate(req.body);
//     if(error) return res.status(400).send(error.details[0].message);

//     const customer = await Customers.findById(req.body.customerId);
//     if(!customer) return res.status(400).send('Invalid Customer Id');

//     const movie = await Movies.findById(req.body.movieId);
//     if(!movie) return res.status(400).send('Invalid Movie Id');

//     const rental = await Rental.findByIdAndUpdate(req.params.id, req.body, {new: true});
//     if(!rental) return res.status(404).send(`The rental with the requested id ${req.params.id} was not found`);

//     res.send(rental);
// });

// router.delete(':/id', async (req, res) => {
//     const rental = await Rental.findByIdAndDelete(req.params.id);
//     if(!rental) return res.status(404).send(`The rental with the requested id ${req.params.id} was not found`);

//     res.send(rental);
// })

module.exports = router;