const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");

const Distrito = sequelize.define("Distrito", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    codigo: { type: DataTypes.STRING, allowNull: false },
}, {
    tableName: "Distritos",
    timestamps: true,
    underscored: true
});

module.exports = Distrito;