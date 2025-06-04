export class TipoGasto {
    constructor({ id, nombre, codigo, descripcion, activo }) {
        this.id = id;
        this.nombre = nombre;
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.activo = activo;
    }
}