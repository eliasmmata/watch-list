const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customer = {
    name: { type: String },
    movies: [{ type: mongoose.Types.ObjectId, ref: 'movies' }],
    series: [{ type: mongoose.Types.ObjectId, ref: 'series' }]

}

const customerSchema = new Schema(customer, { timestamps: true })

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
