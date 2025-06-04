export class Cheque {
    constructor({
        id,
        escuela_id,
        pago_id,
        nombre_proveedor,
        monto,
        monto_escrito,
        detalle,
        numero_cheque,
        banco_emisor,
        created_at,
        updated_at
    }) {
        this.id = id;
        this.escuela_id = escuela_id;
        this.pago_id = pago_id;
        this.nombre_proveedor = nombre_proveedor;
        this.monto = monto;
        this.monto_escrito = monto_escrito;
        this.detalle = detalle;
        this.numero_cheque = numero_cheque;
        this.banco_emisor = banco_emisor;
        this.created_at = created_at || new Date();
        this.updated_at = updated_at || new Date();
    }
}