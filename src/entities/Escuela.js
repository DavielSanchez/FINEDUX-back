class Escuela {
    constructor({ id, nombre, codigo_centro, codigo_dependencia, codigo_distrito, sector, ciudad, provincia, telefono, created_at, updated_at }) {
        this.id = id;
        this.nombre = nombre;
        this.codigo_centro = codigo_centro;
        this.codigo_dependencia = codigo_dependencia;
        this.codigo_distrito = codigo_distrito;
        this.sector = sector;
        this.ciudad = ciudad;
        this.provincia = provincia;
        this.telefono = telefono;
        this.created_at = created_at || new Date();
        this.updated_at = updated_at || new Date();
    }
}

module.exports = Escuela