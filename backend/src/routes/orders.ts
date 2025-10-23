import { Router } from "express";
import * as ordersController from "../controllers/orders.controller.js";

const router = Router();

router.post("/", ordersController.createOrder);
router.get("/", ordersController.getOrders);
router.get("/:id", ordersController.getOrder);
router.put("/:id", ordersController.updateOrder);
router.delete("/:id", ordersController.deleteOrder);


export default router;