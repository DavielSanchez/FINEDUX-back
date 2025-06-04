export class CuentaContable {
    constructor({ id, codigo, nombre, tipo, created_at, updated_at }) {
        this.id = id;
        this.codigo = codigo;
        this.nombre = nombre;
        this.tipo = tipo;
        this.created_at = created_at || new Date();
        this.updated_at = updated_at || new Date();
    }
}