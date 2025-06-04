const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");

const Cheque = sequelize.define("Cheque", {
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
    nombre_proveedor: {
        type: DataTypes.STRING,
    },
    monto: {
        type: DataTypes.INTEGER,
    },
    monto_escrito: {
        type: DataTypes.STRING,
    },
    detalle: {
        type: DataTypes.STRING,
    },
    numero_cheque: {
        type: DataTypes.STRING,
    },
    banco_emisor: {
        type: DataTypes.STRING,
    },
}, {
    tableName: "Cheques",
    timestamps: false,
    underscored: true
});

module.exports = Cheque;