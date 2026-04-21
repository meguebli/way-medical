import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthTokenService } from './core/services/auth-token.service';
import { AuthApiService } from './core/services/auth-api.service';

@Component({
  selector: 'wm-root',
  standalone: true,
  imports: [NgIf, RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar class="app-toolbar">
      <div class="brand">
        <mat-icon>health_and_safety</mat-icon>
        <span>WAY Medical</span>
      </div>

      <span class="spacer"></span>

      <button *ngIf="!isAuthenticated()" mat-stroked-button routerLink="/login" type="button">
        Login
      </button>

      <button *ngIf="isAuthenticated()" mat-stroked-button type="button" (click)="logout()">
        Logout
      </button>
    </mat-toolbar>

    <main class="app-shell">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .app-toolbar {
      position: sticky;
      top: 0;
      z-index: 10;
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid var(--wm-border);
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-weight: 700;
      color: var(--wm-primary-strong);
    }

    .spacer {
      flex: 1;
    }

    .app-shell {
      padding: 1.5rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private readonly authTokenService = inject(AuthTokenService);
  private readonly authApiService = inject(AuthApiService);
  private readonly router = inject(Router);

  isAuthenticated(): boolean {
    return this.authTokenService.isAuthenticated();
  }

  logout(): void {
    this.authApiService.logout();
    void this.router.navigate(['/login']);
  }
}
