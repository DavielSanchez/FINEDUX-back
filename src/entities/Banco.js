export class Banco {
    constructor({ id, escuela_id, balance, descripcion, updated_at }) {
        this.id = id;
        this.escuela_id = escuela_id;
        this.balance = balance;
        this.descripcion = descripcion;
        this.updated_at = updated_at || new Date();
    }
}