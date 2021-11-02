/* const CustomerResolver = require("../customer/customer.resolver");*/
const StatusError = require("../_shared/error/status.error");
const Serie = require("./serie.model");

class SerieService {

    static find(extended) {

        if(extended === true) {
            return Serie.find().populate('owner')
        }
        return Serie.find();
    }

    static async findOne(id) {
        const serie = await Serie.findById(id);

        if (serie) {
            return serie;
        }

        throw new StatusError(404, `Serie with id <${id}> was not found`);
    }

    static async create(serie, file) {
        
        /* await CustomerResolver.ownerExistsById(serie.owner); */
        if(file) {
            return Serie.create({...serie , image: file.path})

        }
        return Serie.create(serie);

        /* const created = await Serie.create(serie); */
        /* await CustomerResolver.addPetToCustomer(created._id, serie.owner) */
    }

    static async replace(id, serie) {
        const updated = await Serie.findByIdAndUpdate(id, serie);

        if (updated) {
            return updated;
        }

        throw new StatusError(404, `Serie with id <${id}> was not found`);
    }

    static async delete(id) {
        const serie = await Serie.findById(id);

        if (serie) {
            return Serie.findByIdAndRemove(id);
        }

        throw new StatusError(404, `Serie with id <${id}> was not found`);
    }
}

module.exports = SerieService;