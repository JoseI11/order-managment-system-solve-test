import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderResolver } from './components/orders/order.resolve';

export const routes: Routes = [
  { path: '', component: OrdersListComponent },
  { path: 'order/:id', component: OrderDetailComponent },
  { path: 'create', component: OrderFormComponent },
  { path: 'edit/:id', component: OrderFormComponent, resolve: { order: OrderResolver } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}


