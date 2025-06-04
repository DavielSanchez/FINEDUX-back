export class BitacoraEvento {
    constructor({
        id,
        usuario_id,
        escuela_id,
        fecha,
        modulo,
        accion,
        entidad_afectada_id,
        descripcion,
        ip_origen,
        navegador
    }) {
        this.id = id;
        this.usuario_id = usuario_id;
        this.escuela_id = escuela_id;
        this.fecha = fecha;
        this.modulo = modulo;
        this.accion = accion;
        this.entidad_afectada_id = entidad_afectada_id;
        this.descripcion = descripcion;
        this.ip_origen = ip_origen;
        this.navegador = navegador;
    }
}