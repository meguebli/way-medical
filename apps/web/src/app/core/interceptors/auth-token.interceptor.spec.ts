import { HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { authTokenInterceptor } from './auth-token.interceptor';
import { AuthApiService } from '../services/auth-api.service';
import { AuthTokenService } from '../services/auth-token.service';

describe('authTokenInterceptor', () => {
  let authTokenService: AuthTokenService;
  let authApiService: jasmine.SpyObj<AuthApiService>;

  beforeEach(() => {
    authApiService = jasmine.createSpyObj<AuthApiService>('AuthApiService', ['refresh', 'clearSession']);
    TestBed.configureTestingModule({
      providers: [
        AuthTokenService,
        { provide: AuthApiService, useValue: authApiService },
        { provide: Router, useValue: { navigate: () => Promise.resolve(true) } }
      ]
    });

    authTokenService = TestBed.inject(AuthTokenService);
  });

  it('should append bearer token when one exists', (done) => {
    authTokenService.setTokens('jwt-token', 'refresh-token');

    const request = new HttpRequest('GET', '/users');
    const next: HttpHandlerFn = (req) => {
      expect(req.headers.get('Authorization')).toBe('Bearer jwt-token');
      return of(new HttpResponse({ status: 200 }));
    };

    TestBed.runInInjectionContext(() => authTokenInterceptor(request, next))
      .subscribe(() => done());
  });
});
