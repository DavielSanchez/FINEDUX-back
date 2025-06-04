const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");

const CuentasPorPagar = sequelize.define("CuentasPorPagar", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    factura_id: {
        type: DataTypes.INTEGER,
    },
    nombre_provedor: {
        type: DataTypes.STRING,
    },
    no_factura: {
        type: DataTypes.STRING,
    },
    fecha_factura: {
        type: DataTypes.DATE,
    },
    monto: {
        type: DataTypes.INTEGER,
    },
    avance: {
        type: DataTypes.BOOLEAN,
    },
    avance_monto: {
        type: DataTypes.INTEGER,
    },
    monto_neto: {
        type: DataTypes.INTEGER,
    },
    nota_credito: {
        type: DataTypes.BOOLEAN,
    },
    nota_credito_monto: {
        type: DataTypes.DECIMAL,
    },
    estado_pago: {
        type: DataTypes.STRING,
    },
    fecha_limite: {
        type: DataTypes.DATE,
    },
}, {
    tableName: "CuentasPorPagar",
    timestamps: false,
    underscored: true
});

module.exports = CuentasPorPagar;