import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProductApiService } from '../../../../core/services/productApi.service';
import { Product } from '../../../../core/models/product.interface';
import { ProductsService } from '../../../services/products.service';
import { Subscription } from 'rxjs';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  productos: Product[] = [];
  isLoading = false;
  productApiService = inject(ProductApiService);
  productsService = inject(ProductsService);
  private subscription = new Subscription();

  ngOnInit() {
    this.subscription.add(
      this.productsService.selectedCategory$.subscribe(category => {
        this.getProducts(category);
      }));
  }

  getProducts(category: string) {
    this.isLoading = true;
    this.productApiService.getAll(category).subscribe({
      next: res => {
        this.productos = res;
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
