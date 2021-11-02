const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movie = new Schema({
    title: {type: String },
    synopsys: {type: String },
    watched: {type: Boolean },
    platform: {type: String},
    image: {type: String}
})

const MovieSchema = new Schema(movie, {timestamps:true})

const Movie = mongoose.model('movies', MovieSchema);

module.exports = Movie;