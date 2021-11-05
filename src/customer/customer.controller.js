const express = require('express');
const CustomerService = require('./customer.service');
const CustomerController = express.Router();

CustomerController.get('/', async (req, res, next) => {
    try {
        const customers = await CustomerService.find().populate('movies').populate('series');
        res.json(customers);
    } catch (error) {
        next(error)
    }
});

CustomerController.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        const customer = await CustomerService.findOne(id);

        res.json(customer);
    } catch (error) {
        next(error);
    }
});

CustomerController.post('/', async (req, res, next) => {
    try {
        const { name } = req.body;

        const created = await CustomerService.create({ name });

        res.status(201).json(created);
    } catch (error) {
        next(error);
    }
})

CustomerController.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        await CustomerService.delete(id);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
})

CustomerController.put('/:id', async (req, res, next) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        const updated = await CustomerService.replace(id, { name });

        res.json(updated);
    } catch (error) {
        next(error);
    }
})
CustomerController.patch('/newmovie/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const idMovie = req.body.idMovie
        const updated = await CustomerService.addMovie(id, { $push: { movies: idMovie } })
        res.json(updated);

    } catch (error) {
        return next(error)
    }
})
// PRUEBA
CustomerController.patch('/newserie/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const idSerie = req.body.idSerie
        const updated = await CustomerService.addMovie(id, { $push: { series: idSerie } })
        res.json(updated);

    } catch (error) {
        return next(error)
    }
})

module.exports = CustomerController;
