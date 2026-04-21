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
      expiresIn: 3600,
      tokenType: 'Bearer'
    });

    expect(authTokenService.getToken()).toBe('jwt-token');
  });
});

