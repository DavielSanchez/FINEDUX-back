export class Factura {
    constructor({
        id,
        escuela_id,
        proveedor_id,
        orden_id,
        proveedor_rnc,
        no_factura,
        ncf,
        monto,
        fecha_emision,
        vencimiento,
        estado,
        producto,
        precio_unitario,
        cantidad,
        precio,
        created_at,
        updated_at
    }) {
        this.id = id;
        this.escuela_id = escuela_id;
        this.proveedor_id = proveedor_id;
        this.orden_id = orden_id;
        this.proveedor_rnc = proveedor_rnc;
        this.no_factura = no_factura;
        this.ncf = ncf;
        this.monto = monto;
        this.fecha_emision = fecha_emision;
        this.vencimiento = vencimiento;
        this.estado = estado;
        this.producto = producto;
        this.precio_unitario = precio_unitario;
        this.cantidad = cantidad;
        this.precio = precio;
        this.created_at = created_at || new Date();
        this.updated_at = updated_at || new Date();
    }
}