const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");

const NotaCredito = sequelize.define("NotaCredito", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    factura_id: {
        type: DataTypes.INTEGER,
    },
    escuela_id: {
        type: DataTypes.INTEGER,
    },
    fecha: {
        type: DataTypes.DATE,
    },
    monto: {
        type: DataTypes.DECIMAL,
    },
    motivo: {
        type: DataTypes.TEXT,
    },
    creado_en: {
        type: DataTypes.DATE,
    },
    actualizado_en: {
        type: DataTypes.DATE,
    },
}, {
    tableName: "NotasCredito",
    timestamps: false,
    underscored: true
});

module.exports = NotaCredito;