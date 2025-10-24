import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';

// Servicios
import { OrdersService, Order } from '../../services/orders.service';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDividerModule,
    DatePipe
  ],
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  order: Order | null = null;
  statusLabels: { [key: string]: string } = {
    'pending': 'Pendiente',
    'completed': 'Completada',
    'cancelled': 'Cancelada'
  };
  loading = true;
  error: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ordersService: OrdersService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadOrder();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadOrder(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'ID de orden no válido';
      this.loading = false;
      return;
    }

    this.ordersService.getOrderById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (order) => {
          this.order = order;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error al cargar la orden:', err);
          this.error = 'No se pudo cargar la orden. Intente nuevamente.';
          this.loading = false;
          this.showError('Error al cargar la orden');
        }
      });
  }

  getStatusLabel(status: string): string {
    return this.statusLabels[status] || status;
  }

  onEdit(): void {
    if (this.order) {
      this.router.navigate(['/edit', this.order.id]);
    }
  }

  onDelete(): void {
    if (!this.order) return;

    if (confirm(`¿Está seguro de que desea eliminar la orden #${this.order.id}?`)) {
      this.loading = true;
      this.ordersService.deleteOrder(this.order.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.showSuccess('Orden eliminada correctamente');
            this.router.navigate(['/orders']);
          },
          error: (err) => {
            console.error('Error al eliminar la orden:', err);
            this.loading = false;
            this.showError('Error al eliminar la orden');
          }
        });
    }
  }

  onBack(): void {
    this.router.navigate(['/orders']);
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: ['success-snackbar']
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
}
