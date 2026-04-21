import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../config/environment';
import { LoginRequest, LoginResponse, LogoutRequest, RefreshTokenRequest } from '../models/auth.model';
import { AuthTokenService } from './auth-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private readonly http = inject(HttpClient);
  private readonly httpBackend = inject(HttpBackend);
  private readonly authTokenService = inject(AuthTokenService);
  private readonly rawHttpClient = new HttpClient(this.httpBackend);

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/auth/login`, payload).pipe(
      tap((response) => this.authTokenService.setTokens(response.accessToken, response.refreshToken))
    );
  }

  refresh(): Observable<LoginResponse> {
    const refreshToken = this.authTokenService.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const payload: RefreshTokenRequest = { refreshToken };
    return this.rawHttpClient.post<LoginResponse>(`${environment.apiBaseUrl}/auth/refresh`, payload).pipe(
      tap((response) => this.authTokenService.setTokens(response.accessToken, response.refreshToken))
    );
  }

  logout(): Observable<void> {
    const refreshToken = this.authTokenService.getRefreshToken();
    if (!refreshToken) {
      this.authTokenService.clearToken();
      return of(void 0);
    }

    const payload: LogoutRequest = { refreshToken };
    return this.rawHttpClient.post<void>(`${environment.apiBaseUrl}/auth/logout`, payload).pipe(
      tap(() => this.authTokenService.clearToken())
    );
  }

  clearSession(): void {
    this.authTokenService.clearToken();
  }
}
