const express = require('express');
const router = express.Router();
const DistritoController = require('../controllers/DistritoController')();

/**
 * @swagger
 * tags:
 *   name: Distritos
 *   description: Endpoints para la gestión de distritos escolares
 */

/**
 * @swagger
 * /api/distritos/get/all:
 *   get:
 *     summary: Obtener todos los distritos
 *     tags: [Distritos]
 *     responses:
 *       200:
 *         description: Lista de distritos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Distrito'
 */
router.get('/get/all', DistritoController.listar);

/**
 * @swagger
 * /api/distritos/post:
 *   post:
 *     summary: Crear un nuevo distrito
 *     tags: [Distritos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Distrito'
 *     responses:
 *       201:
 *         description: Distrito creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Distrito'
 *       400:
 *         description: Error en los datos enviados
 */
router.post('/post', DistritoController.crear);

/**
 * @swagger
 * /api/distritos/put/{id}:
 *   put:
 *     summary: Actualizar un distrito por ID
 *     tags: [Distritos]
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
 *             $ref: '#/components/schemas/DistritoInput'
 *     responses:
 *       200:
 *         description: Distrito actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Distrito'
 *       404:
 *         description: Distrito no encontrado
 */
router.put('/put/:id', DistritoController.actualizar);

/**
 * @swagger
 * /api/distritos/delete/{id}:
 *   delete:
 *     summary: Eliminar un distrito por ID
 *     tags: [Distritos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Distrito eliminado exitosamente
 *       404:
 *         description: Distrito no encontrado
 */
router.delete('/delete/:id', DistritoController.eliminar);

module.exports = router;