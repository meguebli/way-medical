import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'wm-dashboard',
  standalone: true,
  template: `
    <div class="redirect-shell">
      <div class="spinner"></div>
      <p>Loading your workspace…</p>
    </div>
  `,
  styles: [`
    .redirect-shell {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      min-height: 60vh; gap: 16px; color: var(--wm-muted);
    }
    .spinner {
      width: 40px; height: 40px; border-radius: 50%;
      border: 3px solid var(--wm-border-light);
      border-top-color: var(--wm-primary);
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  private readonly router = inject(Router);

  ngOnInit(): void {
    const target = this.resolveTarget();
    this.router.navigateByUrl(target, { replaceUrl: true });
  }

  private resolveTarget(): string {
    try {
      const token = localStorage.getItem('accessToken') || localStorage.getItem('access_token');
      if (!token) return '/dashboard/patient';
      const payload = JSON.parse(atob(token.split('.')[1]));
      const role: string = (payload.role || payload.roles?.[0] || '').toString().toUpperCase();
      if (role.includes('ADMIN')) return '/dashboard/admin';
      if (role.includes('DOCTOR')) return '/dashboard/doctor';
      if (role.includes('STAFF') || role.includes('MEDICAL')) return '/dashboard/doctor';
      return '/dashboard/patient';
    } catch {
      return '/dashboard/patient';
    }
  }
}
