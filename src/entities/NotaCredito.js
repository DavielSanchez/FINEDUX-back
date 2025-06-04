export class NotaCredito {
    constructor({ id, factura_id, escuela_id, fecha, monto, motivo, creado_en, actualizado_en }) {
        this.id = id;
        this.factura_id = factura_id;
        this.escuela_id = escuela_id;
        this.fecha = fecha;
        this.monto = monto;
        this.motivo = motivo;
        this.creado_en = creado_en;
        this.actualizado_en = actualizado_en;
    }
}