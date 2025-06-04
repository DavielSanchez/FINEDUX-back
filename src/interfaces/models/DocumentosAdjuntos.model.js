const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");

const DocumentosAdjuntos = sequelize.define("DocumentosAdjuntos", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    factura_id: {
        type: DataTypes.INTEGER,
    },
    url_archivo: {
        type: DataTypes.STRING,
    },
    descripcion: {
        type: DataTypes.STRING,
    },
}, {
    tableName: "DocumentosAdjuntos",
    timestamps: false,
    underscored
});

module.exports = DocumentosAdjuntos;