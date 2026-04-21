import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthTokenService } from './core/services/auth-token.service';

@Component({
  selector: 'wm-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar class="app-toolbar">
      <div class="brand">
        <mat-icon>health_and_safety</mat-icon>
        <span>WAY Medical</span>
      </div>

      <span class="spacer"></span>

      <button mat-stroked-button type="button" (click)="simulateToken()">
        Simulate Token
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

  simulateToken(): void {
    this.authTokenService.setToken('demo-token');
  }
}

