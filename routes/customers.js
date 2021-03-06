const { Customers, validate } = require('../models/customer');
const express = require('express');
const { string } = require('joi');
const router = express.Router();

//define routes
router.get('/', async (req, res) => {
    const customers = await Customers.find().sort({ name: -1});
    res.send(customers);
});

router.get('/:id', async (req, res) => {
    const customer = await Customers.findById(req.params.id);
    if(!customer) res.status(404).send(`The requested customer with id ${req.params.id} was not found`);

    res.send(customer);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try {
        let customer = new Customers(req.body);
        customer = await customer.save();
        res.send(customer);
    }
    catch(err) {
        res.send(err.message);
    };
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customers.findByIdAndUpdate(req.params.id, req.body, { new: true});
    if(!customer) return res.status(404).send(`The requested customer with id ${req.params.id} was not found`);

    res.send(customer);

});

router.delete('/:id', async (req, res) => {
    const customer = await Customers.findByIdAndRemove(req.params.id);
    if(!customer) return res.status(404).send(`The requested customer with id ${req.params.id} was not found`);

    res.send(customer);
})

module.exports = router;