// src/__tests__/order.test.ts
import { jest } from '@jest/globals';
import request from 'supertest';

// 1) Mockear módulos ESM ANTES de importarlos
await jest.unstable_mockModule('../config/swagger.js', () => ({
  __esModule: true,
  setupSwagger: () => {}, // silencia Swagger en tests
}));

// --- Tipos de mock: usa ReturnType<typeof jest.fn> ---
type MockFn = ReturnType<typeof jest.fn>;

type MockedPrisma = {
  order: {
    create: MockFn;       
    findUnique: MockFn;   
    update: MockFn;       
    delete: MockFn;       
    findMany: MockFn;     
    count: MockFn;        
  };
};

// 2) Crea el objeto prisma mock con jest.fn()
const prismaMock: MockedPrisma = {
  order: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
  },
};

// Mock de la capa DB que exporta `prisma`
await jest.unstable_mockModule('../db/database.js', () => ({
  __esModule: true,
  prisma: prismaMock, // 👈 inyectamos nuestro objeto tipado
}));

// 3) Importar después de tener los mocks
const { default: app } = await import('../app.js');
const { prisma } = await import('../db/database.js');

// Alias del mock (ya tiene el tipo correcto)
const mPrisma = prisma as unknown as MockedPrisma;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Orders API', () => {
  it('POST /orders -> 201', async () => {
    mPrisma.order.create.mockResolvedValue({
      id: 'ord_1',
      customer_name: 'Ana',
      item: 'Laptop',
      quantity: 1,
      status: 'pending',
    });

    const res = await request(app)
      .post('/orders')
      .send({ customer_name: 'Ana', item: 'Laptop', quantity: 1 });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      id: 'ord_1',
      customer_name: 'Ana',
      item: 'Laptop',
      quantity: 1,
      status: 'pending',
    });
    expect(mPrisma.order.create).toHaveBeenCalledWith({
      data: { customer_name: 'Ana', item: 'Laptop', quantity: 1, status: 'pending' },
    });
  });

  it('GET /orders -> 200 paginado', async () => {
    mPrisma.order.findMany.mockResolvedValue([
      { id: 'ord_1', customer_name: 'Ana', item: 'Laptop', quantity: 1, status: 'pending' },
      { id: 'ord_2', customer_name: 'Luis', item: 'Mouse', quantity: 2, status: 'completed' },
    ]);
    mPrisma.order.count.mockResolvedValue(2);

    const res = await request(app).get('/orders?page=1&page_size=2');

    expect(res.status).toBe(200);
    expect(mPrisma.order.findMany).toHaveBeenCalledWith({
      where: undefined,
      orderBy: { created_at: 'desc' },
      skip: 0,
      take: 2,
    });
    expect(mPrisma.order.count).toHaveBeenCalledWith({ where: undefined });
  });

  it('PUT /orders/:id -> 404 P2025', async () => {
    mPrisma.order.update.mockRejectedValue({ code: 'P2025' });

    const res = await request(app).put('/orders/ord_x').send({ status: 'cancelled' });

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Orden no encontrada' });
  });

  it('GET /orders/:id -> 200 cuando existe', async () => {
    mPrisma.order.findUnique.mockResolvedValue({
      id: 'ord_1',
      customer_name: 'Ana',
      item: 'Laptop',
      quantity: 1,
      status: 'pending',
    });

    const res = await request(app).get('/orders/ord_1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 'ord_1',
      customer_name: 'Ana',
      item: 'Laptop',
      quantity: 1,
      status: 'pending',
    });
    expect(mPrisma.order.findUnique).toHaveBeenCalledWith({ where: { id: 'ord_1' } });
  });

  it('GET /orders/:id -> 404 cuando no existe', async () => {
    mPrisma.order.findUnique.mockResolvedValue(null);

    const res = await request(app).get('/orders/nope');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Orden no encontrada' });
    expect(mPrisma.order.findUnique).toHaveBeenCalledWith({ where: { id: 'nope' } });
  });

  it('DELETE /orders/:id -> 204 borra y no retorna cuerpo', async () => {
    mPrisma.order.delete.mockResolvedValue(undefined);

    const res = await request(app).delete('/orders/ord_1');

    expect(res.status).toBe(204);
    expect(res.text).toBe('');
    expect(mPrisma.order.delete).toHaveBeenCalledWith({ where: { id: 'ord_1' } });
  });

  it('DELETE /orders/:id -> 500 si el service lanza error', async () => {
    // Tu controller de delete NO mapea P2025 a 404; cualquier error retorna 500.
    mPrisma.order.delete.mockRejectedValue(new Error('boom'));

    const res = await request(app).delete('/orders/ord_fail');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Error interno' });
    expect(mPrisma.order.delete).toHaveBeenCalledWith({ where: { id: 'ord_fail' } });
  });


});
