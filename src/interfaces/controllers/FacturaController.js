const { where, Op } = require('sequelize');
const { sequelize } = require("../../config/db");
const { Factura, FacturaProductos, OrdenCompra, OrdenCompraProducto, Proveedor } = require("../models");
const MovimientosFinancieros = require("../models/MovientosFinancieros.model");

module.exports = {
    obtenerTodas: async(req, res) => {
        try {
            const facturas = await Factura.findAll({ include: FacturaProductos });
            res.json({ count: facturas.length, data: facturas });
        } catch (err) {
            res.status(500).json({ message: "Error al obtener facturas", error: err.message });
        }
    },

    obtenerPorEscuela: async(req, res) => {
        const escuela_id = req.params.escuela_id;

        try {
            const facturas = await Factura.findAll({
                where: { escuela_id },
                include: [{
                        model: FacturaProductos
                    },
                    {
                        model: Proveedor,
                        as: "proveedor",
                        attributes: ['id', 'nombre', 'rnc', 'telefono', 'direccion']
                    }
                ]
            });

            // Contar facturas por estado
            const conteoEstados = await Factura.findAll({
                where: { escuela_id },
                attributes: [
                    'estado', [sequelize.fn('COUNT', sequelize.col('estado')), 'cantidad']
                ],
                group: ['estado']
            });

            const resumen = {
                pendiente: 0,
                pagada: 0,
                cancelada: 0
            };

            // Llenar resumen con datos reales
            conteoEstados.forEach(e => {
                resumen[e.estado] = parseInt(e.dataValues.cantidad);
            });

            res.status(200).json({ count: facturas.length, data: facturas, resumen });
        } catch (err) {
            console.error('Error al obtener facturas por escuela:', err);
            res.status(500).json({
                message: "Error al obtener facturas por escuela",
                error: err.message
            });
        }
    },

    obtenerPorNCF: async(req, res) => {
        try {
            const facturas = await Factura.findAll({
                where: { ncf: req.params.ncf },
                include: FacturaProductos
            });
            res.json({ count: facturas.length, data: facturas });
        } catch (err) {
            res.status(500).json({ message: "Error al obtener facturas por NCF", error: err.message });
        }
    },

    obtenerPorProveedorNombre: async(req, res) => {
        try {
            const facturas = await Factura.findAll({
                include: [{
                        model: Proveedor,
                        as: 'proveedor',
                        where: { nombre: req.params.nombre }
                    },
                    FacturaProductos
                ]
            });
            res.json({ count: facturas.length, data: facturas });
        } catch (err) {
            res.status(500).json({ message: "Error al obtener facturas por nombre de proveedor", error: err.message });
        }
    },

    obtenerPorProveedorRNC: async(req, res) => {
        try {
            const facturas = await Factura.findAll({
                where: { proveedor_rnc: req.params.rnc },
                include: FacturaProductos
            });
            res.json({ count: facturas.length, data: facturas });
        } catch (err) {
            res.status(500).json({ message: "Error al obtener facturas por RNC de proveedor", error: err.message });
        }
    },

    obtenerPorId: async(req, res) => {
        try {
            const factura = await Factura.findByPk(req.params.id, {
                include: FacturaProductos
            });
            if (!factura) return res.status(404).json({ message: "Factura no encontrada" });
            res.json({ count: 1, data: factura });
        } catch (err) {
            res.status(500).json({ message: "Error al obtener factura por ID", error: err.message });
        }
    },

    obtenerPorActivas: async(req, res) => {
        try {
            const facturas = await Factura.findAll({
                where: { estado: "activa" },
                include: FacturaProductos
            });
            res.json({ count: facturas.length, data: facturas });
        } catch (err) {
            res.status(500).json({ message: "Error al obtener facturas activas", error: err.message });
        }
    },

    obtenerPorCanceladas: async(req, res) => {
        try {
            const facturas = await Factura.findAll({
                where: { estado: "cancelada" },
                include: FacturaProductos
            });
            res.json({ count: facturas.length, data: facturas });
        } catch (err) {
            res.status(500).json({ message: "Error al obtener facturas canceladas", error: err.message });
        }
    },
    obtenerPorRangoFecha: async(req, res) => {
        const { desde, hasta } = req.query;
        try {
            const facturas = await Factura.findAll({
                where: {
                    fecha_emision: {
                        [Op.between]: [new Date(desde), new Date(hasta)]
                    }
                },
                include: FacturaProductos
            });
            res.json({ count: facturas.length, data: facturas });
        } catch (err) {
            res.status(500).json({ message: "Error al obtener facturas por rango de fecha", error: err.message });
        }
    },

    // Crear: async(req, res) => {
    //     const t = await sequelize.transaction();
    //     try {
    //         const {
    //             proveedor_rnc,
    //             no_factura,
    //             ncf,
    //             fecha_emision,
    //             fecha_vencimiento,
    //             escuela_id,
    //             proveedor_id,
    //             orden_id,
    //             estado,
    //             productos
    //         } = req.body;

    //         if (!productos || !Array.isArray(productos) || productos.length === 0) {
    //             return res.status(400).json({ error: "Debe incluir al menos un producto." });
    //         }

    //         // Calcular totales
    //         let monto_subtotal = 0;
    //         let impuesto_total = 0;
    //         let retencion_itbis = 0;
    //         let retencion_otros = 0; // puedes modificar según necesidad

    //         const productosProcesados = productos.map(p => {
    //             const total_sin_itbis = p.precio_unitario * p.cantidad;
    //             const itbis_monto = p.itbis || 0;
    //             const total_con_itbis = total_sin_itbis + itbis_monto;

    //             monto_subtotal += total_sin_itbis;
    //             impuesto_total += itbis_monto;

    //             return {
    //                 factura_id: null, // temporal
    //                 descripcion: p.descripcion || `Producto ${p.producto_id}`,
    //                 cantidad: p.cantidad,
    //                 precio_unitario: p.precio_unitario,
    //                 precio_total: total_sin_itbis,
    //                 impuesto: itbis_monto,
    //                 impuesto_porcentaje: (itbis_monto / total_sin_itbis) * 100 || 0,
    //                 precio_total_sin_itbis: total_sin_itbis,
    //                 itbis_monto,
    //                 precio_total_con_itbis: total_con_itbis,
    //             };
    //         });

    //         const total_a_pagar = monto_subtotal + impuesto_total - retencion_itbis - retencion_otros;

    //         // Crear factura
    //         const nuevaFactura = await Factura.create({
    //             escuela_id,
    //             proveedor_id,
    //             orden_id,
    //             proveedor_rnc,
    //             no_factura,
    //             ncf,
    //             fecha_emision,
    //             vencimiento: fecha_vencimiento,
    //             estado,
    //             monto_subtotal,
    //             impuesto_total,
    //             retencion_itbis,
    //             retencion_otros,
    //             total_a_pagar,
    //             created_at: new Date(),
    //             updated_at: new Date()
    //         }, { transaction: t });

    //         // Insertar productos asociados
    //         for (const producto of productosProcesados) {
    //             producto.factura_id = nuevaFactura.id;
    //             await FacturaProductos.create(producto, { transaction: t });
    //         }

    //         // Registrar movimiento financiero
    //         await MovimientosFinancieros.create({
    //             escuela_id,
    //             fecha: new Date(),
    //             tipo_movimiento: "Registro de factura de proveedor",
    //             referencia_id: nuevaFactura.id,
    //             descripcion: `Factura #${no_factura} del proveedor RNC ${proveedor_rnc}`,
    //             monto: total_a_pagar,
    //             es_ingreso: false,
    //         }, { transaction: t });

    //         await t.commit();
    //         return res.status(201).json({ message: "Factura registrada correctamente", factura_id: nuevaFactura.id });

    //     } catch (error) {
    //         await t.rollback();
    //         console.error("Error al crear la factura:", error);
    //         return res.status(500).json({ error: "Error interno al crear la factura" });
    //     }
    // },

    Crear: async(req, res) => {
        const { orden_id, fecha_emision, vencimiento, ncf, no_factura } = req.body;

        const t = await sequelize.transaction();

        try {
            if (!fecha_emision || !vencimiento || !ncf || !no_factura) {
                throw new Error("Debes enviar fecha_emision, vencimiento, ncf y no_factura");
            }

            const orden = await OrdenCompra.findByPk(orden_id, { transaction: t });
            if (!orden) throw new Error("Orden de compra no encontrada");

            if (orden.estado !== 'pendiente') {
                return res.status(400).json({ error: 'Solo se puede generar factura desde una orden pendiente' });
            }

            const facturasRelacionadas = await Factura.findAll({
                where: { orden_id },
                transaction: t
            });

            const todasCanceladas = facturasRelacionadas.length > 0 && facturasRelacionadas.every(f => f.estado === 'cancelada');

            if (!todasCanceladas) {
                const algunaActiva = facturasRelacionadas.some(f => ['pendiente', 'procesando', 'completada'].includes(f.estado));
                if (algunaActiva) {
                    return res.status(400).json({ error: 'Ya existe una factura activa para esta orden' });
                }
            }

            const productos = await OrdenCompraProducto.findAll({
                where: { orden_compra_id: orden_id },
                transaction: t
            });

            if (productos.length === 0) throw new Error("La orden no tiene productos");

            const proveedor = await Proveedor.findByPk(orden.proveedor_id, { transaction: t });
            if (!proveedor) throw new Error("Proveedor no encontrado");

            // Cálculos
            const monto_subtotal = productos.reduce((sum, p) => sum + parseFloat(p.subtotal), 0);
            const impuesto_total = monto_subtotal * 0.18;
            const retencion_itbis = 0;
            const retencion_otros = 0;
            const total_a_pagar = monto_subtotal + impuesto_total - retencion_itbis - retencion_otros;

            const now = new Date();

            const factura = await Factura.create({
                orden_id: orden.id,
                escuela_id: orden.escuela_id,
                proveedor_id: orden.proveedor_id,
                proveedor_rnc: proveedor.rnc,
                fecha_emision,
                vencimiento,
                ncf,
                no_factura,
                monto_subtotal,
                impuesto_total,
                retencion_itbis,
                retencion_otros,
                total_a_pagar,
                estado: "pendiente",
                created_at: now,
                updated_at: now
            }, { transaction: t });

            for (const p of productos) {
                await FacturaProductos.create({
                    factura_id: factura.id,
                    nombre_producto: p.nombre_producto,
                    descripcion: p.nombre_producto,
                    precio_unitario: p.precio_unitario,
                    cantidad: p.cantidad,
                    subtotal: p.subtotal
                }, { transaction: t });
            }

            await orden.update({ estado: "completada" }, { transaction: t });

            await t.commit();
            res.status(201).json({ mensaje: "Factura creada correctamente", factura });

        } catch (error) {
            await t.rollback();
            console.error("Error al crear factura:", error);
            res.status(400).json({
                mensaje: "Error al crear factura",
                error: error.message || error.toString()
            });
        }
    },


    Actualizar: async(req, res) => {
        try {
            const factura = await Factura.findByPk(req.params.id);
            if (!factura) return res.status(404).json({ message: "Factura no encontrada" });

            await factura.update(req.body);
            const facturaActualizada = await Factura.findByPk(factura.id, { include: FacturaProductos });

            res.json({ message: "Factura actualizada", count: 1, data: facturaActualizada });
        } catch (err) {
            res.status(500).json({ message: "Error al actualizar factura", error: err.message });
        }
    },

    Eliminar: async(req, res) => {
        try {
            const factura = await Factura.findByPk(req.params.id, { include: ['orden'] });
            if (!factura) {
                return res.status(404).json({ message: "Factura no encontrada" });
            }

            if (factura.estado === 'cancelada') {
                return res.status(400).json({ message: "No se puede cancelar una factura que ya fue cancelada" });
            }

            if (factura.estado !== 'pendiente') {
                return res.status(400).json({ message: "Solo se pueden cancelar facturas con estado 'pendiente'" });
            }

            factura.estado = 'cancelada';
            await factura.save();

            if (factura.orden) {
                factura.orden.estado = 'pendiente';
                await factura.orden.save();
            }

            res.json({ message: "Factura cancelada correctamente", factura });
        } catch (err) {
            res.status(500).json({ message: "Error al cancelar factura", error: err.message });
        }
    }
};