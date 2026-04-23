import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthApiService } from '../../core/services/auth-api.service';

type UserTier = 'patient' | 'doctor' | 'admin';

@Component({
  selector: 'wm-login',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
<div class="login-wrapper">
  <!-- Logo & Header -->
  <div class="login-header">
    <div class="logo">
      <div class="logo-icon">he</div>
      <div class="logo-text">
        <div class="logo-brand">WAY Medical</div>
        <div class="logo-sub">Healthcare Platform</div>
      </div>
    </div>
  </div>

  <!-- Tier Selection or Login Form -->
  <div class="login-container">
    <!-- Step 1: Choose Tier -->
    <div *ngIf="currentStep() === 'tier-select'" class="login-panel">
      <h1>Bienvenue</h1>
      <p class="subtitle">Sélectionnez votre profil pour accéder à WAY Medical</p>

      <div class="tier-grid">
        <!-- Patient Tier -->
        <button class="tier-card" (click)="selectTier('patient')">
          <div class="tier-icon patient-icon">
            <mat-icon>person</mat-icon>
          </div>
          <div class="tier-name">Patient</div>
          <div class="tier-desc">Accédez à votre dossier médical, RDV et résultats</div>
          <div class="tier-arrow">
            <mat-icon>arrow_forward</mat-icon>
          </div>
        </button>

        <!-- Doctor/Staff Tier -->
        <button class="tier-card" (click)="selectTier('doctor')">
          <div class="tier-icon doctor-icon">
            <mat-icon>medical_services</mat-icon>
          </div>
          <div class="tier-name">Médecin / Staff</div>
          <div class="tier-desc">Gérez vos consultations et votre planning</div>
          <div class="tier-arrow">
            <mat-icon>arrow_forward</mat-icon>
          </div>
        </button>

        <!-- Admin Tier -->
        <button class="tier-card" (click)="selectTier('admin')">
          <div class="tier-icon admin-icon">
            <mat-icon>admin_panel_settings</mat-icon>
          </div>
          <div class="tier-name">Administration</div>
          <div class="tier-desc">Gérez établissements, utilisateurs et facturation</div>
          <div class="tier-arrow">
            <mat-icon>arrow_forward</mat-icon>
          </div>
        </button>
      </div>
    </div>

    <!-- Step 2: Login Form -->
    <div *ngIf="currentStep() === 'login'" class="login-panel">
      <button class="back-btn" (click)="backToTierSelect()">
        <mat-icon>arrow_back</mat-icon>
        Retour
      </button>

      <h1>{{ getTierLabel(selectedTier()!) }}</h1>
      <p class="subtitle">Connectez-vous avec vos identifiants</p>

      <form [formGroup]="form" (ngSubmit)="submit()" class="login-form">
        <!-- Email Field -->
        <div class="form-group">
          <label class="form-label">Email</label>
          <input
            type="email"
            formControlName="email"
            placeholder="votre@email.com"
            class="form-input"
            [class.error]="isFieldInvalid('email')"
          />
          <span class="error-msg" *ngIf="isFieldInvalid('email')">Email valide requis</span>
        </div>

        <!-- Password Field -->
        <div class="form-group">
          <label class="form-label">Mot de passe</label>
          <input
            [type]="showPassword() ? 'text' : 'password'"
            formControlName="password"
            placeholder="••••••••"
            class="form-input"
            [class.error]="isFieldInvalid('password')"
          />
          <button type="button" class="toggle-pwd" (click)="togglePassword()">
            <mat-icon>{{ showPassword() ? 'visibility' : 'visibility_off' }}</mat-icon>
          </button>
          <span class="error-msg" *ngIf="isFieldInvalid('password')">Mot de passe requis</span>
        </div>

        <!-- Test Credentials Info -->
        <div class="credentials-info" [class]="'info-' + selectedTier()!">
          <div class="info-title">Identifiants de test</div>
          <div class="info-row">
            <span class="label">Email:</span>
            <code>{{ getTestEmail(selectedTier()!) }}</code>
          </div>
          <div class="info-row">
            <span class="label">Mdp:</span>
            <code>ChangeMe123!</code>
          </div>
        </div>

        <!-- Error Message -->
        <div class="error-banner" *ngIf="errorMessage()">
          <mat-icon>error</mat-icon>
          <span>{{ errorMessage() }}</span>
        </div>

        <!-- Submit Button -->
        <button
          mat-raised-button
          color="primary"
          type="submit"
          class="submit-btn"
          [disabled]="form.invalid || isLoading()"
        >
          <mat-icon *ngIf="!isLoading()">login</mat-icon>
          {{ isLoading() ? 'Connexion en cours...' : 'Se connecter' }}
        </button>
      </form>

      <!-- Divider -->
      <div class="form-divider">ou</div>

      <!-- Demo Access -->
      <div class="demo-access">
        <p>Accès démo rapide</p>
        <button type="button" class="demo-btn" (click)="quickLogin(selectedTier()!)" [disabled]="isLoading()">
          <mat-icon>play_arrow</mat-icon>
          Accès rapide
        </button>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div class="login-footer">
    <p>WAY Medical © 2026 • Plateforme de gestion médicale sécurisée</p>
  </div>
</div>
  `,
  styles: [`
    .login-wrapper {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background: linear-gradient(135deg, var(--wm-primary-subtle) 0%, var(--wm-bg) 100%);
      align-items: center;
      justify-content: center;
      padding: 20px;
      font-family: var(--wm-font);
    }

    .login-header {
      margin-bottom: 40px;
      text-align: center;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
      justify-content: center;
    }

    .logo-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: linear-gradient(135deg, var(--wm-primary-strong) 0%, var(--wm-primary) 100%);
      color: white;
      font-weight: 800;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .logo-text {
      text-align: left;
    }

    .logo-brand {
      font-size: 24px;
      font-weight: 800;
      color: var(--wm-text-strong);
      letter-spacing: -0.02em;
    }

    .logo-sub {
      font-size: 12px;
      color: var(--wm-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-top: 2px;
    }

    .login-container {
      width: 100%;
      max-width: 520px;
    }

    .login-panel {
      background: white;
      border-radius: 20px;
      border: 1px solid var(--wm-border-light);
      padding: 40px;
      box-shadow: 0 24px 48px rgba(31, 57, 88, 0.12);
      animation: slideUp 300ms ease-out;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    h1 {
      margin: 0 0 8px 0;
      font-size: 28px;
      font-weight: 800;
      color: var(--wm-text-strong);
      letter-spacing: -0.02em;
    }

    .subtitle {
      margin: 0 0 32px 0;
      font-size: var(--fs-sm);
      color: var(--wm-muted);
      line-height: 1.6;
    }

    .back-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      background: none;
      border: none;
      color: var(--wm-primary);
      font-size: var(--fs-sm);
      font-weight: 600;
      cursor: pointer;
      padding: 8px 0;
      margin-bottom: 24px;
      transition: gap 180ms ease;
      &:hover {
        gap: 10px;
      }
      mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }
    }

    /* ── Tier Selection Grid ─────────────────────────────────────── */
    .tier-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 16px;
      margin-top: 24px;
    }

    .tier-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      padding: 24px 16px;
      border: 1.5px solid var(--wm-border-light);
      border-radius: 16px;
      background: var(--wm-surface);
      cursor: pointer;
      transition: all 180ms ease;
      text-align: center;
      position: relative;

      &:hover {
        border-color: var(--wm-primary);
        box-shadow: 0 8px 24px rgba(0, 92, 187, 0.12);
        transform: translateY(-2px);
      }

      .tier-icon {
        width: 56px;
        height: 56px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        mat-icon {
          font-size: 28px;
          width: 28px;
          height: 28px;
        }
      }

      .patient-icon {
        background: var(--wm-primary-light);
        color: var(--wm-primary-strong);
      }

      .doctor-icon {
        background: var(--wm-teal-light);
        color: var(--wm-teal-dark);
      }

      .admin-icon {
        background: var(--wm-violet-light);
        color: var(--wm-violet);
      }

      .tier-name {
        font-size: var(--fs-md);
        font-weight: 700;
        color: var(--wm-text-strong);
      }

      .tier-desc {
        font-size: var(--fs-xs);
        color: var(--wm-muted);
        line-height: 1.4;
      }

      .tier-arrow {
        position: absolute;
        top: 10px;
        right: 10px;
        opacity: 0;
        transition: opacity 180ms ease;
        mat-icon {
          font-size: 18px;
          width: 18px;
          height: 18px;
        }
      }

      &:hover .tier-arrow {
        opacity: 1;
      }
    }

    /* ── Form Fields ────────────────────────────────────────────── */
    .login-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
      position: relative;
    }

    .form-label {
      font-size: var(--fs-sm);
      font-weight: 600;
      color: var(--wm-text-strong);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .form-input {
      padding: 12px 14px;
      border: 1.5px solid var(--wm-border);
      border-radius: var(--r-md);
      font-family: var(--wm-font);
      font-size: var(--fs-sm);
      color: var(--wm-text);
      background: var(--wm-surface);
      transition: border-color 180ms ease, box-shadow 180ms ease;
      outline: none;

      &::placeholder {
        color: var(--wm-placeholder);
      }

      &:focus {
        border-color: var(--wm-primary);
        box-shadow: 0 0 0 3px rgba(0, 92, 187, 0.12);
      }

      &.error {
        border-color: var(--wm-danger);
        &:focus {
          box-shadow: 0 0 0 3px rgba(185, 28, 28, 0.12);
        }
      }
    }

    .toggle-pwd {
      position: absolute;
      right: 12px;
      top: 34px;
      background: none;
      border: none;
      cursor: pointer;
      color: var(--wm-muted-light);
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 180ms ease;

      &:hover {
        color: var(--wm-primary);
      }

      mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }
    }

    .error-msg {
      font-size: var(--fs-xs);
      color: var(--wm-danger);
      font-weight: 500;
    }

    /* ── Credentials Info ────────────────────────────────────────── */
    .credentials-info {
      padding: 14px;
      border-radius: 10px;
      font-size: var(--fs-xs);

      &.info-patient {
        background: var(--wm-primary-light);
        border: 1px solid var(--wm-primary-light);
        color: var(--wm-primary-strong);
      }

      &.info-doctor {
        background: var(--wm-teal-light);
        border: 1px solid var(--wm-teal-light);
        color: var(--wm-teal-dark);
      }

      &.info-admin {
        background: var(--wm-violet-light);
        border: 1px solid var(--wm-violet-light);
        color: var(--wm-violet);
      }

      .info-title {
        font-weight: 700;
        margin-bottom: 8px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .info-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        &:not(:last-child) {
          margin-bottom: 6px;
        }
      }

      .label {
        font-weight: 600;
      }

      code {
        background: rgba(0, 0, 0, 0.08);
        padding: 3px 7px;
        border-radius: 4px;
        font-family: var(--wm-font-mono);
        font-size: 11px;
      }
    }

    /* ── Error Banner ────────────────────────────────────────────– */
    .error-banner {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 14px;
      background: var(--wm-danger-light);
      border: 1px solid var(--wm-danger-border);
      border-radius: 10px;
      color: var(--wm-danger);
      font-size: var(--fs-sm);
      font-weight: 500;

      mat-icon {
        flex-shrink: 0;
        font-size: 18px;
        width: 18px;
        height: 18px;
      }
    }

    /* ── Submit Button ───────────────────────────────────────────– */
    .submit-btn {
      padding: 12px 20px !important;
      font-size: var(--fs-sm) !important;
      font-weight: 700 !important;
      height: auto !important;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-top: 8px;

      mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }

      &:disabled {
        opacity: 0.6;
      }
    }

    /* ── Divider ─────────────────────────────────────────────────– */
    .form-divider {
      display: flex;
      align-items: center;
      gap: 12px;
      color: var(--wm-muted-light);
      font-size: var(--fs-xs);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin: 8px 0;

      &::before, &::after {
        content: '';
        flex: 1;
        height: 1px;
        background: var(--wm-border-light);
      }
    }

    /* ── Demo Access ─────────────────────────────────────────────– */
    .demo-access {
      text-align: center;

      p {
        margin: 0 0 12px 0;
        font-size: var(--fs-xs);
        color: var(--wm-muted);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
    }

    .demo-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 10px 16px;
      border: 1px solid var(--wm-border);
      border-radius: 10px;
      background: var(--wm-surface);
      color: var(--wm-primary);
      font-size: var(--fs-sm);
      font-weight: 600;
      cursor: pointer;
      transition: all 180ms ease;

      &:hover:not(:disabled) {
        border-color: var(--wm-primary);
        background: var(--wm-primary-subtle);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      mat-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
      }
    }

    /* ── Footer ──────────────────────────────────────────────────– */
    .login-footer {
      margin-top: 40px;
      text-align: center;
      font-size: var(--fs-xs);
      color: var(--wm-muted-light);
      letter-spacing: 0.03em;

      p {
        margin: 0;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authApiService = inject(AuthApiService);
  private readonly router = inject(Router);

  readonly currentStep = signal<'tier-select' | 'login'>('tier-select');
  readonly selectedTier = signal<UserTier | null>(null);
  readonly isLoading = signal(false);
  readonly errorMessage = signal('');
  readonly showPassword = signal(false);

  readonly form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  selectTier(tier: UserTier): void {
    this.selectedTier.set(tier);
    this.form.reset({
      email: this.getTestEmail(tier),
      password: 'ChangeMe123!'
    });
    this.errorMessage.set('');
    this.currentStep.set('login');
  }

  backToTierSelect(): void {
    this.currentStep.set('tier-select');
    this.selectedTier.set(null);
    this.form.reset();
    this.errorMessage.set('');
    this.showPassword.set(false);
  }

  togglePassword(): void {
    this.showPassword.update(v => !v);
  }

  getTestEmail(tier: UserTier): string {
    const emails: Record<UserTier, string> = {
      patient: 'marie.dupont@mail.fr',
      doctor: 'e.fontaine@clinic.fr',
      admin: 'c.dupuis@clinic.fr'
    };
    return emails[tier];
  }

  getTierLabel(tier: UserTier): string {
    const labels: Record<UserTier, string> = {
      patient: 'Patient',
      doctor: 'Médecin / Staff',
      admin: 'Administration'
    };
    return labels[tier];
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  quickLogin(tier: UserTier): void {
    this.form.patchValue({
      email: this.getTestEmail(tier),
      password: 'ChangeMe123!'
    });
    this.submit();
  }

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
        next: () => {
          this.router.navigate(['/']);
        },
        error: () => {
          this.errorMessage.set('Connexion échouée. Vérifiez vos identifiants ou l\'état du serveur.');
        }
      });
  }
}
