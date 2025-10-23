import { v4 as uuidv4 } from "uuid";
import { Order, OrderStatus } from "../types/shared.js";
import { orders } from "../db/database.js";

// Crear una nueva orden
export function createOrder(
  customer_name: string,
  item: string,
  quantity: number,
  status: OrderStatus
): Order {
  const newOrder: Order = {
    id: uuidv4(),
    customer_name,
    item,
    quantity,
    status,
    created_at: new Date().toISOString(),
  };

  orders.push(newOrder);
  return newOrder;
}

// Obtener todas las órdenes (por ahora sin paginación)
export function getAllOrders(): Order[] {
  return orders;
}

// Obtener una orden por ID
export function getOrderById(id: string): Order | undefined {
  return orders.find((order) => order.id === id);
}

// Actualizar una orden
export function updateOrder(
  id: string,
  updatedFields: Partial<Omit<Order, "id" | "created_at">>
): Order | null {
  const index = orders.findIndex((order) => order.id === id);
  if (index === -1) return null;

  orders[index] = { ...orders[index], ...updatedFields };
  return orders[index];
}

// Eliminar una orden
export function deleteOrder(id: string): boolean {
  const index = orders.findIndex((order) => order.id === id);
  if (index === -1) return false;

  orders.splice(index, 1);
  return true;
}
