const { where, Op } = require('sequelize');
const Proveedor = require('../models/Proveedor.model')

function ProveedoresController() {
    return {
        obtenerTodos: async(req, res) => {
            try {
                const proveedores = await Proveedor.findAll();
                res.status(200).json(proveedores);
            } catch (error) {
                res.status(500).json({ mensaje: 'Error al obtener proveedores', error });
            }
        },
        obtenerPorId: async(req, res) => {
            try {
                const proveedor = await Proveedor.findByPk(req.params.id);
                if (!proveedor) {
                    return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
                }
                res.status(200).json(proveedor);
            } catch (error) {
                res.status(500).json({ mensaje: 'Error al obtener proveedor', error });
            }
        },
        obtenerPorNombre: async(req, res) => {
            try {
                const proveedor = await Proveedor.findAll({
                    where: {
                        nombre: {
                            [Op.iLike]: `%${req.params.nombre}%`
                        }
                    }
                });
                if (!proveedor || proveedor.length === 0) {
                    return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
                }
                res.status(200).json(proveedor);
            } catch (error) {
                console.error('Error al obtener proveedor por nombre:', error); // ← agrega esto
                res.status(500).json({ mensaje: 'Error al obtener proveedor', error });
            }
        },
        obtenerPorEscuela: async(req, res) => {
            const escuela_id = req.params.id;
            const nombre = req.query.nombre || '';

            try {
                // Buscar todos los proveedores de la escuela (sin filtro de nombre)
                const todosProveedores = await Proveedor.findAll({
                    where: { escuela_id: escuela_id }
                });

                // Si no hay ninguno registrado para la escuela
                if (!todosProveedores || todosProveedores.length === 0) {
                    return res.status(200).json({ mensaje: 'No hay proveedores disponibles para esta escuela.' });
                }

                // Si hay proveedores, aplicar filtro por nombre
                const proveedoresFiltrados = await Proveedor.findAll({
                    where: {
                        escuela_id: escuela_id,
                        nombre: {
                            [Op.iLike]: `%${nombre}%`
                        }
                    }
                });

                // Si no hay coincidencias con el filtro
                if (!proveedoresFiltrados || proveedoresFiltrados.length === 0) {
                    return res.status(200).json({ mensaje: 'Ningún proveedor coincide con la búsqueda.' });
                }

                // Devolver coincidencias
                res.status(200).json(proveedoresFiltrados);
            } catch (error) {
                console.error('Error al obtener proveedores por escuela:', error);
                res.status(500).json({ mensaje: 'Error al obtener proveedores', error });
            }
        },
        crear: async(req, res) => {
            try {
                const nuevoProveedor = await Proveedor.create(req.body);
                res.status(201).json(nuevoProveedor);
            } catch (error) {
                res.status(400).json({ mensaje: 'Error al crear proveedor', error });
            }
        },
        actualizar: async(req, res) => {
            try {
                const proveedor = await Proveedor.findByPk(req.params.id);
                if (!proveedor) {
                    return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
                }
                await proveedor.update(req.body);
                res.status(200).json(proveedor);
            } catch (error) {
                res.status(400).json({ mensaje: 'Error al actualizar proveedor', error });
            }
        },
        eliminar: async(req, res) => {
            try {
                const proveedor = await Proveedor.findByPk(req.params.id);
                if (!proveedor) {
                    return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
                }
                await proveedor.destroy();
                res.status(200).json({ mensaje: 'Proveedor eliminado correctamente' });
            } catch (error) {
                res.status(500).json({ mensaje: 'Error al eliminar proveedor', error });
            }
        },
    }
}

module.exports = ProveedoresController