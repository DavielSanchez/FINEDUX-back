const EscuelaModel = require('../interfaces/models/Escuela.model');
const EscuelaEntity = require('../entities/Escuela');

async function obtenerEscuelasPorNombreUC(name) {
    const resultados = await EscuelaModel.findAll({
        where: {
            nombre: {
                [Op.iLike]: `%${name}%`
            }
        }
    });
    return resultados.map((e) => new EscuelaEntity(e.dataValues));
}

module.exports = obtenerEscuelasPorNombreUC;