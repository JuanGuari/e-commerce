import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProductApiService } from '../../../../core/services/productApi.service';
import { Product } from '../../../../core/models/product.interface';
import { ProductsService } from '../../../services/products.service';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';
import { CustomPaginatorComponent } from '../../../../../shared/components/custom-paginator/custom-paginator.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, CustomPaginatorComponent, FormsModule],
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
  productApiService = inject(ProductApiService);
  productsService = inject(ProductsService);
  private searchSubject = new Subject<string>();
  private subscription = new Subscription();

  ngOnInit() {
    this.subscription.add(
      this.productsService.selectedCategory$.subscribe(category => {
        this.selectedCategory = category;
        this.currentPage = 1;
        this.getProducts();
      }));

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
