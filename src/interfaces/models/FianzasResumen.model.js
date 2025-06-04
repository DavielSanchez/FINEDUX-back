const { DataTypes } = require('sequelize');
const { sequelize } = require("../../config/db");

const FinanzasResumen = sequelize.define('FinanzasResumen', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    escuela_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    periodo_fiscal: {
        type: DataTypes.STRING,
        allowNull: false, // Ej: "2025-Q2"
    },
    fondos_recibidos: {
        type: DataTypes.DECIMAL(12, 2),
        defaultValue: 0,
    },
    egresos_pagados: {
        type: DataTypes.DECIMAL(12, 2),
        defaultValue: 0,
    },
    compromisos_pendientes: {
        type: DataTypes.DECIMAL(12, 2),
        defaultValue: 0,
    },
    saldo_disponible: {
        type: DataTypes.DECIMAL(12, 2),
        defaultValue: 0,
    },
}, {
    tableName: 'finanzas_resumen',
    timestamps: true,
    indexes: [{
        fields: ['escuela_id', 'periodo_fiscal'],
        unique: true
    }]
});

module.exports = FinanzasResumen;