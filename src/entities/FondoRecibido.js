export class FondoRecibido {
    constructor({
        id,
        escuela_id,
        fuente,
        tipo_fondo,
        descripcion,
        fecha_recepcion,
        monto,
        numero_referencia,
        comprobante_deposito,
        moneda,
        cuenta_destino,
        trimestre,
        destino_contable,
        comentarios,
        created_at,
        updated_at
    }) {
        this.id = id;
        this.escuela_id = escuela_id;
        this.fuente = fuente;
        this.tipo_fondo = tipo_fondo;
        this.descripcion = descripcion;
        this.fecha_recepcion = fecha_recepcion;
        this.monto = monto;
        this.numero_referencia = numero_referencia;
        this.comprobante_deposito = comprobante_deposito;
        this.moneda = moneda;
        this.cuenta_destino = cuenta_destino;
        this.trimestre = trimestre;
        this.destino_contable = destino_contable;
        this.comentarios = comentarios;
        this.created_at = created_at || new Date();
        this.updated_at = updated_at || new Date();
    }
}