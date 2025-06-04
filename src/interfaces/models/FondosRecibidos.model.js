const { DataTypes } = require('sequelize');
const { sequelize } = require("../../config/db");

const FondosRecibidos = sequelize.define('FondosRecibidos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    escuela_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fuente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo_fondo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    fecha_recepcion: {
        type: DataTypes.DATE,
        allowNull: true
    },
    monto: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    numero_referencia: {
        type: DataTypes.STRING,
        allowNull: true
    },
    comprobante_deposito: {
        type: DataTypes.STRING,
        allowNull: true
    },
    moneda: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'DOP'
    },
    cuenta_destino: {
        type: DataTypes.STRING,
        allowNull: true
    },
    trimestre: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    destino_contable: {
        type: DataTypes.STRING,
        allowNull: true
    },
    comentarios: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'FondosRecibidos',
    timestamps: true,
    underscored: true
});

module.exports = FondosRecibidos;