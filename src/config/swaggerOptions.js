const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API del sistema financiero educativo - FINEDUX',
            version: '1.0.0',
            description: 'Documentación de la API para gestión de escuelas',
        },
        servers: [{
            url: 'http://localhost:3000',
        }, ],
        components: {
            schemas: {
                Usuario: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        escuela_id: { type: 'integer', nullable: true },
                        distrito_id: { type: 'integer', nullable: true },
                        nombres: { type: 'string' },
                        apellidos: { type: 'string' },
                        nombre_usuario: { type: 'string' },
                        email: { type: 'string' },
                        rol: {
                            type: 'string',
                            enum: ['administrador', 'gestor_distrital', 'gestor_escolar'],
                        },
                        status: {
                            type: 'string',
                            enum: ['activo', 'inactivo'],
                            default: 'activo',
                        },
                    },
                },

                UsuarioInput: {
                    type: 'object',
                    required: ['nombres', 'apellidos', 'nombre_usuario', 'email', 'contrasena', 'rol'],
                    properties: {
                        escuela_id: { type: 'integer', nullable: true },
                        distrito_id: { type: 'integer', nullable: true },
                        nombres: { type: 'string' },
                        apellidos: { type: 'string' },
                        nombre_usuario: { type: 'string' },
                        email: { type: 'string' },
                        contrasena: { type: 'string' },
                        rol: {
                            type: 'string',
                            enum: ['administrador', 'gestor_distrital', 'gestor_escolar'],
                        },
                        status: {
                            type: 'string',
                            enum: ['activo', 'inactivo'],
                            default: 'activo',
                        },
                    },
                },

                Escuela: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        nombre: { type: 'string' },
                        distrito_id: { type: 'integer', nullable: true },
                        codigo_centro: { type: 'string' },
                        codigo_dependencia: { type: 'string' },
                        codigo_distrito: { type: 'string' },
                        sector: { type: 'string' },
                        ciudad: { type: 'string' },
                        provincia: { type: 'string' },
                        telefono: { type: 'string', nullable: true },
                        status: { type: 'string', default: 'activo' },
                    },
                },

                FondosRecibidos: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        escuela_id: { type: 'integer' },
                        fuente: { type: 'string' },
                        tipo_fondo: { type: 'string' },
                        descripcion: { type: 'string' },
                        fecha_recepcion: { type: 'string', format: 'date-time' },
                        monto: { type: 'number', format: 'decimal' },
                        numero_referencia: { type: 'string' },
                        comprobante_deposito: { type: 'string' },
                        moneda: { type: 'string' },
                        cuenta_destino: { type: 'string' },
                        trimestre: { type: 'integer' },
                        destino_contable: { type: 'string' },
                        comentarios: { type: 'string' },
                    },
                },

                Distrito: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        nombre: { type: 'string', example: 'Distrito 15-04' },
                        codigo: { type: 'string', example: '04' },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2025-05-17T22:06:30.509Z'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2025-05-17T22:06:30.509Z'
                        }
                    }
                },

                Proveedor: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        escuela_id: { type: 'integer' },
                        nombre: { type: 'string' },
                        nombre_contacto: { type: 'string' },
                        telefono_contacto: { type: 'string' },
                        rnc: { type: 'string' },
                        direccion: { type: 'string' },
                        telefono: { type: 'string' },
                        created_at: { type: 'string', format: 'date-time' },
                        updated_at: { type: 'string', format: 'date-time' },
                    },
                },

                OrdenCompra: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        escuela_id: { type: 'integer' },
                        proveedor_id: { type: 'integer' },
                        fecha: { type: 'string', format: 'date-time' },
                        total: { type: 'number', format: 'decimal' },
                        estado: { type: 'string' },
                        producto: { type: 'string' },
                        precio_unitario: { type: 'number', format: 'decimal' },
                        cantidad: { type: 'integer' },
                        precio: { type: 'number', format: 'decimal' },
                        created_at: { type: 'string', format: 'date-time' },
                        updated_at: { type: 'string', format: 'date-time' }
                    }
                },

                FacturaInput: {
                    type: 'object',
                    required: ['proveedor_rnc', 'no_factura', 'fecha_emision', 'fecha_vencimiento', 'escuela_id', 'productos'],
                    properties: {
                        proveedor_rnc: { type: 'string', example: '131231231' },
                        no_factura: { type: 'string', example: 'F-0000123' },
                        ncf: { type: 'string', example: 'B0100000123' },
                        fecha_emision: { type: 'string', format: 'date', example: '2024-05-01' },
                        fecha_vencimiento: { type: 'string', format: 'date', example: '2024-05-30' },
                        escuela_id: { type: 'integer', example: 4 },
                        estado: {
                            type: 'string',
                            enum: ['activa', 'cancelada'],
                            example: 'activa'
                        },
                        productos: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/FacturaProductoInput'
                            }
                        }
                    }
                },

                FacturaDesdeOrdenInput: {
                    type: 'object',
                    required: ['orden_id', 'fecha_emision', 'vencimiento', 'ncf', 'no_factura'],
                    properties: {
                        orden_id: {
                            type: 'integer',
                            description: 'ID de la orden de compra a facturar',
                            example: 7
                        },
                        fecha_emision: {
                            type: 'string',
                            format: 'date',
                            description: 'Fecha de emisión de la factura',
                            example: '2025-06-02'
                        },
                        vencimiento: {
                            type: 'string',
                            format: 'date',
                            description: 'Fecha de vencimiento de la factura',
                            example: '2025-07-02'
                        },
                        ncf: {
                            type: 'string',
                            description: 'Número de Comprobante Fiscal',
                            example: 'B0100000001'
                        },
                        no_factura: {
                            type: 'string',
                            description: 'Número de la factura',
                            example: 'F-001245'
                        }
                    }
                },

                FacturaProductoInput: {
                    type: 'object',
                    properties: {
                        factura_id: { type: 'integer', example: 12 },
                        producto_id: { type: 'integer', example: 10 },
                        nombre_producto: { type: 'string', example: 'Laptop Lenovo i5' },
                        descripcion: { type: 'string', example: 'Laptop Lenovo i5, 8GB RAM, 256GB SSD' },
                        precio_unitario: { type: 'number', example: 25000.00 },
                        cantidad: { type: 'number', example: 2 },
                        subtotal: { type: 'number', example: 50000.00 }
                    }
                },

                Factura: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 12 },
                        orden_id: { type: 'integer', example: 7 },
                        escuela_id: { type: 'integer', example: 4 },
                        proveedor_id: { type: 'integer', example: 3 },
                        proveedor_rnc: { type: 'string', example: '131231231' },
                        fecha_emision: { type: 'string', format: 'date', example: '2025-06-02' },
                        vencimiento: { type: 'string', format: 'date', example: '2025-07-02' },
                        ncf: { type: 'string', example: 'B0100000001' },
                        no_factura: { type: 'string', example: 'F-001245' },
                        monto_subtotal: { type: 'number', example: 10000.00 },
                        impuesto_total: { type: 'number', example: 1800.00 },
                        retencion_itbis: { type: 'number', example: 0 },
                        retencion_otros: { type: 'number', example: 0 },
                        total_a_pagar: { type: 'number', example: 11800.00 },
                        estado: { type: 'string', example: 'emitida' },
                        created_at: { type: 'string', format: 'date-time', example: '2025-06-02T18:20:00Z' },
                        updated_at: { type: 'string', format: 'date-time', example: '2025-06-02T18:20:00Z' }
                    }
                },

            },
        },
    },
    apis: ['./src/interfaces/routes/*.js'],
};

module.exports = swaggerOptions;