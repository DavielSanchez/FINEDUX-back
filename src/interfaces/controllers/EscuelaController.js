// const Escuela = require("../../entities/Escuela")
const { where, Op } = require('sequelize');
const Escuela = require('../models/Escuela.model.js')
const obtenerEscuelasUC = require('../../use-cases/obtenerEscuelasUC.js');
const obtenerEscuelaPorIdUC = require('../../use-cases/obtenerEscuelaPorIdUC.js');
const crearEscuelaUC = require('../../use-cases/crearEscuelaUC.js')

function EscuelaController() {
    return {

        obtenerEscuelas: async(req, res) => {
            try {
                const escuelas = await obtenerEscuelasUC();
                res.status(200).json(escuelas);
            } catch (error) {
                console.error("Error al obtener escuelas:", error);
                res.status(500).json({ error: "Error del servidor" });
            }
        },
        obtenerPorId: async(req, res) => {
            const id = req.params.id
            try {
                const escuela = await obtenerEscuelaPorIdUC(id)
                res.status(200).json(escuela);
            } catch (error) {
                console.error("Error al obtener escuelas:", error);
                res.status(500).json({ error: "Error del servidor" });
            }
        },
        obtenerPorNombre: async(req, res) => {
            const nombre = req.params.nombre
            try {
                const escuela = await Escuela.findAll({
                    where: {
                        nombre: {
                            [Op.iLike]: `%${nombre}%`
                        }
                    }
                })
                res.status(200).json(escuela);
            } catch (error) {
                console.error("Error al obtener escuelas:", error);
                res.status(500).json({ error: "Error del servidor" });
            }
        },
        obtenerPorCodigoCentro: async(req, res) => {
            const codigo = req.params.codigo
            try {
                const escuela = await Escuela.findAll({
                    where: {
                        codigo_centro: {
                            [Op.iLike]: `%${codigo}%`
                        }
                    }
                })
                res.status(200).json(escuela);
            } catch (error) {
                console.error("Error al obtener escuelas:", error);
                res.status(500).json({ error: "Error del servidor" });
            }
        },
        obtenerPorCodigoDependencia: async(req, res) => {
            const codigo = req.params.codigo
            try {
                const escuela = await Escuela.findAll({ where: { codigo_dependencia: codigo } })
                res.status(200).json(escuela);
            } catch (error) {
                console.error("Error al obtener escuelas:", error);
                res.status(500).json({ error: "Error del servidor" });
            }
        },
        obtenerPorCodigoDistrito: async(req, res) => {
            const codigo = req.params.codigo
            try {
                const escuela = await Escuela.findAll({ where: { codigo_distrito: codigo } })
                res.status(200).json(escuela);
            } catch (error) {
                console.error("Error al obtener escuelas:", error);
                res.status(500).json({ error: "Error del servidor" });
            }
        },
        crearEscuela: async(req, res) => {
            try {
                const result = await crearEscuelaUC(req.body);
                res.status(201).json(result);
            } catch (err) {
                console.error(err); // <--- Agrega esta línea para ver el error completo en consola
                res.status(400).json({ error: err.message, stack: err.stack, original: err.original });
            }
        },
        actualizar: async(req, res) => {
            const id = req.params.id;
            try {
                const escuela = await Escuela.findByPk(id);
                if (!escuela) return res.status(404).json({ error: 'Escuela no encontrada' });

                await escuela.update(req.body);
                res.status(200).json(escuela);
            } catch (error) {
                console.error("Error al actualizar escuela:", error);
                res.status(500).json({ error: "Error del servidor al actualizar escuela" });
            }
        },
        borrarEscuela: async(req, res) => {
            const id = req.params.id
            try {
                const escuela = await Escuela.destroy({ where: { id: id } })
                res.status(200).json(escuela);
            } catch (error) {
                console.error("Error al obtener escuelas:", error);
                res.status(500).json({ error: "Error del servidor" });
            }
        },

    };
}

module.exports = EscuelaController