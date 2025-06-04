export class Retencion {
    constructor({
        id,
        escuela_id,
        pago_id,
        tipo,
        monto,
        porcentaje,
        descripcion,
        creado_en,
        actualizado_en
    }) {
        this.id = id;
        this.escuela_id = escuela_id;
        this.pago_id = pago_id;
        this.tipo = tipo;
        this.monto = monto;
        this.porcentaje = porcentaje;
        this.descripcion = descripcion;
        this.creado_en = creado_en;
        this.actualizado_en = actualizado_en;
    }
}