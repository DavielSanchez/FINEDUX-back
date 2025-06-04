export class AsientoContable {
    constructor({ id, escuela_id, descripcion, fecha, created_at, updated_at }) {
        this.id = id;
        this.escuela_id = escuela_id;
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.created_at = created_at || new Date();
        this.updated_at = updated_at || new Date();
    }
}