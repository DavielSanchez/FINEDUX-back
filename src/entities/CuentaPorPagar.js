export class CuentaPorPagar {
    constructor({
        id,
        factura_id,
        nombre_provedor,
        no_factura,
        fecha_factura,
        monto,
        avance,
        avance_monto,
        monto_neto,
        nota_credito,
        nota_credito_monto,
        estado_pago,
        fecha_limite,
        created_at,
        updated_at
    }) {
        this.id = id;
        this.factura_id = factura_id;
        this.nombre_provedor = nombre_provedor;
        this.no_factura = no_factura;
        this.fecha_factura = fecha_factura;
        this.monto = monto;
        this.avance = avance;
        this.avance_monto = avance_monto;
        this.monto_neto = monto_neto;
        this.nota_credito = nota_credito;
        this.nota_credito_monto = nota_credito_monto;
        this.estado_pago = estado_pago;
        this.fecha_limite = fecha_limite;
        this.created_at = created_at || new Date();
        this.updated_at = updated_at || new Date();
    }
}