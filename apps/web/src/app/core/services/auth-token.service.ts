import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {
  private static readonly accessTokenStorageKey = 'wm_access_token';
  private static readonly refreshTokenStorageKey = 'wm_refresh_token';
  private readonly accessTokenSignal = signal<string | null>(this.readStorage(AuthTokenService.accessTokenStorageKey));
  private readonly refreshTokenSignal = signal<string | null>(this.readStorage(AuthTokenService.refreshTokenStorageKey));

  setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(AuthTokenService.accessTokenStorageKey, accessToken);
    localStorage.setItem(AuthTokenService.refreshTokenStorageKey, refreshToken);
    this.accessTokenSignal.set(accessToken);
    this.refreshTokenSignal.set(refreshToken);
  }

  clearToken(): void {
    localStorage.removeItem(AuthTokenService.accessTokenStorageKey);
    localStorage.removeItem(AuthTokenService.refreshTokenStorageKey);
    this.accessTokenSignal.set(null);
    this.refreshTokenSignal.set(null);
  }

  getToken(): string | null {
    return this.accessTokenSignal();
  }

  getRefreshToken(): string | null {
    return this.refreshTokenSignal();
  }

  isAuthenticated(): boolean {
    return !!this.accessTokenSignal();
  }

  private readStorage(key: string): string | null {
    return typeof localStorage === 'undefined'
      ? null
      : localStorage.getItem(key);
  }
}
