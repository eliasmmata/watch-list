/* const RelacionConResolver = require("../customer/customer.resolver");*/
const StatusError = require("../_shared/error/status.error");
const Movie = require("./movie.model");

class MovieService {

    static find(extended) {

        if (extended === true) {
            return Movie.find() // .populate('prop resolver')
        }
        return Movie.find();
    }

    static async findOne(id) {
        const movie = await Movie.findById(id);

        if (movie) {
            return movie;
        }

        throw new StatusError(404, `Movie with id <${id}> was not found`);
    }

    static async replace(id, movie) {
        const updated = await Movie.findByIdAndUpdate(id, movie);

        if (updated) {
            return updated;
        }

        throw new StatusError(404, `Movie with id <${id}> was not found`);
    }

    static async delete(id) {

        const movie = await Movie.findById(id);

        if(movie) {
            return Movie.findByIdAndRemove(id);
        }

        throw new StatusError(404, `Movie with id <${id}> was not found`);
    }

}

module.exports = MovieService;