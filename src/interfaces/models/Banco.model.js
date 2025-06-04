const { DataTypes } = require('sequelize');
const { sequelize } = require("../../config/db");

const Banco = sequelize.define('Banco', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    escuela_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    balance: {
        type: DataTypes.DECIMAL
    },
    descripcion: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'Banco',
    timestamps: false,
    underscored: true
});

module.exports = Banco;