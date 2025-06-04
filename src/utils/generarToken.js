const jwt = require('jsonwebtoken');

const generarToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '2d'
    });
};

module.exports = generarToken;