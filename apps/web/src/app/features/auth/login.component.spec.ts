import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthApiService } from '../../core/services/auth-api.service';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let authApiService: jasmine.SpyObj<AuthApiService>;

  beforeEach(async () => {
    authApiService = jasmine.createSpyObj<AuthApiService>('AuthApiService', ['login']);
    authApiService.login.and.returnValue(of({
      accessToken: 'jwt-token',
      expiresIn: 3600,
      tokenType: 'Bearer'
    }));

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: AuthApiService, useValue: authApiService },
        { provide: Router, useValue: { navigate: () => Promise.resolve(true) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
  });

  it('should submit login credentials', () => {
    fixture.componentInstance.submit();

    expect(authApiService.login).toHaveBeenCalledWith({
      email: 'admin@wayupit.fr',
      password: 'ChangeMe123!'
    });
  });
});

