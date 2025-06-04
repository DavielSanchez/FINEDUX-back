export class Proveedor {
    constructor({
        id,
        escuela_id,
        nombre,
        nombre_contacto,
        telefono_contacto,
        rnc,
        direccion,
        telefono,
        created_at,
        updated_at
    }) {
        this.id = id;
        this.escuela_id = escuela_id;
        this.nombre = nombre;
        this.nombre_contacto = nombre_contacto;
        this.telefono_contacto = telefono_contacto;
        this.rnc = rnc;
        this.direccion = direccion;
        this.telefono = telefono;
        this.created_at = created_at || new Date();
        this.updated_at = updated_at || new Date();
    }
}