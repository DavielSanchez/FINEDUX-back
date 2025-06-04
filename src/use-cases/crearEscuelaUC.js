const EscuelaModel = require('../interfaces/models/Escuela.model');

async function crearEscuelaUC(data) {
    return await EscuelaModel.create(data);
}

module.exports = crearEscuelaUC;