import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {
  private readonly tokenSignal = signal<string | null>(null);

  setToken(token: string): void {
    this.tokenSignal.set(token);
  }

  clearToken(): void {
    this.tokenSignal.set(null);
  }

  getToken(): string | null {
    return this.tokenSignal();
  }
}

