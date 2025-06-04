const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");

const ReportesGenerados = sequelize.define("ReportesGenerados", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    escuela_id: {
        type: DataTypes.INTEGER,
    },
    generado_por_id: {
        type: DataTypes.INTEGER,
    },
    tipo_reporte: {
        type: DataTypes.STRING,
    },
    periodo: {
        type: DataTypes.STRING,
    },
    estado: {
        type: DataTypes.STRING,
    },
    fecha_generacion: {
        type: DataTypes.DATE,
    },
    url_documento: {
        type: DataTypes.STRING,
    },
    observaciones: {
        type: DataTypes.TEXT,
    },
    created_at: {
        type: DataTypes.DATE,
    },
    updated_at: {
        type: DataTypes.DATE,
    },
}, {
    tableName: "ReportesGenerados",
    timestamps: false,
    underscored: true
});

module.exports = ReportesGenerados;