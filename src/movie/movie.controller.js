const express = require('express');
const upload = require('../_shared/middleware/file.middleware');
const MovieService = require('./movie.service');
const MovieController = express.Router();

MovieController.get('/', async (req, res) => {
    try {
        const movie = await MovieService.find(req.query.extended);
        res.json(movie);
    } catch (error) {
        next(error)
    }
});

MovieController.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        const movie = await MovieService.findOne(id);

        res.json(movie);

    } catch (error) {
        next(error);
    }
});

MovieController.post('/', upload.single('image'), async (req, res, next) => {
    try {
        const { title, director, year, watched, platform } = req.body;

        const created = await MovieService.create({ title, director, year, watched, platform }, req.file);

        res.status(201).json(created);

    } catch (error) {
        next(error);
    }
})

MovieController.put('/:id', async (req, res, next) => {
    try {
        const { title, director, year, watched, platform } = req.body;
        const { id } = req.params;

        const updated = await MovieService.replace(id, { title, director, year, watched, platform });

        res.json(updated);

    } catch (error) {
        next(error);
    }
})

MovieController.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        await MovieService.delete(id);

        res.status(204).send();

    } catch (error) {
        next(error);
    }
})

module.exports = MovieController;