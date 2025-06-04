export class PartidaContable {
    constructor({ id, escuela_id, asiento_id, cuenta_id, debe, haber, created_at, updated_at }) {
        this.id = id;
        this.escuela_id = escuela_id;
        this.asiento_id = asiento_id;
        this.cuenta_id = cuenta_id;
        this.debe = debe;
        this.haber = haber;
        this.created_at = created_at || new Date();
        this.updated_at = updated_at || new Date();
    }
}