const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");

const CuentasContables = sequelize.define("CuentasContables", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    codigo: {
        type: DataTypes.STRING,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    tipo: {
        type: DataTypes.STRING,
    },
}, {
    tableName: "CuentasContables",
    timestamps: false,
    underscored: true
});

module.exports = CuentasContables;