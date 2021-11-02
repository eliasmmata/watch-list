const express = require('express');
const upload = require('../_shared/middleware/file.middleware');
const SerieService = require('./serie.service')
const SerieController = express.Router();

SerieController.get('/',async (req, res) => {
    try {
        const serie = await SerieService.find(req.query.extended);
        res.json(serie);
    } catch (error) {
        next(error)
    }
});

SerieController.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        const serie = await SerieService.findOne(id);

        res.json(serie);
    } catch (error) {
        next(error);
    }
});


SerieController.post('/', upload.single('image'), async (req, res, next) => {
    try {
        const {title, synopsis, watched} = req.body;

        const created = await SerieService.create({ title, synopsis, watched }, req.file);

        res.status(201).json(created);
    } catch (error) {
        next(error);
    }
})

SerieController.put('/:id', async (req, res, next) => {
    try {
        const {title, synopsis, watched} = req.body;
        const { id } = req.params;

        const updated = await SerieService.replace(id, {title, synopsis, watched});

        res.json(updated);
    } catch (error) {
        next(error);
    }
})

SerieController.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        await SerieService.delete(id);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
})

function getNextId() {
    return series.reduce((current, greatest, ids) => greatest = greatest > current.id ? greatest: current.id , 0)
}

function safeParseInt(stringInteger) {
    try {
        return  parsedId = parseInt(stringInteger)
    } catch(error) {
        return null;
    }
}


module.exports = SerieController;