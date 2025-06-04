const EscuelaModel = require('../interfaces/models/Escuela.model');
const EscuelaEntity = require('../entities/Escuela');

async function obtenerEscuelaPorIdUC(id) {
    const resultado = await EscuelaModel.findByPk(id);
    if (!resultado) return null;

    return new EscuelaEntity(resultado.dataValues);
}

module.exports = obtenerEscuelaPorIdUC;