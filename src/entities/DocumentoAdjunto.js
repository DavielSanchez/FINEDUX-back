export class DocumentoAdjunto {
    constructor({ id, factura_id, url_archivo, descripcion }) {
        this.id = id;
        this.factura_id = factura_id;
        this.url_archivo = url_archivo;
        this.descripcion = descripcion;
    }
}