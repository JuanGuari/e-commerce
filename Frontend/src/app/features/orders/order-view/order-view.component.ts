import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { OrderApiService } from '../../../core/services/order-api.service';
import { LocalStorageKeys } from '../../../../shared/constants/constants';
import { Subscription } from 'rxjs';
import { Cart, OrderProduct } from '../../../core/models/cart.interface';
import { ToastComponent } from '../../../../shared/components/toast/toast.component';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-order-view',
  standalone: true,
  imports: [CommonModule, RouterLink, ToastComponent, SpinnerComponent],
  templateUrl: './order-view.component.html',
  styleUrl: './order-view.component.scss'
})
export class OrderViewComponent {
  cartItems: OrderProduct[] = [];
  totalAmount: number = 0;
  type = 'info';
  toastMessage = 's'
  showToast = false;
  isLoading = false;
  cart?: Cart;
  cartService = inject(CartService);
  authService = inject(AuthService);
  orderApiService = inject(OrderApiService);
  private subscription = new Subscription();


  ngOnInit(): void {
    this.getOrderForUser();
    this.listeningCartItems();
  }

  listeningCartItems(): void {
    this.subscription.add(this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    }));
  }

  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  removeFromCart(productId: number ): void {
    this.cartService.removeFromCart(productId.toString());
    this.calculateTotal();
  }

  checkoutCart(): void {
    this.isLoading = true;
    this.orderApiService.CheckoutCart(this.getUserId()).subscribe({
      next: res => {
        this.cart && (this.cart.status = "Confirmado");
        this.isLoading = false;
      },
      error: error => {
        console.log(error);
        this.isLoading = false;
        this.showToastNow(true, error.message );
      },
      complete: () => {
        this.showToastNow(false );
      }
    });
  }

  selectRoute() {
    this.authService.routeSelected = "/";
  }

  getOrderForUser() {
    this.orderApiService.getOrderByUser(this.getUserId()).subscribe({
      next: res => {
        this.cartItems = this.groupById(res.orderProducts);
        this.cart = res;
        this.cartService.setItemsInCart(this.cartItems);
      },
      error: error => {
        this.cartService.clearCart();
        console.log(error);
      },
      complete: () => {
      }
    });
  }

  groupById(orderProducts: OrderProduct[]): OrderProduct[] {
    return orderProducts.reduce((acc, item) => {
      const existingProduct = acc.find(prod => prod.productId === item.productId);
      if (existingProduct) {
        existingProduct.quantity += item.quantity;
      } else {
        acc.push({ ...item });
      }
      return acc;
    }, [] as OrderProduct[]);
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
