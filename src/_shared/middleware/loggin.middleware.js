// middleware para ver ruta en consola

const PATH = require('path');

const logging = ('/' , (req, res, next) => {
    console.log(`[${req.method}] ${req.url}`)
    res.sendFile(PATH.join(__dirname+'../../../views/index.html'))
    /* next() */
});

module.exports = logging;
