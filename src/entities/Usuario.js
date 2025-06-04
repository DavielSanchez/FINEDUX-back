export default class Usuario {
    constructor({ id, escuela_id, nombres, apellidos, nombre_usuario, email, contrasena, rol, created_at, updated_at }) {
        this.id = id;
        this.escuela_id = escuela_id;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.nombre_usuario = nombre_usuario;
        this.email = email;
        this.contrasena = contrasena;
        this.rol = rol;
        this.created_at = created_at || new Date();
        this.updated_at = updated_at || new Date();
    }
}