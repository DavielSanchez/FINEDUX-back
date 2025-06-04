const express = require("express");
const FondosRecibidos = require("../controllers/FondosRecibidosController")

const router = express.Router();
const controller = FondosRecibidos();

/**
 * @swagger
 * tags:
 *   name: Fondos Recibidos
 *   description: Endpoints para la gestión de los fondos recibidos
 */

/**
 * @swagger
 * /api/fondos/get/all:
 *   get:
 *     summary: Obtener todas los fondos recibidos
 *     tags: [Fondos Recibidos]
 *     responses:
 *       200:
 *         description: Lista de fondos recibidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FondosRecibidos'
 */
router.get('/get/all', controller.obtenerTodos);

/**
 * @swagger
 * /api/fondos/get/{id}:
 *   get:
 *     summary: Obtener un fondo recibido por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del fondo recibido
 *     tags: [Fondos Recibidos]
 *     responses:
 *       200:
 *         description: Fondo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FondosRecibidos'
 *       404:
 *         description: Fondos no encontrado
 */
router.get('/get/:id', controller.obtenerPorId);

/**
 * @swagger
 * /api/fondos/post:
 *   post:
 *     summary: Registrar nuevos fondos
 *     tags: [Fondos Recibidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FondosRecibidos'
 *     responses:
 *       201:
 *         description: Fondos registrados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FondosRecibidos'
 *       400:
 *         description: Error en los datos enviados
 */
router.post('/post', controller.crear);

/**
 * @swagger
 * /api/fondos/put/{id}:
 *   put:
 *     summary: Actualizar un fondo recibido existente
 *     tags: [Fondos Recibidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del fondo recibido a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FondosRecibidos'
 *     responses:
 *       200:
 *         description: Fondo actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FondosRecibidos'
 *       404:
 *         description: Fondo no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/put/:id', controller.actualizar);

/**
 * @swagger
 * /api/fondos/delete/{id}:
 *   delete:
 *     summary: Eliminar un fondo recibido
 *     tags: [Fondos Recibidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del fondo a eliminar
 *     responses:
 *       200:
 *         description: Fondo eliminado correctamente
 *       404:
 *         description: Fondo no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/delete/:id', controller.eliminar);



module.exports = router