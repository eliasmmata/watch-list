const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const serie = new Schema({
    title: { type: String },
    synopsis: { type: String },
    watched: {type: Boolean},
    image: {type: String}
})


const SerieSchema = new Schema(serie,{timestamps:true});

const Serie= mongoose.model('series', SerieSchema);

module.exports = Serie;