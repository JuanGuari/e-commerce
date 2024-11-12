import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private selectedCategorySubject: BehaviorSubject<string> = new BehaviorSubject<string>(''); 
  public selectedCategory$ = this.selectedCategorySubject.asObservable();

  setCategory(category: string): void {
    this.selectedCategorySubject.next(category);
  }
}
