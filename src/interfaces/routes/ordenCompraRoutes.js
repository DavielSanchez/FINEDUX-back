const express = require("express");
const OrdenCompra = require("../controllers/OrdenCompraController")
const router = express.Router();
const controller = OrdenCompra();


/**
 * @swagger
 * tags:
 *   name: Orden de compra
 *   description: Endpoints para gestión de órdenes de compra
 */

/**
 * @swagger
 * /api/orden/get/all:
 *   get:
 *     summary: Obtener todas las órdenes de compra
 *     tags: [Orden de compra]
 *     responses:
 *       200:
 *         description: Lista de órdenes de compra
 */
router.get('/get/all', controller.obtenerTodas);

/**
 * @swagger
 * /api/orden/get/{id}:
 *   get:
 *     summary: Obtener orden de compra por ID
 *     tags: [Orden de compra]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Orden encontrada
 *       404:
 *         description: Orden no encontrada
 */
router.get('/get/:id', controller.obtenerPorId);
/**
 * @swagger
 * /api/orden/get/escuela/{id}:
 *   get:
 *     summary: Obtener órdenes de compra por escuela (y nombre del proveedor opcional)
 *     tags: [Orden de compra]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la escuela
 *         schema:
 *           type: integer
 *       - in: query
 *         name: nombre
 *         required: false
 *         description: Nombre del proveedor para filtrar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de órdenes o mensaje si no hay coincidencias
 *       500:
 *         description: Error interno del servidor
 */
router.get('/get/escuela/:id', controller.obtenerPorEscuela);

/**
 * @swagger
 * /api/orden/get/disponibles/{id}:
 *   get:
 *     summary: Obtener órdenes de compra disponibles por escuela
 *     tags: [Orden de compra]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la escuela
 *     responses:
 *       200:
 *         description: Lista de órdenes disponibles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   fecha:
 *                     type: string
 *                     format: date-time
 *                   total:
 *                     type: number
 *                   estado:
 *                     type: string
 *                   proveedor:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       nombre:
 *                         type: string
 *                       rnc:
 *                         type: string
 *       500:
 *         description: Error al obtener las órdenes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error al obtener órdenes
 *                 error:
 *                   type: string
 */
router.get('/get/disponibles/:id', controller.obtenerOrdenesDisponibles);

/**
 * @swagger
 * /api/orden/post:
 *   post:
 *     summary: Registrar una orden de compra con sus productos
 *     tags: [Orden de compra]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - escuela_id
 *               - proveedor_id
 *               - productos
 *             properties:
 *               escuela_id:
 *                 type: integer
 *                 example: 1
 *               proveedor_id:
 *                 type: integer
 *                 example: 2
 *               productos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - nombre_producto
 *                     - precio_unitario
 *                     - cantidad
 *                   properties:
 *                     producto_id:
 *                       type: integer
 *                       example: 101
 *                     nombre_producto:
 *                       type: string
 *                       example: "Laptop Lenovo"
 *                     precio_unitario:
 *                       type: number
 *                       format: float
 *                       example: 1500.00
 *                     cantidad:
 *                       type: integer
 *                       example: 3
 *     responses:
 *       201:
 *         description: Orden de compra creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Orden de compra creada correctamente
 *                 orden_id:
 *                   type: integer
 *                   example: 10
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Faltan datos obligatorios o la lista de productos está vacía
 *       500:
 *         description: Error interno al crear la orden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error al crear la orden de compra
 *                 error:
 *                   type: string
 *                   example: Error de conexión con la base de datos
 */
router.post('/post', controller.Crear);

/**
 * @swagger
 * /api/orden/put/{id}:
 *   put:
 *     summary: Actualiza una orden de compra (incluye productos)
 *     tags: [Orden de compra]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la orden de compra a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               proveedor_id:
 *                 type: integer
 *               estado:
 *                 type: string
 *                 enum: [pendiente, procesando, completada, cancelada]
 *               productos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nombre_producto:
 *                       type: string
 *                     precio_unitario:
 *                       type: number
 *                     cantidad:
 *                       type: integer
 *     responses:
 *       200:
 *         description: Orden actualizada correctamente
 *       400:
 *         description: Error de validación o datos incorrectos
 *       403:
 *         description: No puedes modificar una orden de otra escuela
 *       404:
 *         description: Orden no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put('/put/:id', controller.actualizar);

/**
 * @swagger
 * /api/orden/put/{id}:
 *   delete:
 *     summary: Eliminar orden de compra
 *     tags: [Orden de compra]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Orden eliminada
 *       404:
 *         description: Orden no encontrada
 */
router.delete('/delete/:id', controller.eliminar);


module.exports = router;