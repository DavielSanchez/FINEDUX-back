const { DataTypes } = require('sequelize');
const { sequelize } = require("../../config/db");
const OrdenCompra = require("./OrdenCompra.model")

const Proveedor = sequelize.define('Proveedor', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    escuela_id: { type: DataTypes.INTEGER, allowNull: false },
    nombre: { type: DataTypes.STRING, allowNull: false },
    nombre_contacto: { type: DataTypes.STRING, allowNull: false },
    telefono_contacto: { type: DataTypes.STRING },
    rnc: { type: DataTypes.STRING, allowNull: false, unique: true },
    direccion: { type: DataTypes.STRING },
    telefono: { type: DataTypes.STRING }
}, {
    tableName: 'Proveedores',
    timestamps: true,
    underscored: true
});

module.exports = Proveedor;