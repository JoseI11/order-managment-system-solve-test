import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';

import {
  OrdersService,
  Order,
  PaginatedOrders,
} from '../../services/orders.service';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatCardModule
  ],
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit, OnDestroy {
  // Datos de la tabla
  displayedColumns: string[] = ['id', 'customer_name', 'item', 'quantity', 'status', 'created_at', 'actions'];
  dataSource: Order[] = [];
  
  // Estado de carga y errores
  loading = true;
  error: string | null = null;
  
  // Paginación
  totalItems = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 50];
  
  // Filtros
  searchTerm = '';
  statusFilter = '';
  statusOptions = [
    { value: '', viewValue: 'Todos' },
    { value: 'pending', viewValue: 'Pendiente' },
    { value: 'completed', viewValue: 'Completada' },
    { value: 'cancelled', viewValue: 'Cancelada' }
  ];
  
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private ordersService: OrdersService,
    private router: Router
  ) {
    // Configurar el debounce para la búsqueda
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.pageIndex = 0; // Resetear a la primera página al buscar
      this.loadOrders();
    });
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadOrders(): void {
    this.loading = true;
    this.error = null;
    
    this.ordersService.getOrders(
      this.pageIndex + 1, // La API espera páginas basadas en 1
      this.pageSize,
      this.statusFilter || undefined
    )
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: PaginatedOrders) => {
        this.dataSource = data.items;
        this.totalItems = data.total;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar las órdenes:', err);
        this.error = 'Error al cargar las órdenes. Por favor, intente de nuevo.';
        this.loading = false;
      },
    });
  }

  // Manejar eventos de paginación
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadOrders();
  }

  // Manejar búsqueda con debounce
  onSearchChange(searchValue: string): void {
    this.searchTerm = searchValue;
    this.searchSubject.next(searchValue);
  }

  // Aplicar filtro de estado
  applyStatusFilter(): void {
    this.pageIndex = 0; // Resetear a la primera página al aplicar filtro
    this.loadOrders();
  }

  // Limpiar todos los filtros
  clearFilters(): void {
    this.searchTerm = '';
    this.statusFilter = '';
    this.pageIndex = 0;
    this.loadOrders();
  }

  // Navegar a la vista de detalles
  viewOrder(id: string): void {
    this.router.navigate(['/order', id]);
  }

  // Navegar a la creación de orden
  createNewOrder(): void {
    this.router.navigate(['/create']);
  }

  // Eliminar orden con confirmación
  deleteOrder(id: string): void {
    if (confirm('¿Estás seguro de eliminar esta orden? Esta acción no se puede deshacer.')) {
      this.ordersService.deleteOrder(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            // Recargar la página actual después de eliminar
            this.loadOrders();
          },
          error: (err) => {
            console.error(`Error al eliminar la orden ${id}:`, err);
            this.error = 'Error al eliminar la orden. Por favor, intente de nuevo.';
          },
        });
    }
  }

  editOrder(id: string): void {
    this.router.navigate(['/edit', id]);
  }
}