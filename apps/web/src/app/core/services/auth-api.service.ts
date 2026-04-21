import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../config/environment';
import { LoginRequest, LoginResponse } from '../models/auth.model';
import { AuthTokenService } from './auth-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private readonly http = inject(HttpClient);
  private readonly authTokenService = inject(AuthTokenService);

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/auth/login`, payload).pipe(
      tap((response) => this.authTokenService.setToken(response.accessToken))
    );
  }

  logout(): void {
    this.authTokenService.clearToken();
  }
}

