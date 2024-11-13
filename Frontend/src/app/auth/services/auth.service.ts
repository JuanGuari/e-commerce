import { Injectable } from '@angular/core';
import { BaseService } from '../../core/services/base.service';
import { Observable, tap } from 'rxjs';
import { User } from '../../core/models/user.interface';
import { LoginResponseInterface } from '../../core/models/loginResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  user?: User;
  routeSelected = "/";

  handle401Error() {
    throw new Error('Method not implemented.');
  }

  login(username: string, password: string): Observable<LoginResponseInterface> {
    return this.http.post<LoginResponseInterface>(`${this.url}/api/v1/Auth/Login`, { username, password })
      .pipe(
        tap(response => {          
          if (response.data && response.data.token) {
            localStorage.setItem('jwtToken', response.data.token);
          }
        })
      );
  }



  logout() {
    localStorage.removeItem('jwtToken');
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

}
