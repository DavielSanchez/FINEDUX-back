const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");

const Pago = sequelize.define("Pago", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    escuela_id: {
        type: DataTypes.INTEGER,
    },
    cuenta_por_pagar_id: {
        type: DataTypes.INTEGER,
    },
    nombre_proveedor: {
        type: DataTypes.STRING,
    },
    no_factura: {
        type: DataTypes.STRING,
    },
    monto_factura: {
        type: DataTypes.DECIMAL,
    },
    metodo_pago: {
        type: DataTypes.STRING,
    },
    monto: {
        type: DataTypes.DECIMAL,
    },
    fecha_pago: {
        type: DataTypes.DATE,
    },
    referencia_pago: {
        type: DataTypes.STRING,
    },
    creado_en: {
        type: DataTypes.DATE,
    },
    actualizado_en: {
        type: DataTypes.DATE,
    },
}, {
    tableName: "Pagos",
    timestamps: false,
    underscored: true
});

module.exports = Pago;