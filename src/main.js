const express = require('express');
var mongoose = require('mongoose');

const AdminController = require('./admin/admin.controller');
const SerieController = require('./serie/serie.controller');
const CustomerController = require('./customer/customer.controller');
const MovieController = require('./movie/movie.controller');

const logging = require('./_shared/middleware/loggin.middleware');
const secured = require('./_shared/middleware/secured.middleware');
const { defaults } = require('./_shared/utils');
const cloudinary = require('cloudinary').v2;
const app = express();

const PATH = require('path');

require('dotenv').config()


const PORT = defaults(process.env.PORT, 3000);

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


// IMPORTANTE PONERLO ENCIMA DE LAS RUTAS PARA QUE PUEDA CONVERTIR A JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(logging);

//Set the views folder
app.use(express.static(PATH.join(__dirname, '/public')));

app.use('/movies', MovieController);

app.use('/series', SerieController);

app.use('/customers', secured, CustomerController);

app.use('/admin', AdminController);

app.get('*', function(req, res) {
    res.setHeader('Content-Type', 'text/html')
    console.log('Error 404: route not found')
    res.status(404).send(
        `<h1 style="text-align:center">Page not Found</h1>
        <img style="width:100%" src="https://i.stack.imgur.com/6M513.png">`
        )
});

// BASE ERROR HANDLER (Error Mejorado)
app.use((error, req, res, next) => {

    const exception = {
        status: defaults(error.status, 500),
        message: defaults(error.message, 'An unexpected error happened'),
    }

    if (process.env.NODE_ENV !== 'production') {
        exception['callstack'] = error.stack;
    }

    console.error(exception);
    res.status(exception.status).json(exception)
});


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>
        app.listen(PORT, () => console.info(`Server is running in http://localhost:${PORT}`))
    );