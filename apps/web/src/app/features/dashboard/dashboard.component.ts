import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { catchError, map, of } from 'rxjs';
import { DashboardApiService } from '../../core/services/dashboard-api.service';

@Component({
  selector: 'wm-dashboard',
  standalone: true,
  imports: [
    AsyncPipe,
    NgFor,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule,
    MatListModule
  ],
  template: `
    <section class="hero">
      <div>
        <p class="eyebrow">Angular Standalone Frontend</p>
        <h1>Medical platform cockpit</h1>
        <p class="lead">
          Standalone components, token interceptor, Angular Material and a
          performance-first shell ready for the team.
        </p>
      </div>

      <mat-chip-set>
        <mat-chip>Standalone</mat-chip>
        <mat-chip>OnPush</mat-chip>
        <mat-chip>Lazy Route</mat-chip>
        <mat-chip>Material</mat-chip>
      </mat-chip-set>
    </section>

    <section class="grid" *ngIf="vm$ | async as vm">
      <mat-card class="metric-card" *ngFor="let metric of vm.metrics">
        <mat-card-header>
          <mat-icon mat-card-avatar>{{ metric.icon }}</mat-icon>
          <mat-card-title>{{ metric.label }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p class="metric-value">{{ metric.value }}</p>
        </mat-card-content>
      </mat-card>

      <mat-card class="stack-card">
        <mat-card-title>Frontend baseline</mat-card-title>
        <mat-divider></mat-divider>
        <mat-list>
          <mat-list-item>JWT login wired to Spring Boot</mat-list-item>
          <mat-list-item>Users endpoint consumed through Bearer auth</mat-list-item>
          <mat-list-item>Token interceptor for API requests</mat-list-item>
          <mat-list-item>Standalone feature routing</mat-list-item>
          <mat-list-item>Angular Material UI foundation</mat-list-item>
          <mat-list-item>Unit tests for services and interceptors</mat-list-item>
        </mat-list>
      </mat-card>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }

    .hero {
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: 1.5rem;
      align-items: start;
      margin-bottom: 1.5rem;
    }

    .eyebrow {
      margin: 0 0 0.5rem;
      color: var(--wm-primary);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-size: 0.75rem;
    }

    h1 {
      margin: 0;
      font-size: clamp(2rem, 4vw, 3.4rem);
      line-height: 1.05;
    }

    .lead {
      max-width: 56rem;
      color: var(--wm-muted);
      font-size: 1rem;
      line-height: 1.7;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 1rem;
    }

    .metric-card,
    .stack-card {
      border-radius: 24px;
      background: rgba(255, 255, 255, 0.92);
      border: 1px solid var(--wm-border);
      box-shadow: 0 20px 40px rgba(31, 57, 88, 0.08);
    }

    .stack-card {
      grid-column: span 4;
    }

    .metric-value {
      margin: 0.5rem 0 0;
      font-size: 2rem;
      font-weight: 700;
      color: var(--wm-primary-strong);
    }

    @media (max-width: 960px) {
      .hero,
      .grid {
        grid-template-columns: 1fr;
      }

      .stack-card {
        grid-column: span 1;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  private readonly dashboardApiService = inject(DashboardApiService);

  readonly vm$ = this.dashboardApiService.getMetrics().pipe(
    map((metrics) => ({
      metrics: [
        { label: 'Active sessions', value: metrics.activeSessions, icon: 'group' },
        { label: 'Secured APIs', value: metrics.securedApis, icon: 'verified_user' },
        { label: 'Pending alerts', value: metrics.pendingAlerts, icon: 'notification_important' }
      ]
    })),
    catchError(() => of({
      metrics: [
        { label: 'Active sessions', value: 0, icon: 'group' },
        { label: 'Secured APIs', value: 0, icon: 'verified_user' },
        { label: 'Pending alerts', value: 0, icon: 'notification_important' }
      ]
    }))
  );
}
