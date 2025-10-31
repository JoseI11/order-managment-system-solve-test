import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { OrdersService } from '../../services/orders.service';
import { OrdersListComponent } from './orders-list.component';

describe('OrdersListComponent', () => {
  let svcSpy: jasmine.SpyObj<OrdersService>;
  let component: OrdersListComponent;
  let fixture: ComponentFixture<OrdersListComponent>;

  beforeEach(async () => {
    svcSpy = jasmine.createSpyObj('OrdersService', ['getOrders', 'getOrderById', 'createOrder', 'updateOrder', 'deleteOrder']);
    await TestBed.configureTestingModule({
      imports: [OrdersListComponent],
      providers: [{ provide: OrdersService, useValue: svcSpy }]
    })
      .compileComponents();

    // fixture = TestBed.createComponent(OrdersListComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    svcSpy.getOrders.and.returnValue(of({ items: [], total: 0, page: 1, page_size: 10, total_pages: 0 }));
    const f = TestBed.createComponent(OrdersListComponent);
    f.detectChanges();
    expect(f.componentInstance).toBeTruthy();
  });
});
