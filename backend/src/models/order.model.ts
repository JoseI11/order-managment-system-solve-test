import { prisma } from "../db/database.js";
import type { OrderDTO, OrderStatus } from "../types/shared.js";

export async function create(order: {
  customer_name: string;
  item: string;
  quantity: number;
  status?: OrderStatus;
}): Promise<OrderDTO> {
  return prisma.order.create({
    data: {
      customer_name: order.customer_name,
      item: order.item,
      quantity: order.quantity,
      status: order.status ?? "pending",
    },
  }) as unknown as OrderDTO;
}

export function findById(id: string): Promise<OrderDTO | null> {
  return prisma.order.findUnique({ where: { id } }) as unknown as Promise<OrderDTO | null>;
}

export function update(
  id: string,
  data: Partial<Pick<OrderDTO, "customer_name" | "item" | "quantity" | "status">>
): Promise<OrderDTO> {
  return prisma.order.update({ where: { id }, data }) as unknown as Promise<OrderDTO>;
}

export async function remove(id: string): Promise<boolean> {
  await prisma.order.delete({ where: { id } });
  return true;
}

export async function list({
  page = 1,
  page_size = 10,
  status,
}: {
  page?: number;
  page_size?: number;
  status?: OrderStatus;
}): Promise<{
  items: OrderDTO[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}> {
  const take = Math.max(1, Math.min(100, Number(page_size)));
  const skip = (Math.max(1, Number(page)) - 1) * take;
  const where = status ? { status } : undefined;

  const [items, total] = await Promise.all([
    prisma.order.findMany({ where, orderBy: { created_at: "desc" }, skip, take }),
    prisma.order.count({ where }),
  ]);

  return {
    items: items as unknown as OrderDTO[],
    total,
    page: Number(page),
    page_size: take,
    total_pages: Math.ceil(total / take),
  };
}
