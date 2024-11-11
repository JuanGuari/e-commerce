import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { LocalStorageKeys } from '../../../shared/constants/constants';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;

  localStorageService = inject(LocalStorageService);
  _router = inject(Router);

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    const username = this.localStorageService.getItem(LocalStorageKeys.USERNAME);
    const password = this.localStorageService.getItem(LocalStorageKeys.PASSWORD);
    const rememberMe = localStorage.getItem('rememberMe');
    if(username && password) {
      this.username = username;
      this.password = password;
      this.rememberMe = !!rememberMe;
    }
  }

  onRememberMeChange() {
    this.localStorageService.setItem(LocalStorageKeys.USERNAME,this.username );
    this.localStorageService.setItem(LocalStorageKeys.PASSWORD,this.password );
    this.localStorageService.setItem(LocalStorageKeys.REMEMBER_ME, this.rememberMe );
  }

  removeRememberMe() {
    this.localStorageService.removeItem(LocalStorageKeys.USERNAME);
    this.localStorageService.removeItem(LocalStorageKeys.PASSWORD);
    this.localStorageService.removeItem(LocalStorageKeys.REMEMBER_ME);
  }

  onSubmit() {
    this.rememberMe ? this.onRememberMeChange() : this.removeRememberMe() ;
    this._router.navigate(['/']);
  }
}
