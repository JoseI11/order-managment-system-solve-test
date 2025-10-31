// src/app/components/order-form/order-form.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms'; // si tu form es reactivo
import { of } from 'rxjs';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { OrderFormComponent } from './order-form.component';
import { OrdersService } from '../../services/orders.service';

describe('OrderFormComponent', () => {
  let fixture: ComponentFixture<OrderFormComponent>;
  let component: OrderFormComponent;
  let svcSpy: jasmine.SpyObj<OrdersService>;

  beforeEach(async () => {
    svcSpy = jasmine.createSpyObj('OrdersService', [
      'createOrder',
      'updateOrder',
      'getOrderById',
    ]);

    await TestBed.configureTestingModule({
      imports: [OrderFormComponent, ReactiveFormsModule],
      providers: [
        { provide: OrdersService, useValue: svcSpy },
        // ✅ Si el form soporta modo edición por :id, mockeamos ActivatedRoute
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: convertToParamMap({ /* id: 'ord_1' */ }) }, // pon id si tu form carga edición
            paramMap: of(convertToParamMap({ /* id: 'ord_1' */ })),
          },
        },
      ],
    }).compileComponents();

    // Si en edición el componente llama getOrderById, descomenta esto:
    // svcSpy.getOrderById.and.returnValue(of({
    //   id: 'ord_1', customer_name:'Ana', item:'Laptop', quantity:1, status:'pending', created_at:new Date().toISOString()
    // }));

    fixture = TestBed.createComponent(OrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
