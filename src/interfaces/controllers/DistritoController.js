const Distrito = require('../models/Distrito.model');

function DistritoController() {
    return {
        listar: async(req, res) => {
            try {
                const distritos = await Distrito.findAll();
                res.status(200).json(distritos);
            } catch (error) {
                res.status(500).json({ message: 'Error al obtener distritos', error });
            }
        },

        crear: async(req, res) => {
            const { nombre, codigo } = req.body;
            try {
                const nuevo = await Distrito.create({ nombre, codigo });
                res.status(201).json(nuevo);
            } catch (error) {
                res.status(500).json({ message: 'Error al crear distrito', error });
            }
        },

        actualizar: async(req, res) => {
            const { id } = req.params;
            const { nombre, codigo } = req.body;
            try {
                const distrito = await Distrito.findByPk(id);
                if (!distrito) return res.status(404).json({ message: 'Distrito no encontrado' });

                await distrito.update({ nombre, codigo });
                res.status(200).json(distrito);
            } catch (error) {
                res.status(500).json({ message: 'Error al actualizar distrito', error });
            }
        },

        eliminar: async(req, res) => {
            const { id } = req.params;
            try {
                const distrito = await Distrito.findByPk(id);
                if (!distrito) return res.status(404).json({ message: 'Distrito no encontrado' });

                await distrito.destroy();
                res.status(200).json({ message: 'Distrito eliminado' });
            } catch (error) {
                res.status(500).json({ message: 'Error al eliminar distrito', error });
            }
        }
    }
}

module.exports = DistritoController;