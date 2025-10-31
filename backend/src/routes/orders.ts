import { Router } from "express";
import * as ordersController from "../controllers/orders.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API para la gestión de órdenes
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Crea una nueva orden
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer_name
 *               - item
 *               - quantity
 *             properties:
 *               customer_name:
 *                 type: string
 *                 description: Nombre del cliente
 *               item:
 *                 type: string
 *                 description: Artículo comprado
 *               quantity:
 *                 type: integer
 *                 description: Cantidad del artículo
 *               status:
 *                 type: string
 *                 enum: [pending, completed, cancelled]
 *                 description: Estado de la orden
 *     responses:
 *       201:
 *         description: Orden creada exitosamente
 *       400:
 *         description: Datos de entrada inválidos
 */

router.post("/", ordersController.createOrder);
/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Obtiene una lista paginada de órdenes
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página
 *       - in: query
 *         name: page_size
 *         schema:
 *           type: integer
 *         description: Tamaño de la página
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, completed, cancelled]
 *         description: Filtrar por estado
 *     responses:
 *       200:
 *         description: Lista de órdenes obtenida exitosamente
 */
router.get("/", ordersController.getOrders);
/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Obtiene una orden por su ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID de la orden
 *     responses:
 *       200:
 *         description: Orden encontrada
 *       404:
 *         description: Orden no encontrada
 */
router.get("/:id", ordersController.getOrder);
/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Actualiza una orden existente
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID de la orden
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_name:
 *                 type: string
 *               item:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [pending, completed, cancelled]
 *     responses:
 *       200:
 *         description: Orden actualizada exitosamente
 *       404:
 *         description: Orden no encontrada
 */
router.put("/:id", ordersController.updateOrder);
/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Elimina una orden por su ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID de la orden
 *     responses:
 *       204:
 *         description: Orden eliminada exitosamente
 *       404:
 *         description: Orden no encontrada
 */
router.delete("/:id", ordersController.deleteOrder);


export default router;