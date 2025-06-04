const Usuario = require('../models/Usuario.model');
const Escuela = require('../models/Escuela.model');
const bcrypt = require('bcryptjs');
const generarToken = require('../../utils/generarToken');

function AuthController() {
    return {
        listarUsuarios: async(req, res) => {
            try {
                const usuarios = await Usuario.findAll();
                res.status(200).json(usuarios);
            } catch (err) {
                res.status(500).json({ message: 'Error al obtener usuarios' });
            }
        },
        obtenerUsuarioPorId: async(req, res) => {
            const id = req.params.id;
            try {
                const usuario = await Usuario.findByPk(id);
                if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
                res.status(200).json(usuario);
            } catch (err) {
                res.status(500).json({ message: 'Error al obtener usuario' });
            }
        },
        login: async(req, res) => {
            const { nombre_usuario, contrasena } = req.body;

            try {
                const user = await Usuario.findOne({ where: { nombre_usuario } });

                if (!user) {
                    return res.status(401).json({ message: 'Usuario no encontrado' });
                }

                if (user.status !== 'activo') {
                    return res.status(403).json({ message: 'Usuario inactivo. Contacte al administrador.' });
                }

                const validPassword = await bcrypt.compare(contrasena, user.contrasena);

                if (!validPassword) {
                    return res.status(401).json({ message: 'Contraseña incorrecta' });
                }

                let escuelaNombre = null;
                if (user.escuela_id) {
                    const escuela = await Escuela.findByPk(user.escuela_id);
                    escuelaNombre = escuela ? escuela.nombre : null;
                }

                const token = generarToken({
                    id: user.id,
                    nombre_usuario: user.nombre_usuario,
                    nombre: user.nombres,
                    distrito_id: user.distrito_id || null,
                    rol: user.rol,
                    escuela_id: user.escuela_id,
                    escuela_nombre: escuelaNombre,
                    estado: user.status
                });

                res.status(200).json({
                    token,
                    user: {
                        id: user.id,
                        nombres: user.nombres,
                        apellidos: user.apellidos,
                        nombre_usuario: user.nombre_usuario,
                        email: user.email,
                        rol: user.rol,
                        estado: user.status,
                        escuela_nombre: escuelaNombre
                    }
                });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Error al iniciar sesión' });
            }
        },
        crearUsuario: async(req, res) => {
            try {
                const usuario = await Usuario.create(req.body);
                res.status(201).json(usuario);
            } catch (err) {
                res.status(400).json({ message: 'Error al crear usuario', error: err.message });
            }
        },
        actualizarUsuario: async(req, res) => {
            const id = req.params.id;
            try {
                const usuario = await Usuario.findByPk(id);
                if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

                await usuario.update(req.body);
                res.status(200).json(usuario);
            } catch (err) {
                res.status(400).json({ message: 'Error al actualizar usuario', error: err.message });
            }
        },
        eliminarUsuario: async(req, res) => {
            const id = req.params.id;
            try {
                const usuario = await Usuario.findByPk(id);
                if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

                await usuario.destroy();
                res.status(204).send();
            } catch (err) {
                res.status(500).json({ message: 'Error al eliminar usuario' });
            }
        },
    }
}

module.exports = AuthController