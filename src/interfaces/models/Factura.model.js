const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");

const Factura = sequelize.define("Factura", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    escuela_id: {
        type: DataTypes.INTEGER,
    },
    proveedor_id: {
        type: DataTypes.INTEGER,
    },
    orden_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'orden_compras',
            key: 'id'
        }
    },
    proveedor_rnc: {
        type: DataTypes.STRING,
    },
    no_factura: {
        type: DataTypes.STRING,
    },
    ncf: {
        type: DataTypes.STRING,
    },
    fecha_emision: {
        type: DataTypes.DATE,
    },
    vencimiento: {
        type: DataTypes.DATE,
    },
    estado: {
        type: DataTypes.ENUM("pendiente", "procesando", "completada", "cancelada"),
        defaultValue: "pendiente"
    },
    monto_subtotal: {
        type: DataTypes.DECIMAL,
    },
    impuesto_total: {
        type: DataTypes.DECIMAL,
    },
    retencion_itbis: {
        type: DataTypes.DECIMAL,
    },
    retencion_otros: {
        type: DataTypes.DECIMAL,
    },
    total_a_pagar: {
        type: DataTypes.DECIMAL,
    },
    created_at: {
        type: DataTypes.DATE,
    },
    updated_at: {
        type: DataTypes.DATE,
    }
}, {
    tableName: "Facturas",
    timestamps: false,
    underscored: true
});

module.exports = Factura;