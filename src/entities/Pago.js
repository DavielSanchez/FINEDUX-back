export class Pago {
    constructor({
        id,
        escuela_id,
        cuenta_por_pagar_id,
        nombre_proveedor,
        no_factura,
        monto_factura,
        metodo_pago,
        monto,
        fecha_pago,
        referencia_pago,
        creado_en,
        actualizado_en
    }) {
        this.id = id;
        this.escuela_id = escuela_id;
        this.cuenta_por_pagar_id = cuenta_por_pagar_id;
        this.nombre_proveedor = nombre_proveedor;
        this.no_factura = no_factura;
        this.monto_factura = monto_factura;
        this.metodo_pago = metodo_pago;
        this.monto = monto;
        this.fecha_pago = fecha_pago;
        this.referencia_pago = referencia_pago;
        this.creado_en = creado_en;
        this.actualizado_en = actualizado_en;
    }
}