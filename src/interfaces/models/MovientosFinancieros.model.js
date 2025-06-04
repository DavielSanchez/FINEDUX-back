const { DataTypes } = require('sequelize');
const { sequelize } = require("../../config/db");

const MovimientosFinancieros = sequelize.define('MovimientosFinancieros', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    escuela_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    tipo_movimiento: {
        type: DataTypes.STRING,
        allowNull: false, // ej: "Fondo recibido", "Pago a proveedor"
    },
    referencia_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // ID de la tabla relacionada (opcional)
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    monto: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
    },
    es_ingreso: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {
    tableName: 'movimientos_financieros',
    timestamps: true,
});

module.exports = MovimientosFinancieros;