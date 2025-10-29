// src/app/components/order-detail/order-detail.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { OrderDetailComponent } from './order-detail.component';
import { OrdersService } from '../../services/orders.service';

describe('OrderDetailComponent', () => {
  let fixture: ComponentFixture<OrderDetailComponent>;
  let component: OrderDetailComponent;
  let svcSpy: jasmine.SpyObj<OrdersService>;

  beforeEach(async () => {
    svcSpy = jasmine.createSpyObj('OrdersService', ['getOrderById']);

    await TestBed.configureTestingModule({
      imports: [OrderDetailComponent], // standalone
      providers: [
        { provide: OrdersService, useValue: svcSpy },
        // ✅ Mock para snapshot.paramMap y también paramMap observable (por si el componente lo usa)
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: convertToParamMap({ id: 'ord_1' }) },
            paramMap: of(convertToParamMap({ id: 'ord_1' })),
          },
        },
      ],
    }).compileComponents();

    svcSpy.getOrderById.and.returnValue(
      of({
        id: 'ord_1',
        customer_name: 'Ana',
        item: 'Laptop',
        quantity: 1,
        status: 'pending',
        created_at: new Date().toISOString(),
      })
    );

    fixture = TestBed.createComponent(OrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // dispara ngOnInit -> loadOrder()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(svcSpy.getOrderById).toHaveBeenCalledWith('ord_1');
  });
});
