import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  productId = inject(ActivatedRoute).snapshot.paramMap.get('id');
  
  ngOnInit(){
    console.log(this.productId);
  }
}
