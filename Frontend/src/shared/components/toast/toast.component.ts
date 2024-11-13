import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  @Input() message = 'La acción se realizo con éxito';
  @Input() showToast = false;
  @Input() type = 'success';

  closeToast() {
    this.showToast = false;
  }

  getToastClass(): string {
    switch (this.type) {
      case 'success':
        return 'bg-success text-white';
      case 'error':
        return 'bg-danger text-white';
      case 'warning':
        return 'bg-warning text-dark';
      case 'info':
      default:
        return 'bg-info text-white';
    }
  }

  getToastIcon(): string {
    switch (this.type) {
      case 'success':
        return 'bi-check2-circle';
      case 'error':
        return 'bi-x-circle'; 
      case 'warning':
        return 'bi-exclamation-circle';
      case 'info':
      default:
        return 'bi-info-circle'; 
    }
  }

}
