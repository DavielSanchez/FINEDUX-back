const { OrdenCompra, OrdenCompraProducto, Proveedor } = require('../models');
const { where, Op } = require('sequelize');
const { sequelize } = require("../../config/db");

function OrdenCompraController() {
    return {
        obtenerTodas: async(req, res) => {
            try {
                const ordenes = await OrdenCompra.findAll();
                res.status(200).json(ordenes);
            } catch (error) {
                res.status(500).json({ message: 'Error al obtener órdenes de compra', error });
            }
        },
        obtenerPorId: async(req, res) => {
            try {
                const orden = await OrdenCompra.findByPk(req.params.id, {
                    include: [{
                            model: Proveedor,
                            as: 'proveedor',
                            attributes: ['id', 'nombre', 'rnc', 'telefono', 'direccion']
                        },
                        {
                            model: OrdenCompraProducto,
                            as: 'productos',
                            attributes: ['id', 'nombre_producto', 'precio_unitario', 'cantidad', 'subtotal']
                        }
                    ]
                });

                if (!orden) {
                    return res.status(404).json({ message: 'Orden no encontrada' });
                }

                res.status(200).json(orden);
            } catch (error) {
                console.error("Error al obtener la orden:", error);
                res.status(500).json({ message: 'Error al obtener la orden', error });
            }
        },
        obtenerPorEscuela: async(req, res) => {
            const escuela_id = req.params.id;
            const nombre = req.query.nombre || '';

            try {
                // Buscar órdenes filtradas por nombre de proveedor
                const ordenes = await OrdenCompra.findAll({
                    where: { escuela_id },
                    include: [{
                        model: Proveedor,
                        as: 'proveedor',
                        where: {
                            nombre: {
                                [Op.iLike]: `%${nombre}%`
                            }
                        },
                        required: true,
                    }]
                });

                // Contar órdenes por estado
                const conteoEstados = await OrdenCompra.findAll({
                    where: { escuela_id },
                    attributes: [
                        'estado', [sequelize.fn('COUNT', sequelize.col('estado')), 'cantidad']
                    ],
                    group: ['estado']
                });

                const resumen = {
                    pendiente: 0,
                    completada: 0,
                    cancelada: 0
                };

                conteoEstados.forEach(e => {
                    resumen[e.estado] = parseInt(e.dataValues.cantidad);
                });

                // Si no hay órdenes filtradas, enviar mensaje + el resumen igual
                if (!ordenes || ordenes.length === 0) {
                    return res.status(200).json({
                        mensaje: 'Ningún proveedor coincide con la búsqueda.',
                        resumen
                    });
                }

                res.status(200).json({ ordenes, resumen });
            } catch (error) {
                console.error('Error al obtener las ordenes por escuela:', error);
                res.status(500).json({ mensaje: 'Error al obtener ordenes', error });
            }
        },
        obtenerOrdenesDisponibles: async(req, res) => {
            const escuela_id = req.params.id;

            try {
                const ordenes = await OrdenCompra.findAll({
                    where: {
                        estado: ['pendiente'],
                        escuela_id
                    },
                    attributes: ['id', 'fecha', 'total', 'estado'],
                    include: [{
                        model: Proveedor,
                        as: 'proveedor',
                        attributes: ['id', 'nombre', 'rnc']
                    }],
                    order: [
                        ['fecha', 'DESC']
                    ]
                });

                if (!ordenes || ordenes.length === 0) {
                    return res.status(200).json({ mensaje: 'No hay órdenes disponibles para esta escuela.' });
                }

                const resultado = ordenes.map(orden => ({
                    id: orden.id,
                    fecha: orden.fecha,
                    total: orden.total,
                    estado: orden.estado,
                    proveedor: {
                        id: orden.proveedor.id,
                        nombre: orden.proveedor.nombre,
                        rnc: orden.proveedor.rnc
                    }
                }));

                res.status(200).json(resultado);
            } catch (error) {
                console.error('Error al obtener las órdenes por escuela:', error);
                res.status(500).json({ mensaje: 'Error al obtener órdenes', error });
            }
        },
        Crear: async(req, res) => {
            const t = await sequelize.transaction();
            try {
                const { escuela_id, proveedor_id, productos } = req.body;

                if (!escuela_id || !proveedor_id || !Array.isArray(productos) || productos.length === 0) {
                    return res.status(400).json({
                        mensaje: "Faltan datos obligatorios o la lista de productos está vacía"
                    });
                }

                let total = 0;
                const productosConSubtotal = productos.map(p => {
                    const subtotal = parseFloat(p.precio_unitario) * parseInt(p.cantidad);
                    total += subtotal;
                    return {...p, subtotal };
                });

                const orden = await OrdenCompra.create({
                    escuela_id,
                    proveedor_id,
                    total,
                    estado: "pendiente",
                    fecha: new Date()
                }, { transaction: t });

                for (const p of productosConSubtotal) {
                    await OrdenCompraProducto.create({
                        orden_compra_id: orden.id,
                        // producto_id: p.producto_id,  <-- quítalo
                        nombre_producto: p.nombre_producto,
                        precio_unitario: p.precio_unitario,
                        cantidad: p.cantidad,
                        subtotal: p.subtotal
                    }, { transaction: t });
                }

                await t.commit();

                res.status(201).json({
                    mensaje: "Orden de compra creada correctamente",
                    orden_id: orden.id
                });

            } catch (error) {
                await t.rollback();
                res.status(500).json({
                    mensaje: "Error al crear la orden de compra",
                    error: error.message
                });
            }
        },
        actualizar: async(req, res) => {
            const ordenId = req.params.id;
            const { productos, ...datosOrden } = req.body;

            const t = await sequelize.transaction();

            try {
                const orden = await OrdenCompra.findByPk(ordenId);
                if (!orden) {
                    return res.status(404).json({ message: 'Orden no encontrada' });
                }

                if (req.body.escuela_id && req.body.escuela_id !== orden.escuela_id) {
                    return res.status(403).json({ message: 'No puedes modificar una orden de otra escuela' });
                }

                let total = 0;
                const productosConSubtotal = Array.isArray(productos) ?
                    productos.map(p => {
                        const subtotal = parseFloat(p.precio_unitario) * parseInt(p.cantidad);
                        total += subtotal;
                        return {...p, subtotal };
                    }) : [];

                await orden.update({...datosOrden, total }, { transaction: t });

                await OrdenCompraProducto.destroy({
                    where: { orden_compra_id: ordenId },
                    transaction: t
                });

                if (productosConSubtotal.length > 0) {
                    const nuevosProductos = productosConSubtotal.map(p => ({
                        ...p,
                        orden_compra_id: ordenId
                    }));

                    await OrdenCompraProducto.bulkCreate(nuevosProductos, { transaction: t });
                }

                await t.commit();

                const ordenFinal = await OrdenCompra.findByPk(ordenId, {
                    include: [{
                            model: Proveedor,
                            as: 'proveedor',
                            attributes: ['id', 'nombre', 'rnc']
                        },
                        {
                            model: OrdenCompraProducto,
                            as: 'productos'
                        }
                    ]
                });

                res.status(200).json(ordenFinal);
            } catch (error) {
                await t.rollback();
                console.error('Error al actualizar la orden:', error);
                res.status(500).json({ message: 'Error al actualizar la orden', error });
            }
        },
        ActualizarEstado: async(req, res) => {
            const { id } = req.params;
            const { nuevoEstado } = req.body;

            try {
                const orden = await OrdenCompra.findByPk(id, {
                    include: [{
                        model: Factura,
                        as: 'facturas'
                    }]
                });

                if (!orden) {
                    return res.status(404).json({ message: "Orden no encontrada" });
                }

                if (orden.estado === 'completada' && nuevoEstado === 'cancelada') {
                    return res.status(400).json({
                        message: "No se puede cancelar una orden que ya fue completada"
                    });
                }

                if (orden.estado === 'completada' && nuevoEstado === 'pendiente') {
                    const facturasActivas = orden.facturas?.filter(f => f.estado !== 'cancelada');
                    if (facturasActivas.length > 0) {
                        return res.status(400).json({
                            message: "No se puede revertir la orden a pendiente mientras tenga facturas activas"
                        });
                    }
                }

                orden.estado = nuevoEstado;
                await orden.save();

                res.json({ message: "Estado de la orden actualizado correctamente", orden });

            } catch (error) {
                res.status(500).json({
                    message: "Error al actualizar estado de la orden",
                    error: error.message
                });
            }
        },
        eliminar: async(req, res) => {
            try {
                const orden = await OrdenCompra.findByPk(req.params.id);

                if (!orden) {
                    return res.status(404).json({ message: 'Orden no encontrada' });
                }

                if (orden.estado === 'completada') {
                    return res.status(400).json({ message: 'No se puede cancelar una orden que ya fue completada' });
                }

                orden.estado = 'cancelada';
                await orden.save();

                res.status(200).json({ message: 'Orden cancelada correctamente', orden });

            } catch (error) {
                res.status(500).json({ message: 'Error al cancelar la orden', error: error.message });
            }
        },
    }
}

module.exports = OrdenCompraController