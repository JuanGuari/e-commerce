import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductApiService } from '../../../core/services/productApi.service';
import { Product } from '../../../core/models/product.interface';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/services/auth.service';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { ToastComponent } from '../../../../shared/components/toast/toast.component';
import { OrderApiService } from '../../../core/services/order-api.service';
import { LocalStorageKeys } from '../../../../shared/constants/constants';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, ToastComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  productId = inject(ActivatedRoute).snapshot.paramMap.get('id') ?? "0";
  productApiService = inject(ProductApiService);
  orderApiService = inject(OrderApiService);
  authService = inject(AuthService);
  router = inject(Router);
  product?: Product;
  type = 'info';
  toastMessage = 's'
  showToast = false;
  isLoading = false;

  ngOnInit() {
    this.getProductDetails();
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  getProductDetails(){
    this.productApiService.getProductById(this.productId).subscribe({
      next: res => {
        this.product = res;
      },
      error: error => {
        console.log(error);
      },
      complete: () => {
      }
    });
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated();
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

}
