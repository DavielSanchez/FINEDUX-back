const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");

const Escuela = sequelize.define("Escuela", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    distrito_id: { type: DataTypes.INTEGER, allowNull: true },
    codigo_centro: { type: DataTypes.STRING, allowNull: false },
    codigo_dependencia: { type: DataTypes.STRING, allowNull: false },
    codigo_distrito: { type: DataTypes.STRING, allowNull: false },
    sector: { type: DataTypes.STRING, allowNull: false },
    ciudad: { type: DataTypes.STRING, allowNull: false },
    provincia: { type: DataTypes.STRING, allowNull: false },
    telefono: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'activo' }
}, {
    tableName: "Escuelas",
    timestamps: true,
    underscored: true
});

module.exports = Escuela;