
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { OrdersService, Order } from '../../services/orders.service';

@Injectable({
  providedIn: 'root', // Asegúrate de mantenerlo como 'root' o proveerlo en el módulo de rutas
})
export class OrderResolver implements Resolve<Order> {
  constructor(private ordersService: OrdersService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Order> {
    const id = route.paramMap.get('id');
    if (!id) {
      throw new Error('ID de orden no proporcionado');
    }
    return this.ordersService.getOrderById(id);
  }
}