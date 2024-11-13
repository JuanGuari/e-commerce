import { Component, inject } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, SpinnerComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  themeService = inject(ThemeService);
  authService = inject(AuthService);
  username = "";
  isLoading = false;

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  logout() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.authService.logout();
      this.authService.routeSelected = "/";
    }, 1000);
  }

  selectRoute() {
    this.authService.routeSelected = "order";
  }

  get currentTheme() {
    return this.themeService.getCurrentTheme();
  }

  get isAuthenticated() {
    this.username = JSON.parse(localStorage.getItem('userName') || '{}');
    return this.authService.isAuthenticated();
  }

}
