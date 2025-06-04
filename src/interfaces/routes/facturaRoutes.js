const express = require("express");
const facturaController = require('../controllers/FacturaController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Facturas
 *   description: Endpoints para la gestión de facturas
 */

/**
 * @swagger
 * /api/facturas/get/all:
 *   get:
 *     summary: Obtener todas las facturas
 *     tags: [Facturas]
 *     responses:
 *       200:
 *         description: Lista de facturas
 */
router.get("/get/all", facturaController.obtenerTodas);

/**
 * @swagger
 * /api/facturas/get/id/{id}:
 *   get:
 *     summary: Obtener factura por ID
 *     tags: [Facturas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la factura
 *     responses:
 *       200:
 *         description: Factura encontrada
 */
router.get("/get/id/:id", facturaController.obtenerPorId);

/**
 * @swagger
 * /api/facturas/get/escuela/{escuela_id}:
 *   get:
 *     summary: Obtener facturas por escuela
 *     tags: [Facturas]
 *     parameters:
 *       - in: path
 *         name: escuela_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la escuela
 *     responses:
 *       200:
 *         description: Lista de facturas por escuela
 */
router.get("/get/escuela/:escuela_id", facturaController.obtenerPorEscuela);

/**
 * @swagger
 * /api/facturas/get/ncf/{ncf}:
 *   get:
 *     summary: Obtener facturas por NCF
 *     tags: [Facturas]
 *     parameters:
 *       - in: path
 *         name: ncf
 *         required: true
 *         schema:
 *           type: string
 *         description: Número de comprobante fiscal
 *     responses:
 *       200:
 *         description: Lista de facturas por NCF
 */
router.get("/get/ncf/:ncf", facturaController.obtenerPorNCF);

/**
 * @swagger
 * /api/facturas/get/proveedor/nombre/{nombre}:
 *   get:
 *     summary: Obtener facturas por nombre del proveedor
 *     tags: [Facturas]
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del proveedor
 *     responses:
 *       200:
 *         description: Lista de facturas por proveedor
 */
router.get("/get/proveedor/nombre/:nombre", facturaController.obtenerPorProveedorNombre);

/**
 * @swagger
 * /api/facturas/get/proveedor/rnc/{rnc}:
 *   get:
 *     summary: Obtener facturas por RNC del proveedor
 *     tags: [Facturas]
 *     parameters:
 *       - in: path
 *         name: rnc
 *         required: true
 *         schema:
 *           type: string
 *         description: RNC del proveedor
 *     responses:
 *       200:
 *         description: Lista de facturas por RNC
 */
router.get("/get/proveedor/rnc/:rnc", facturaController.obtenerPorProveedorRNC);

/**
 * @swagger
 * /api/facturas/get/estado/activas:
 *   get:
 *     summary: Obtener facturas activas
 *     tags: [Facturas]
 *     responses:
 *       200:
 *         description: Lista de facturas activas
 */
router.get("/get/estado/activas", facturaController.obtenerPorActivas);

/**
 * @swagger
 * /api/facturas/get/estado/canceladas:
 *   get:
 *     summary: Obtener facturas canceladas
 *     tags: [Facturas]
 *     responses:
 *       200:
 *         description: Lista de facturas canceladas
 */
router.get("/get/estado/canceladas", facturaController.obtenerPorCanceladas);

/**
 * @swagger
 * /api/facturas/get/fecha/emision:
 *   get:
 *     summary: Obtener facturas por rango de fecha de emisión
 *     tags: [Facturas]
 *     parameters:
 *       - in: query
 *         name: desde
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Fecha de inicio del rango
 *       - in: query
 *         name: hasta
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Fecha final del rango
 *     responses:
 *       200:
 *         description: Lista de facturas en el rango de fecha
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 5
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Factura'
 *       500:
 *         description: Error al obtener facturas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al obtener facturas por rango de fecha
 *                 error:
 *                   type: string
 */
router.get("/get/fecha/emision", facturaController.obtenerPorRangoFecha);


/**
 * @swagger
 * /api/facturas/post:
 *   post:
 *     summary: Crear una factura a partir de una orden de compra existente
 *     tags: [Facturas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FacturaDesdeOrdenInput'
 *     responses:
 *       201:
 *         description: Factura creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Factura creada correctamente
 *                 factura:
 *                   $ref: '#/components/schemas/Factura'
 *       400:
 *         description: Error al crear factura (validación o reglas de negocio)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error al crear factura
 *                 error:
 *                   type: string
 *             examples:
 *               OrdenNoEncontrada:
 *                 summary: Orden inexistente
 *                 value:
 *                   mensaje: Error al crear factura
 *                   error: Orden de compra no encontrada
 *               EstadoInvalido:
 *                 summary: Estado no permitido
 *                 value:
 *                   mensaje: Error al crear factura
 *                   error: Solo se puede generar factura desde una orden pendiente
 *               YaTieneFacturaActiva:
 *                 summary: Ya existe factura activa
 *                 value:
 *                   mensaje: Error al crear factura
 *                   error: Ya existe una factura activa para esta orden
 *               SinProductos:
 *                 summary: Orden sin productos
 *                 value:
 *                   mensaje: Error al crear factura
 *                   error: La orden no tiene productos
 *               ProveedorNoEncontrado:
 *                 summary: Proveedor inexistente
 *                 value:
 *                   mensaje: Error al crear factura
 *                   error: Proveedor no encontrado
 *               CamposFaltantes:
 *                 summary: Faltan campos requeridos
 *                 value:
 *                   mensaje: Error al crear factura
 *                   error: Debes enviar fecha_emision, vencimiento, ncf y no_factura
 */
router.post("/post", facturaController.Crear);

/**
 * @swagger
 * /api/facturas/put/{id}:
 *   put:
 *     summary: Actualizar una factura existente
 *     tags: [Facturas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la factura a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Factura actualizada
 */
router.put("/put/:id", facturaController.Actualizar);

/**
 * @swagger
 * /api/facturas/{id}:
 *   delete:
 *     summary: Cancelar una factura pendiente (no eliminar)
 *     tags: [Facturas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la factura a cancelar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Factura cancelada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Factura cancelada correctamente
 *                 factura:
 *                   $ref: '#/components/schemas/Factura'
 *       400:
 *         description: No se puede cancelar la factura
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Solo se pueden cancelar facturas con estado 'pendiente'
 *       404:
 *         description: Factura no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Factura no encontrada
 */
router.delete("/delete/:id", facturaController.Eliminar);

module.exports = router;