import { TestBed } from '@angular/core/testing';
import { AuthTokenService } from './auth-token.service';

describe('AuthTokenService', () => {
  let service: AuthTokenService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthTokenService);
  });

  it('should store and clear the token', () => {
    service.setToken('token-123');
    expect(service.getToken()).toBe('token-123');

    service.clearToken();
    expect(service.getToken()).toBeNull();
  });

  it('should restore token from localStorage', () => {
    localStorage.setItem('wm_access_token', 'persisted-token');

    const restoredService = TestBed.inject(AuthTokenService);

    expect(restoredService.getToken()).toBe('persisted-token');
  });
});
