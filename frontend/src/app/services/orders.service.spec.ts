// src/app/orders.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { OrdersService, PaginatedOrders, Order } from './orders.service';

describe('OrdersService', () => {
    let service: OrdersService;
    let httpMock: HttpTestingController;

    const base = 'http://localhost:3000/orders';

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                OrdersService
            ]
        });
        service = TestBed.inject(OrdersService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        // asegura que no queden requests pendientes
        httpMock.verify();
    });

    it('getOrders arma la query sin status', () => {
        const mock: PaginatedOrders = {
            items: [],
            total: 0,
            page: 1,
            page_size: 10,
            total_pages: 0,
        };

        service.getOrders(1, 10).subscribe((res) => {
            expect(res).toEqual(mock);
        });

        const req = httpMock.expectOne(`${base}?page=1&page_size=10`);
        expect(req.request.method).toBe('GET');
        req.flush(mock);
    });

    it('getOrders incluye status cuando se pasa', () => {
        const mock: PaginatedOrders = {
            items: [],
            total: 0,
            page: 2,
            page_size: 5,
            total_pages: 0,
        };

        service.getOrders(2, 5, 'completed').subscribe((res) => {
            expect(res).toEqual(mock);
        });

        const req = httpMock.expectOne(`${base}?page=2&page_size=5&status=completed`);
        expect(req.request.method).toBe('GET');
        req.flush(mock);
    });

    it('getOrderById hace GET a /:id', () => {
        const order: Order = {
            id: 'ord_1',
            customer_name: 'Ana',
            item: 'Laptop',
            quantity: 1,
            status: 'pending',
            created_at: new Date().toISOString(),
        };

        service.getOrderById('ord_1').subscribe((res) => {
            expect(res).toEqual(order);
        });

        const req = httpMock.expectOne(`${base}/ord_1`);
        expect(req.request.method).toBe('GET');
        req.flush(order);
    });

    it('createOrder hace POST a /orders', () => {
        const payload = {
            customer_name: 'Ana',
            item: 'Laptop',
            quantity: 1,
            status: 'pending' as const,
        };

        const created: Order = {
            ...payload,
            id: 'ord_1',
            created_at: new Date().toISOString(),
        };

        service.createOrder(payload).subscribe((res) => {
            expect(res).toEqual(created);
        });

        const req = httpMock.expectOne(base);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(payload);
        req.flush(created);
    });

    it('updateOrder hace PUT a /:id', () => {
        const update = { quantity: 2 };
        const updated: Order = {
            id: 'ord_1',
            customer_name: 'Ana',
            item: 'Laptop',
            quantity: 2,
            status: 'pending',
            created_at: new Date().toISOString(),
        };

        service.updateOrder('ord_1', update).subscribe((res) => {
            expect(res).toEqual(updated);
        });

        const req = httpMock.expectOne(`${base}/ord_1`);
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(update);
        req.flush(updated);
    });

    // src/app/services/orders.service.spec.ts  (línea del test de delete)
    it('deleteOrder maneja 204 sin cuerpo', () => {
        service.deleteOrder('ord_1').subscribe((res) => {
            // HttpClient emite null para 204 No Content
            expect(res).toBeNull();
        });

        const req = httpMock.expectOne(`${base}/ord_1`);
        expect(req.request.method).toBe('DELETE');
        req.flush(null, { status: 204, statusText: 'No Content' });
    });

});
