import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthApiService } from '../services/auth-api.service';
import { AuthTokenService } from '../services/auth-token.service';

export const authTokenInterceptor: HttpInterceptorFn = (request, next) => {
  const authApiService = inject(AuthApiService);
  const authTokenService = inject(AuthTokenService);
  const router = inject(Router);
  const isAuthEndpoint = request.url.includes('/auth/login')
    || request.url.includes('/auth/refresh')
    || request.url.includes('/auth/logout');
  const token = authTokenService.getToken();

  const authorizedRequest = !token || isAuthEndpoint
    ? request
    : request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

  return next(authorizedRequest).pipe(
    catchError((error: unknown) => {
      if (!(error instanceof HttpErrorResponse) || error.status !== 401 || isAuthEndpoint) {
        return throwError(() => error);
      }

      const refreshToken = authTokenService.getRefreshToken();
      if (!refreshToken) {
        authApiService.clearSession();
        void router.navigate(['/login']);
        return throwError(() => error);
      }

      return authApiService.refresh().pipe(
        switchMap((response) => next(request.clone({
          setHeaders: {
            Authorization: `Bearer ${response.accessToken}`
          }
        }))),
        catchError((refreshError) => {
          authApiService.clearSession();
          void router.navigate(['/login']);
          return throwError(() => refreshError);
        })
      );
    })
  );
};
