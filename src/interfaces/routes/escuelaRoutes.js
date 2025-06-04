const express = require("express");
const EscuelaController = require("../controllers/EscuelaController")

const router = express.Router();
const controller = EscuelaController();

/**
 * @swagger
 * tags:
 *   name: Escuelas
 *   description: Endpoints para la gestión de escuelas
 */



/**
 * @swagger
 * /api/escuelas:
 *   get:
 *     summary: Obtener todas las escuelas
 *     tags: [Escuelas]
 *     responses:
 *       200:
 *         description: Lista de escuelas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/", controller.obtenerEscuelas);

/**
 * @swagger
 * /api/escuelas/get/id/{id}:
 *   get:
 *     summary: Obtener una escuela por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la escuela
 *     tags: [Escuelas]
 *     responses:
 *       200:
 *         description: Escuela encontrada
 *       404:
 *         description: Escuela no encontrada
 */
router.get("/get/id/:id", controller.obtenerPorId);

/**
 * @swagger
 * /api/escuelas/get/name/{nombre}:
 *   get:
 *     summary: Obtener una escuela por ID
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre de la escuela
 *     tags: [Escuelas]
 *     responses:
 *       200:
 *         description: Escuela encontrada
 *       404:
 *         description: Escuela no encontrada
 */
router.get("/get/name/:nombre", controller.obtenerPorNombre);

/**
 * @swagger
 * /api/escuelas/get/codigo/centro/{codigo}:
 *   get:
 *     summary: Obtener todas las escuelas por el codigo de centro
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: codigo de centro
 *     tags: [Escuelas]
 *     responses:
 *       200:
 *         description: Escuela encontrada
 *       404:
 *         description: Escuela no encontrada
 */
router.get("/get/codigo/centro/:codigo", controller.obtenerPorCodigoCentro);

/**
 * @swagger
 * /api/escuelas/get/codigo/dependencia/{codigo}:
 *   get:
 *     summary: Obtener todas las escuelas por el codigo de dependencia (regional)
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: codigo de dependencia (regional)
 *     tags: [Escuelas]
 *     responses:
 *       200:
 *         description: Escuela encontrada
 *       404:
 *         description: Escuela no encontrada
 */
router.get("/get/codigo/dependencia/:codigo", controller.obtenerPorCodigoDependencia);

/**
 * @swagger
 * /api/escuelas/get/codigo/distrito/{codigo}:
 *   get:
 *     summary: Obtener todas las escuelas por el codigo de distrito
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: codigo de distrito
 *     tags: [Escuelas]
 *     responses:
 *       200:
 *         description: Escuela encontrada
 *       404:
 *         description: Escuela no encontrada
 */
router.get("/get/codigo/distrito/:codigo", controller.obtenerPorCodigoDistrito);

/**
 * @swagger
 * /api/escuelas/post:
 *   post:
 *     summary: Crear una nueva escuela
 *     tags: [Escuelas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - codigo_centro
 *               - codigo_dependencia
 *               - codigo_distrito
 *               - sector
 *               - ciudad
 *               - provincia
 *             properties:
 *               nombre:
 *                 type: string
 *               distrito_id:
 *                 type: integer
 *               codigo_centro:
 *                 type: string
 *               codigo_dependencia:
 *                 type: string
 *               codigo_distrito:
 *                 type: string
 *               sector:
 *                 type: string
 *               ciudad:
 *                 type: string
 *               provincia:
 *                 type: string
 *               telefono:
 *                 type: string
 *               status:
 *                 type: string
 *                 default: activo
 *     responses:
 *       201:
 *         description: Escuela creada exitosamente
 *       400:
 *         description: Error en los datos enviados
 */
router.post("/post", controller.crearEscuela);

/**
 * @swagger
 * /api/escuelas/put/{id}:
 *   put:
 *     summary: Actualizar una escuela por ID
 *     tags: [Escuelas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la escuela a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               distrito_id:
 *                 type: integer
 *               codigo_centro:
 *                 type: string
 *               codigo_dependencia:
 *                 type: string
 *               codigo_distrito:
 *                 type: string
 *               sector:
 *                 type: string
 *               ciudad:
 *                 type: string
 *               provincia:
 *                 type: string
 *               telefono:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Escuela actualizada exitosamente
 *       404:
 *         description: Escuela no encontrada
 */
router.put("/put/:id", controller.actualizar);

/**
 * @swagger
 * /api/escuelas/delete/{id}:
 *   delete:
 *     summary: Borrar una escuela
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Id
 *     tags: [Escuelas]
 *     responses:
 *       200:
 *         description: Escuela encontrada
 *       404:
 *         description: Escuela no encontrada
 */
router.delete("/delete/:id", controller.borrarEscuela);

module.exports = router;