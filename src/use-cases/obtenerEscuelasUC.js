const EscuelaModel = require('../interfaces/models/Escuela.model');
const EscuelaEntity = require('../entities/Escuela');

async function obtenerEscuelasUC() {
    const resultados = await EscuelaModel.findAll();
    return resultados.map((e) => new EscuelaEntity(e.dataValues));
}

module.exports = obtenerEscuelasUC;