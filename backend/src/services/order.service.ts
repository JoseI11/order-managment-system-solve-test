import { prisma } from "../db/database.js";
import { OrderStatus } from "../types/shared.js";

export const createOrder = async (data: {
  customer_name: string;
  item: string;
  quantity: number;
  status?: OrderStatus;
}) => {
  return prisma.order.create({
    data: {
      customer_name: data.customer_name,
      item: data.item,
      quantity: data.quantity,
      status: data.status ?? "pending",
    },
  });
};

export const getOrderById = async (id: string) => {
  return prisma.order.findUnique({ where: { id } });
};

export const updateOrder = async (id: string, payload: Partial<{
  customer_name: string;
  item: string;
  quantity: number;
  status: OrderStatus;
}>) => {
  return prisma.order.update({
    where: { id },
    data: payload,
  });
};

export const deleteOrder = async (id: string) => {
  await prisma.order.delete({ where: { id } });
  return true;
};

export const listOrders = async ({
  page = 1,
  page_size = 10,
  status,
}: {
  page?: number;
  page_size?: number;
  status?: OrderStatus;
}) => {
  const take = Math.max(1, Math.min(100, Number(page_size)));
  const skip = (Math.max(1, Number(page)) - 1) * take;

  const where = status ? { status } : undefined;

  const [items, total] = await Promise.all([
    prisma.order.findMany({
      where,
      orderBy: { created_at: "desc" },
      skip,
      take,
    }),
    prisma.order.count({ where }),
  ]);

  return {
    items,
    total,
    page: Number(page),
    page_size: take,
    total_pages: Math.ceil(total / take),
  };
};
