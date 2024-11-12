import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const token = authService.getToken();
    let authReq = req;

    if (token && !req.url.includes('login')) {
        authReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
    }

    return next(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                authService.handle401Error();
            }
            return throwError(() => error);
        })
    );
};
