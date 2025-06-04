export class ReporteGenerado {
    constructor({
        id,
        escuela_id,
        generado_por_id,
        tipo_reporte,
        periodo,
        estado,
        fecha_generacion,
        url_documento,
        observaciones,
        created_at,
        updated_at
    }) {
        this.id = id;
        this.escuela_id = escuela_id;
        this.generado_por_id = generado_por_id;
        this.tipo_reporte = tipo_reporte;
        this.periodo = periodo;
        this.estado = estado;
        this.fecha_generacion = fecha_generacion;
        this.url_documento = url_documento;
        this.observaciones = observaciones;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}