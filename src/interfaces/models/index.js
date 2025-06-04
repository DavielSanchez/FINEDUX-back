const Proveedor = require("./Proveedor.model");
const OrdenCompra = require("./OrdenCompra.model");
const OrdenCompraProducto = require("./OrdenCompraProducto.model")
const Factura = require('./Factura.model');
const FacturaProductos = require('./FacturaProductos.model');

// Aquí se hacen las asociaciones:
Proveedor.hasMany(OrdenCompra, { foreignKey: 'proveedor_id', as: 'ordenes' });
OrdenCompra.belongsTo(Proveedor, { foreignKey: 'proveedor_id', as: 'proveedor' });
Factura.hasMany(FacturaProductos, { foreignKey: "factura_id" });
FacturaProductos.belongsTo(Factura, { foreignKey: "factura_id" });
OrdenCompra.hasMany(OrdenCompraProducto, { foreignKey: "orden_compra_id", as: "productos" });
OrdenCompraProducto.belongsTo(OrdenCompra, { foreignKey: "orden_compra_id", as: "orden" });
Factura.belongsTo(OrdenCompra, { foreignKey: "orden_id", as: "orden" });
OrdenCompra.hasOne(Factura, { foreignKey: "orden_id", as: "factura" });
Factura.belongsTo(Proveedor, { foreignKey: 'proveedor_id', as: 'proveedor' });


module.exports = {
    Proveedor,
    OrdenCompra,
    OrdenCompraProducto,
    Factura,
    FacturaProductos,
};