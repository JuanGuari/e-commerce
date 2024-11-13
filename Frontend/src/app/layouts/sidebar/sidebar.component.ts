import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductApiService } from '../../core/services/productApi.service';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../features/services/products.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  router = inject(Router);
  productApiService = inject(ProductApiService);
  productsService = inject(ProductsService);
  categories: string[] = [];
  selectedCategory: string = '';

  ngOnInit(){
    this.getCategories();
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.productsService.setCategory(category);
  }

  trackByIndex(index: number): number {
    return index; 
  }

  getCategories(){
    this.productApiService.getCategories().subscribe({
      next: res => {
        this.categories = res;
      },
      error: error => {
        console.log(error);
      },
      complete: () => {
      }
    });
  }
}
