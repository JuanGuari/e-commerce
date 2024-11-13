import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-paginator',
  standalone: true,
  imports: [],
  templateUrl: './custom-paginator.component.html',
  styleUrl: './custom-paginator.component.scss'
})
export class CustomPaginatorComponent {
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 10;
  @Input() totalItems: number = 0;
  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChange.emit(this.currentPage);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChange.emit(this.currentPage);
    }
  }
}
