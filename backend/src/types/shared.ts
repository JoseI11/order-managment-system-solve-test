export type OrderStatus = "pending" | "completed" | "cancelled";

export interface OrderDTO {
  id: string;
  customer_name: string;
  item: string;
  quantity: number;
  status: OrderStatus;
  created_at: string; // ISO string
}
