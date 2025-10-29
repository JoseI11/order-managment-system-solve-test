import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

// Servicios
import { OrdersService } from '../../services/orders.service';

type OrderStatus = 'pending' | 'completed' | 'cancelled';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RouterModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit, OnDestroy {
  orderForm: FormGroup;
  isEditMode = false;
  orderId: string | null = null;
  loading = false;
  submitted = false;
  error: string | null = null;
  
  // Opciones para el selector de estado
  statusOptions = [
    { value: 'pending', viewValue: 'Pendiente' },
    { value: 'completed', viewValue: 'Completada' },
    { value: 'cancelled', viewValue: 'Cancelada' }
  ];
  
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private ordersService: OrdersService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.orderForm = this.fb.group({
      customer_name: ['', Validators.required],
      item: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      status: ['pending', Validators.required]
    });
  }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id');
    if (this.orderId) {
      this.isEditMode = true;
      this.loadOrder(this.orderId);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadOrder(id: string): void {
    this.loading = true;
    this.error = null;
    
    this.ordersService.getOrderById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (order) => {
          this.orderForm.patchValue(order);
          this.loading = false;
        },
        error: (err) => {
          console.error('Error al cargar la orden:', err);
          this.error = 'No se pudo cargar la orden. Por favor, intente de nuevo.';
          this.loading = false;
          this.showError('Error al cargar la orden');
        }
      });
  }

  // Obtener controles del formulario para facilitar el acceso
  get f() { return this.orderForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.error = null;
    
    // Detener si el formulario es inválido
    if (this.orderForm.invalid || this.loading) {
      return;
    }

    this.loading = true;
    const orderData = this.orderForm.value;

    const operation = this.isEditMode && this.orderId
      ? this.ordersService.updateOrder(this.orderId, orderData)
      : this.ordersService.createOrder(orderData);

    operation
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          const message = this.isEditMode 
            ? '¡Orden actualizada correctamente!'
            : '¡Orden creada correctamente!';
          
          this.showSuccess(message);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error al guardar la orden:', err);
          this.error = 'Ocurrió un error al guardar la orden. Por favor, intente de nuevo.';
          this.loading = false;
          this.showError('Error al guardar la orden');
        }
      });
  }

  // Mostrar notificación de éxito
  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: ['success-snackbar']
    });
  }

  // Mostrar notificación de error
  private showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }

  // Volver atrás
  onCancel(): void {
    if (this.orderForm.pristine || confirm('¿Está seguro de que desea salir? Los cambios no guardados se perderán.')) {
      this.router.navigate(['/']);
    }
  }
}