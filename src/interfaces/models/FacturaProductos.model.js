const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");

const FacturaProductos = sequelize.define("FacturaProductos", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    factura_id: {
        type: DataTypes.INTEGER,
    },
    descripcion: {
        type: DataTypes.TEXT,
    },
    cantidad: {
        type: DataTypes.INTEGER,
    },
    precio_unitario: {
        type: DataTypes.DECIMAL,
    },
    precio_total: {
        type: DataTypes.DECIMAL,
    },
    impuesto: {
        type: DataTypes.DECIMAL,
    },
    impuesto_porcentaje: {
        type: DataTypes.DECIMAL,
    },
    precio_total_sin_itbis: {
        type: DataTypes.DECIMAL,
    },
    itbis_monto: {
        type: DataTypes.DECIMAL,
    },
    precio_total_con_itbis: {
        type: DataTypes.DECIMAL,
    }
}, {
    tableName: "FacturaProductos",
    timestamps: false,
    underscored: true
});

module.exports = FacturaProductos;