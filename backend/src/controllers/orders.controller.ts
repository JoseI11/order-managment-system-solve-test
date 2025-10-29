import type { Request, Response } from "express";
import * as svc from "../services/order.service.js";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { customer_name, item, quantity, status } = req.body;
    if (!customer_name || !item || !quantity) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    const order = await svc.createOrder({ customer_name, item, quantity, status });
    return res.status(201).json(order);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error interno" });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page ?? 1);
    const page_size = Number(req.query.page_size ?? 10);
    const status = req.query.status as any;
    const result = await svc.listOrders({ page, page_size, status });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error interno" });
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await svc.getOrderById(id);
    if (!order) return res.status(404).json({ error: "Orden no encontrada" });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error interno" });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const updated = await svc.updateOrder(id, payload);
    res.json(updated);
  } catch (err: any) {
    console.error(err);
    if (err.code === "P2025") return res.status(404).json({ error: "Orden no encontrada" });
    res.status(500).json({ error: "Error interno" });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await svc.deleteOrder(id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error interno" });
  }
};

