import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {
  private static readonly storageKey = 'wm_access_token';
  private readonly tokenSignal = signal<string | null>(this.readInitialToken());

  setToken(token: string): void {
    localStorage.setItem(AuthTokenService.storageKey, token);
    this.tokenSignal.set(token);
  }

  clearToken(): void {
    localStorage.removeItem(AuthTokenService.storageKey);
    this.tokenSignal.set(null);
  }

  getToken(): string | null {
    return this.tokenSignal();
  }

  isAuthenticated(): boolean {
    return !!this.tokenSignal();
  }

  private readInitialToken(): string | null {
    return typeof localStorage === 'undefined'
      ? null
      : localStorage.getItem(AuthTokenService.storageKey);
  }
}
