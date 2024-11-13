import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { debounceTime, Subject, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { CustomPaginatorComponent } from '../../../../shared/components/custom-paginator/custom-paginator.component';
import { ProductApiService } from '../../../core/services/productApi.service';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../../core/models/product.interface';
import { OrderApiService } from '../../../core/services/order-api.service';
import { LocalStorageKeys } from '../../../../shared/constants/constants';
import { ToastComponent } from '../../../../shared/components/toast/toast.component';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, CustomPaginatorComponent, FormsModule, RouterLink,
    ToastComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  products: Product[] = [];
  isLoading = false;
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalItems: number = 0;
  selectedCategory = '';
  searchTerm = '';
  type = 'info';
  toastMessage = 's'
  showToast = false;
  productApiService = inject(ProductApiService);
  productsService = inject(ProductsService);
  orderApiService = inject(OrderApiService);
  authService = inject(AuthService);
  private searchSubject = new Subject<string>();
  private subscription = new Subscription();

  ngOnInit() {
    this.listeningCategory();
    this.listeningSearch();
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  listeningCategory() {
    this.subscription.add(
      this.productsService.selectedCategory$.subscribe(category => {
        this.selectedCategory = category;
        this.currentPage = 1;
        this.getProducts();
      }));
  }

  listeningSearch() {
    this.subscription.add(
      this.searchSubject.pipe(debounceTime(1000)).subscribe(searchTerm => {
        this.currentPage = 1;
        this.getProducts();
      })
    );
  }

  getProducts() {
    this.isLoading = true;
    this.productApiService.getAll(this.selectedCategory, this.currentPage,
      this.itemsPerPage, this.searchTerm)
      .subscribe({
        next: res => {
          this.products = res.products;
          this.totalItems = res.totalItems;
        },
        error: error => {
          console.log(error);
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }

  onPageChanged(page: number) {
    this.currentPage = page;
    this.getProducts();
  }

  onSearch() {
    this.searchSubject.next(this.searchTerm);
  }

  resetSearch() {
    this.searchTerm = '';
    this.onSearch();
  }

  addToCart(product: Product) {
    this.isLoading = true;
    this.orderApiService.addProductToCart(this.getUserId(), product.id, 1).subscribe({
      next: res => {
      },
      error: error => {
        console.log(error);
        this.isLoading = false;
        this.showToastNow(true, error.message );
      },
      complete: () => {
        this.showToastNow(false);
        this.isLoading = false;
      }
    });
  }

  getUserId() {
    const userData = localStorage.getItem(LocalStorageKeys.USER_DATA) ?? "";
    const userObject = JSON.parse(userData);
    const userId = userObject.id;
    return userId;
  }

  showToastNow(ocurredError: boolean, message?: string) {
    this.type = ocurredError ? 'error' : 'success';
    this.toastMessage = ocurredError ? message ?? 'Error en el servidor' : 'Completado con éxito';
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
