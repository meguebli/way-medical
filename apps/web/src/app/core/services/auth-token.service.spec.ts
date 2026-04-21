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
    service.setTokens('token-123', 'refresh-456');
    expect(service.getToken()).toBe('token-123');
    expect(service.getRefreshToken()).toBe('refresh-456');

    service.clearToken();
    expect(service.getToken()).toBeNull();
    expect(service.getRefreshToken()).toBeNull();
  });

  it('should restore token from localStorage', () => {
    TestBed.resetTestingModule();
    localStorage.setItem('wm_access_token', 'persisted-token');
    localStorage.setItem('wm_refresh_token', 'persisted-refresh');

    TestBed.configureTestingModule({});
    const restoredService = TestBed.inject(AuthTokenService);

    expect(restoredService.getToken()).toBe('persisted-token');
    expect(restoredService.getRefreshToken()).toBe('persisted-refresh');
  });
});
