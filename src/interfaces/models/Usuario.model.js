const { DataTypes } = require('sequelize');
const { sequelize } = require("../../config/db");
const bcrypt = require('bcryptjs');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    escuela_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    distrito_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    nombres: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombre_usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.ENUM('administrador', 'gestor_distrital', 'gestor_escolar'),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('activo', 'inactivo'),
        defaultValue: 'activo',
        allowNull: false
    },
}, {
    tableName: 'Usuarios',
    timestamps: true,
    underscored: true
});

Usuario.beforeCreate(async(usuario, options) => {
    if (usuario.contrasena) {
        const salt = await bcrypt.genSalt(10);
        usuario.contrasena = await bcrypt.hash(usuario.contrasena, salt);
    }
});

Usuario.beforeUpdate(async(usuario, options) => {
    if (usuario.changed('contrasena')) {
        const salt = await bcrypt.genSalt(10);
        usuario.contrasena = await bcrypt.hash(usuario.contrasena, salt);
    }
});

module.exports = Usuario;