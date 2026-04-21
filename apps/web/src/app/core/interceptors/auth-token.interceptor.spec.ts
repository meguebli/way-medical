import { HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { authTokenInterceptor } from './auth-token.interceptor';
import { AuthTokenService } from '../services/auth-token.service';

describe('authTokenInterceptor', () => {
  let authTokenService: AuthTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthTokenService]
    });

    authTokenService = TestBed.inject(AuthTokenService);
  });

  it('should append bearer token when one exists', (done) => {
    authTokenService.setToken('jwt-token');

    const request = new HttpRequest('GET', '/users');
    const next: HttpHandlerFn = (req) => {
      expect(req.headers.get('Authorization')).toBe('Bearer jwt-token');
      return of(new HttpResponse({ status: 200 }));
    };

    TestBed.runInInjectionContext(() => authTokenInterceptor(request, next))
      .subscribe(() => done());
  });
});
