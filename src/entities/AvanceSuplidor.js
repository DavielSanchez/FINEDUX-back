export class AvanceSuplidor {
    constructor({
        id,
        proveedor_id,
        escuela_id,
        monto,
        fecha,
        descripcion,
        balance,
        estado,
        creado_en,
        actualizado_en
    }) {
        this.id = id;
        this.proveedor_id = proveedor_id;
        this.escuela_id = escuela_id;
        this.monto = monto;
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.balance = balance;
        this.estado = estado;
        this.creado_en = creado_en;
        this.actualizado_en = actualizado_en;
    }
}