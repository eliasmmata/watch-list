const mongoose = require('mongoose')

const Movie = require('../movie/movie.model')

require('dotenv').config()

// 1    Ver si hay datos en BBDD
// 2    Si hay datos borro todos los datos de la coleccion
// 3    Inserto en la colección todos los datos de movies

const movies = [
  {
      title: 'Title Movie',
      synopsis: 'what movie is about',
      platform: 'HBO',
      watched: false
  },
  {
      title: 'Movie two',
      synopsis: 'what movie is about',
      platform: 'Netflix',
      watched: false
  },
  {
      title: 'Movie three',
      synopsis: 'what movie is about',
      platform: 'HBO',
      watched: false
  }
]

  mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
        // Utilizando Movie.find() obtendremos un array con todos los personajes de la db
    const AllMovies = await Movie.find();
        // Si existen movies previamente, dropearemos la colección
    if (AllMovies.length) {
      await Movie.collection.drop(); //La función drop borra la colección
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
        // Una vez vaciada la db de los personajes, usaremos el array MoviesDocuments
        // para llenar nuestra base de datos con todas los personajes.
        await Movie.insertMany(movies);
    })
  .catch((err) => console.log(`Error creating data: ${err}`))
    // Por último nos desconectaremos de la DB.
  .finally(() => mongoose.disconnect());