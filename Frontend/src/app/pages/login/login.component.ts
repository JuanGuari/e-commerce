import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { LocalStorageKeys } from '../../../shared/constants/constants';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/services/auth.service';
import { ToastComponent } from '../../../shared/components/toast/toast.component';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ToastComponent, SpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  type = 'info';
  toastMessage = 's'
  showToast = false;
  isLoading = false;
  localStorageService = inject(LocalStorageService);
  _router = inject(Router);
  authService = inject(AuthService);

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    const username = this.localStorageService.getItem(LocalStorageKeys.USERNAME);
    const password = this.localStorageService.getItem(LocalStorageKeys.PASSWORD);
    const rememberMe = localStorage.getItem('rememberMe');
    if (username && password) {
      this.username = username;
      this.password = password;
      this.rememberMe = !!rememberMe;
    }
  }

  onRememberMeChange() {
    this.localStorageService.setItem(LocalStorageKeys.USERNAME, this.username);
    this.localStorageService.setItem(LocalStorageKeys.PASSWORD, this.password);
    this.localStorageService.setItem(LocalStorageKeys.REMEMBER_ME, this.rememberMe);
  }

  removeRememberMe() {
    this.localStorageService.removeItem(LocalStorageKeys.USERNAME);
    this.localStorageService.removeItem(LocalStorageKeys.PASSWORD);
    this.localStorageService.removeItem(LocalStorageKeys.REMEMBER_ME);
  }

  onSubmit() {
    this.isLoading = true;
    this.authService.login(this.username, this.password).subscribe({
      next: res => {    
        this.localStorageService.setItem(LocalStorageKeys.USER_DATA,res.data);    
      },
      error: error => {
        console.log(error);
        this.showToastNow(true, error.message );
        this.isLoading = false;
      },
      complete: () => {
        setTimeout(() => {
          this.isLoading = false;
          this.rememberMe ? this.onRememberMeChange() : this.removeRememberMe();
          this._router.navigate([this.authService.routeSelected]);
        }, 1000);       
      }
    });
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
