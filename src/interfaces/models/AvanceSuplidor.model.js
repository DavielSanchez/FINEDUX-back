const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");

const AvancesSuplidor = sequelize.define("AvancesSuplidor", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    proveedor_id: {
        type: DataTypes.INTEGER,
    },
    escuela_id: {
        type: DataTypes.INTEGER,
    },
    monto: {
        type: DataTypes.DECIMAL,
    },
    fecha: {
        type: DataTypes.DATE,
    },
    descripcion: {
        type: DataTypes.TEXT,
    },
    balance: {
        type: DataTypes.DECIMAL,
    },
    estado: {
        type: DataTypes.STRING,
    },
    creado_en: {
        type: DataTypes.DATE,
    },
    actualizado_en: {
        type: DataTypes.DATE,
    },
}, {
    tableName: "AvancesSuplidor",
    timestamps: false,
    underscored: true
});

module.exports = AvancesSuplidor;