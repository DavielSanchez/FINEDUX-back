const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");

const TiposGastos = sequelize.define("TiposGastos", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    codigo: {
        type: DataTypes.STRING,
    },
    descripcion: {
        type: DataTypes.TEXT,
    },
    activo: {
        type: DataTypes.BOOLEAN,
    },
}, {
    tableName: "TiposGastos",
    timestamps: false,
    underscored: true
});

module.exports = TiposGastos;