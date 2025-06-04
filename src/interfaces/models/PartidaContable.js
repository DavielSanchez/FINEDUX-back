const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");

const PartidasContables = sequelize.define("PartidasContables", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    escuela_id: {
        type: DataTypes.INTEGER,
    },
    asiento_id: {
        type: DataTypes.INTEGER,
    },
    cuenta_id: {
        type: DataTypes.INTEGER,
    },
    debe: {
        type: DataTypes.DECIMAL,
    },
    haber: {
        type: DataTypes.DECIMAL,
    },
}, {
    tableName: "PartidasContables",
    timestamps: false,
    underscored: true
});

module.exports = PartidasContables;