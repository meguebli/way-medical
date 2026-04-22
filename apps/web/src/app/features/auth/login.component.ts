import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthApiService } from '../../core/services/auth-api.service';

@Component({
  selector: 'wm-login',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  template: `
    <section class="login-page">
      <mat-card class="login-card">
        <h1>Secure login</h1>
        <p>Connect Angular to the Spring Boot JWT backend.</p>

        <form [formGroup]="form" (ngSubmit)="submit()">
          <mat-form-field appearance="outline">
            <mat-label>Email</mat-label>
            <input matInput formControlName="email" type="email">
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Password</mat-label>
            <input matInput formControlName="password" type="password">
          </mat-form-field>

          <p class="helper">
            Local backend bootstrap user: <strong>admin&#64;wayupit.fr</strong> / <strong>ChangeMe123!</strong>
          </p>

          <p class="error" *ngIf="errorMessage()">{{ errorMessage() }}</p>

          <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid || isLoading()">
            {{ isLoading() ? 'Connecting...' : 'Login' }}
          </button>
        </form>
      </mat-card>
    </section>
  `,
  styles: [`
    .login-page {
      min-height: calc(100vh - 96px);
      display: grid;
      place-items: center;
    }

    .login-card {
      width: min(100%, 440px);
      padding: 1rem;
      border-radius: 24px;
      border: 1px solid var(--wm-border);
      box-shadow: 0 24px 48px rgba(31, 57, 88, 0.12);
    }

    form {
      display: grid;
      gap: 1rem;
    }

    .helper {
      margin: 0;
      color: var(--wm-muted);
      font-size: 0.9rem;
    }

    .error {
      margin: 0;
      color: #b3261e;
      font-weight: 600;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authApiService = inject(AuthApiService);
  private readonly router = inject(Router);

  readonly isLoading = signal(false);
  readonly errorMessage = signal('');

  readonly form = this.formBuilder.nonNullable.group({
    email: ['admin@wayupit.fr', [Validators.required, Validators.email]],
    password: ['ChangeMe123!', [Validators.required]]
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.authApiService.login(this.form.getRawValue())
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: () => void this.router.navigate(['/']),
        error: () => this.errorMessage.set('Login failed. Check backend availability or credentials.')
      });
  }
}
