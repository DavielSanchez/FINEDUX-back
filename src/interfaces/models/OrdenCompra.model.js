const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");

const OrdenCompra = sequelize.define("orden_compras", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    escuela_id: { type: DataTypes.INTEGER, allowNull: false },
    proveedor_id: { type: DataTypes.INTEGER, allowNull: false },
    fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    total: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0.00 },
    estado: {
        type: DataTypes.ENUM("pendiente", "procesando", "completada", "cancelada"),
        defaultValue: "pendiente"
    }
}, {
    tableName: "orden_compras",
    timestamps: false,
    underscored: true,
});

module.exports = OrdenCompra;