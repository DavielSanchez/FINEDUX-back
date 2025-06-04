const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/db");

const AsientosContables = sequelize.define("AsientosContables", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    escuela_id: {
        type: DataTypes.INTEGER,
    },
    descripcion: {
        type: DataTypes.STRING,
    },
    fecha: {
        type: DataTypes.DATE,
    },
}, {
    tableName: "AsientosContables",
    timestamps: false,
    underscored: true
});

module.exports = AsientosContables;