const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");

const OrdenCompraProducto = sequelize.define("OrdenCompraProducto", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    orden_compra_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nombre_producto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio_unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: "orden_compra_productos",
    timestamps: false,
    underscored: true
});

module.exports = OrdenCompraProducto;