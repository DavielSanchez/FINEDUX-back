export class OrdenCompra {
    constructor({
        id,
        escuela_id,
        proveedor_id,
        fecha,
        total,
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
        this.fecha = fecha;
        this.total = total;
        this.estado = estado;
        this.producto = producto;
        this.precio_unitario = precio_unitario;
        this.cantidad = cantidad;
        this.precio = precio;
        this.created_at = created_at || new Date();
        this.updated_at = updated_at || new Date();
    }
}