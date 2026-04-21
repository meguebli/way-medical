import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthApiService } from './auth-api.service';
import { AuthTokenService } from './auth-token.service';

describe('AuthApiService', () => {
  let service: AuthApiService;
  let httpMock: HttpTestingController;
  let authTokenService: AuthTokenService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthApiService, AuthTokenService]
    });

    service = TestBed.inject(AuthApiService);
    httpMock = TestBed.inject(HttpTestingController);
    authTokenService = TestBed.inject(AuthTokenService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should login and persist jwt token', () => {
    service.login({
      email: 'admin@wayupit.fr',
      password: 'ChangeMe123!'
    }).subscribe();

    const request = httpMock.expectOne('http://localhost:8080/api/v1/auth/login');
    expect(request.request.method).toBe('POST');
    request.flush({
      accessToken: 'jwt-token',
      refreshToken: 'refresh-token',
      expiresIn: 3600,
      refreshExpiresIn: 604800,
      tokenType: 'Bearer'
    });

    expect(authTokenService.getToken()).toBe('jwt-token');
    expect(authTokenService.getRefreshToken()).toBe('refresh-token');
  });

  it('should refresh and rotate stored tokens', () => {
    authTokenService.setTokens('expired-access', 'refresh-token');

    service.refresh().subscribe();

    const request = httpMock.expectOne('http://localhost:8080/api/v1/auth/refresh');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ refreshToken: 'refresh-token' });
    request.flush({
      accessToken: 'new-access',
      refreshToken: 'new-refresh',
      expiresIn: 3600,
      refreshExpiresIn: 604800,
      tokenType: 'Bearer'
    });

    expect(authTokenService.getToken()).toBe('new-access');
    expect(authTokenService.getRefreshToken()).toBe('new-refresh');
  });

  it('should logout and clear tokens', () => {
    authTokenService.setTokens('jwt-token', 'refresh-token');

    service.logout().subscribe();

    const request = httpMock.expectOne('http://localhost:8080/api/v1/auth/logout');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ refreshToken: 'refresh-token' });
    request.flush({});

    expect(authTokenService.getToken()).toBeNull();
    expect(authTokenService.getRefreshToken()).toBeNull();
  });
});
