const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario.model');

const protect = async(req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: 'No autorizado' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Usuario.findByPk(decoded.id);

        if (!user) return res.status(401).json({ message: 'Usuario no válido' });

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user.rol !== 'administrador') {
        return res.status(403).json({ message: 'Acceso denegado: solo administradores' });
    }
    next();
};

module.exports = { protect, isAdmin };