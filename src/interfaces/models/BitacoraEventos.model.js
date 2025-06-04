const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");

const BitacoraEventos = sequelize.define("BitacoraEventos", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    usuario_id: {
        type: DataTypes.INTEGER,
    },
    escuela_id: {
        type: DataTypes.INTEGER,
    },
    fecha: {
        type: DataTypes.DATE,
    },
    modulo: {
        type: DataTypes.STRING,
    },
    accion: {
        type: DataTypes.STRING,
    },
    entidad_afectada_id: {
        type: DataTypes.INTEGER,
    },
    descripcion: {
        type: DataTypes.TEXT,
    },
    ip_origen: {
        type: DataTypes.STRING,
    },
    navegador: {
        type: DataTypes.STRING,
    },
}, {
    tableName: "BitacoraEventos",
    timestamps: false,
    underscored: true
});

module.exports = BitacoraEventos;