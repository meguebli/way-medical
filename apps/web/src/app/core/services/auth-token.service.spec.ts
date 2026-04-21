import { TestBed } from '@angular/core/testing';
import { AuthTokenService } from './auth-token.service';

describe('AuthTokenService', () => {
  let service: AuthTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthTokenService);
  });

  it('should store and clear the token', () => {
    service.setToken('token-123');
    expect(service.getToken()).toBe('token-123');

    service.clearToken();
    expect(service.getToken()).toBeNull();
  });
});

