const express = require('express');
const ProveedoresController = require('../controllers/ProveedorController')
const router = express.Router();
const controller = ProveedoresController();

/**
 * @swagger
 * tags:
 *   name: Proveedores
 *   description: API para gestionar proveedores
 */

/**
 * @swagger
 * /api/proveedores/get/all:
 *   get:
 *     summary: Obtener todos los proveedores
 *     tags: [Proveedores]
 *     responses:
 *       200:
 *         description: Lista de proveedores
 */
router.get('/get/all', controller.obtenerTodos);

/**
 * @swagger
 * /api/proveedores/get/{id}:
 *   get:
 *     summary: Obtener un proveedor por ID
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Proveedor encontrado
 *       404:
 *         description: Proveedor no encontrado
 */
router.get('/get/:id', controller.obtenerPorId);

/**
 * @swagger
 * /api/proveedores/get/name/{nombre}:
 *   get:
 *     summary: Obtener un proveedor por Nombre
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Proveedor encontrado
 *       404:
 *         description: Proveedor no encontrado
 */
router.get('/get/name/:nombre', controller.obtenerPorNombre);

/**
 * @swagger
 * /api/proveedores/get/por-escuela/{id}:
 *   get:
 *     summary: Buscar proveedores por ID de escuela y nombre
 *     tags: [Proveedores]
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
 *         description: Nombre del proveedor para filtrar (búsqueda parcial)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de proveedores encontrados
 *       404:
 *         description: No se encontraron proveedores
 *       500:
 *         description: Error del servidor
 */
router.get('/get/por-escuela/:id', controller.obtenerPorEscuela);

/**
 * @swagger
 * /api/proveedores/post:
 *   post:
 *     summary: Crear un nuevo proveedor
 *     tags: [Proveedores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Proveedor'
 *     responses:
 *       201:
 *         description: Proveedor creado
 */
router.post('/post', controller.crear);

/**
 * @swagger
 * /api/proveedores/put/{id}:
 *   put:
 *     summary: Actualizar un proveedor por ID
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Proveedor'
 *     responses:
 *       200:
 *         description: Proveedor actualizado
 *       404:
 *         description: Proveedor no encontrado
 */
router.put('/put/:id', controller.actualizar);

/**
 * @swagger
 * /api/proveedores/delete/{id}:
 *   delete:
 *     summary: Eliminar un proveedor por ID
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Proveedor eliminado
 *       404:
 *         description: Proveedor no encontrado
 */
router.delete('/delete/:id', controller.eliminar);

module.exports = router;