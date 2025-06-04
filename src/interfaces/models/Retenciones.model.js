const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");

const Retenciones = sequelize.define("Retenciones", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    escuela_id: {
        type: DataTypes.INTEGER,
    },
    pago_id: {
        type: DataTypes.INTEGER,
    },
    tipo: {
        type: DataTypes.STRING,
    },
    monto: {
        type: DataTypes.DECIMAL,
    },
    porcentaje: {
        type: DataTypes.DECIMAL,
    },
    descripcion: {
        type: DataTypes.TEXT,
    },
    creado_en: {
        type: DataTypes.DATE,
    },
    actualizado_en: {
        type: DataTypes.DATE,
    },
}, {
    tableName: "Retenciones",
    timestamps: false,
    underscored: true
});

module.exports = Retenciones;