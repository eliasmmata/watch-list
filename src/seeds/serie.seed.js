const mongoose = require('mongoose')

const Serie = require('../towatch/towatch.model')

require('dotenv').config()

// 1    Ver si hay datos en BBDD
// 2    Si hay datos borro todos los datos de la coleccion
// 3    Inserto en la colección todos los datos de movies

const series = [
  {
      title: 'Title Serie',
      //seasons: '2',
      synopsis: 'what serie is about',
      // createdAt: '26/10/2021',
      // updatedAt: '26/10/2021
      watched: false
  },
  {
      title: 'Serie two',
      // seasons: '2',
      synopsis: 'what serie is about',
      // createdAt: '26/10/2021',
      // updatedAt: '26/10/2021
      watched: false
  },
  {
      title: 'Serie three',
      // seasons: '2',
      synopsis: 'what serie is about',
      // createdAt: '26/10/2021',
      // updatedAt: '26/10/2021
      watched: false
  }
]

  mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
        // Utilizando Character.find() obtendremos un array con todos los personajes de la db
    const series = await Serie.find();
        // Si existen personajes previamente, dropearemos la colección
    if (series.length) {
      await Serie.collection.drop(); //La función drop borra la colección
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
        // Una vez vaciada la db de los personajes, usaremos el array MoviesDocuments
        // para llenar nuestra base de datos con todas los personajes.
        await Serie.insertMany(series);
    })
  .catch((err) => console.log(`Error creating data: ${err}`))
    // Por último nos desconectaremos de la DB.
  .finally(() => mongoose.disconnect());