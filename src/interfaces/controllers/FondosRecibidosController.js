const FondosRecibidos = require('../models/FondosRecibidos.model')
const MovimientosFinancieros = require('../models/MovientosFinancieros.model');
const FinanzasResumen = require('../models/FianzasResumen.model');

function FondosRecibidosController() {
    return {
        obtenerTodos: async(req, res) => {
            try {
                const fondos = await FondosRecibidos.findAll();
                res.json(fondos);
            } catch (error) {
                res.status(500).json({ message: 'Error al obtener fondos', error });
            }
        },
        obtenerPorId: async(req, res) => {
            const id = req.params.id;
            if (!id) return res.status(400).json({ message: 'El parametro "id" es obligatorio' });
            try {
                const fondo = await FondosRecibidos.findByPk(id);
                if (!fondo) return res.status(404).json({ message: 'Fondo no encontrado' });
                res.json(fondo);
            } catch (error) {
                res.status(500).json({ message: 'Error al buscar fondo', error });
            }
        },
        crear: async(req, res) => {
            try {
                const nuevoFondo = await FondosRecibidos.create(req.body);

                await MovimientosFinancieros.create({
                    escuela_id: nuevoFondo.escuela_id,
                    fecha: nuevoFondo.fecha_recepcion,
                    tipo_movimiento: 'Fondo recibido',
                    referencia_id: nuevoFondo.id,
                    descripcion: nuevoFondo.descripcion || 'Fondo recibido',
                    monto: nuevoFondo.monto,
                    es_ingreso: true
                });

                await FinanzasResumen.increment({ saldo_disponible: nuevoFondo.monto }, { where: { escuela_id: nuevoFondo.escuela_id } });
                res.status(201).json(nuevoFondo);
            } catch (error) {
                res.status(500).json({ message: 'Error al crear fondo', error });
            }
        },
        actualizar: async(req, res) => {
            const id = req.params.id;
            if (!id) return res.status(400).json({ message: 'El parametro "id" es obligatorio' });

            try {
                const fondo = await FondosRecibidos.findByPk(id);
                if (!fondo) return res.status(404).json({ message: 'Fondo no encontrado' });

                const montoAnterior = fondo.monto;

                await fondo.update(req.body);

                await MovimientosFinancieros.update({
                    fecha: fondo.fecha,
                    descripcion: fondo.descripcion,
                    monto: fondo.monto
                }, {
                    where: {
                        tipo_movimiento: 'Fondo recibido',
                        referencia_id: fondo.id
                    }
                });

                const diferencia = fondo.monto - montoAnterior;
                await FinanzasResumen.increment({ total_disponible: diferencia }, { where: { escuela_id: fondo.escuela_id } });

                res.json(fondo);
            } catch (error) {
                res.status(500).json({ message: 'Error al actualizar fondo', error });
            }
        },
        eliminar: async(req, res) => {
            const id = req.params.id;
            if (!id) return res.status(400).json({ message: 'El parametro "id" es obligatorio' });

            try {
                const fondo = await FondosRecibidos.findByPk(id);
                if (!fondo) return res.status(404).json({ message: 'Fondo no encontrado' });

                const montoEliminado = fondo.monto;
                const escuelaId = fondo.escuela_id;

                await fondo.destroy();

                await MovimientosFinancieros.destroy({
                    where: {
                        tipo_movimiento: 'Fondo recibido',
                        referencia_id: fondo.id
                    }
                });

                await FinanzasResumen.increment({ saldo_disponible: -montoEliminado }, { where: { escuela_id: escuelaId } });

                res.json({ message: 'Fondo eliminado' });
            } catch (error) {
                res.status(500).json({ message: 'Error al eliminar fondo', error });
            }
        },
    }
}

module.exports = FondosRecibidosController