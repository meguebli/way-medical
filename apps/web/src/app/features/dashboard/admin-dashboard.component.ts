import { NgFor, NgIf, DatePipe, CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'wm-admin-dashboard',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, CurrencyPipe, RouterLink, MatIconModule, MatButtonModule],
  template: `
<div class="wm-page">

  <!-- ── Header ────────────────────────────────────────────────── -->
  <div class="wm-page-header">
    <div>
      <p class="wm-eyebrow">Operations Center</p>
      <h1 class="wm-page-title">WAY Medical — Overview</h1>
      <p class="hero-sub">{{ today | date:'EEEE, MMMM d, y' }} · Polyclinique Saint-Louis</p>
    </div>
    <div class="header-actions">
      <a routerLink="/admin/establishments" mat-stroked-button>
        <mat-icon>business</mat-icon> Manage Establishments
      </a>
      <a routerLink="/admin/activity" mat-raised-button color="primary">
        <mat-icon>analytics</mat-icon> Activity Monitor
      </a>
    </div>
  </div>

  <!-- ── Primary KPIs ───────────────────────────────────────────── -->
  <div class="wm-grid-4 kpi-row">
    <div class="kpi-card" *ngFor="let k of primaryKpis">
      <div class="kpi-icon" [style.background]="k.bg">
        <mat-icon [style.color]="k.color">{{ k.icon }}</mat-icon>
      </div>
      <div class="kpi-value">{{ k.value }}</div>
      <div class="kpi-label">{{ k.label }}</div>
      <div class="kpi-change" [class]="k.changeClass">
        <mat-icon>{{ k.changeIcon }}</mat-icon>{{ k.change }}
      </div>
      <div class="kpi-accent-bar" [style.background]="k.color"></div>
    </div>
  </div>

  <!-- ── Main Dashboard Grid ────────────────────────────────────── -->
  <div class="admin-main-grid">

    <!-- Appointment Status Breakdown -->
    <div class="wm-card">
      <div class="wm-card-header">
        <div>
          <div class="wm-section-title">Appointment Status</div>
          <div class="card-sub">Today · All services</div>
        </div>
        <a routerLink="/appointments" class="see-all">Manage <mat-icon>arrow_forward</mat-icon></a>
      </div>
      <div class="wm-card-body">
        <div class="apt-status-grid">
          <div class="ast-item" *ngFor="let s of aptStatuses">
            <div class="ast-count" [style.color]="s.color">{{ s.count }}</div>
            <div class="wm-progress" style="margin: 6px 0">
              <div class="wm-progress-fill" [style.width]="s.pct + '%'" [style.background]="s.color"></div>
            </div>
            <span class="badge" [class]="'badge-' + s.class">
              <span class="badge-dot"></span>{{ s.label }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Revenue Widget -->
    <div class="wm-card revenue-card">
      <div class="wm-card-header">
        <div class="wm-section-title">Revenue</div>
        <span class="badge badge-success">+12.4%</span>
      </div>
      <div class="wm-card-body">
        <div class="rev-total">{{ 48750 | currency:'EUR':'symbol':'1.0-0' }}</div>
        <div class="rev-label">This month's revenue</div>
        <div class="rev-breakdown">
          <div class="rev-item" *ngFor="let r of revBreakdown">
            <span class="rev-dot" [style.background]="r.color"></span>
            <span class="rev-name">{{ r.name }}</span>
            <span class="rev-val">{{ r.amount | currency:'EUR':'symbol':'1.0-0' }}</span>
          </div>
        </div>
        <div class="mini-line-chart">
          <svg viewBox="0 0 200 60" preserveAspectRatio="none">
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="var(--wm-primary)" stop-opacity="0.2"/>
                <stop offset="100%" stop-color="var(--wm-primary)" stop-opacity="0"/>
              </linearGradient>
            </defs>
            <path d="M0,45 L25,38 L50,35 L75,28 L100,30 L125,22 L150,18 L175,12 L200,8 L200,60 L0,60 Z" fill="url(#revGrad)"/>
            <path d="M0,45 L25,38 L50,35 L75,28 L100,30 L125,22 L150,18 L175,12 L200,8" fill="none" stroke="var(--wm-primary)" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <a routerLink="/billing" class="see-all" style="margin-top:8px;display:inline-flex">Full report <mat-icon>arrow_forward</mat-icon></a>
      </div>
    </div>

    <!-- Service Performance -->
    <div class="wm-card" style="grid-column: span 2">
      <div class="wm-card-header">
        <div>
          <div class="wm-section-title">Service Performance</div>
          <div class="card-sub">Appointments per service · This month</div>
        </div>
        <a routerLink="/services" class="see-all">Services <mat-icon>arrow_forward</mat-icon></a>
      </div>
      <div class="wm-table-wrap" style="border:none;border-radius:0;box-shadow:none">
        <table class="wm-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Specialty</th>
              <th>Total Apts</th>
              <th>Completed</th>
              <th>No-Show</th>
              <th>Utilization</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let s of services">
              <td>
                <div style="display:flex;align-items:center;gap:10px">
                  <div class="svc-icon" [style.background]="s.bg">
                    <mat-icon [style.color]="s.color">{{ s.icon }}</mat-icon>
                  </div>
                  <span class="td-primary">{{ s.name }}</span>
                </div>
              </td>
              <td>{{ s.specialty }}</td>
              <td class="td-primary">{{ s.total }}</td>
              <td>
                <div style="display:flex;align-items:center;gap:6px">
                  <div class="wm-progress" style="flex:1;min-width:60px">
                    <div class="wm-progress-fill" [style.width]="(s.completed/s.total*100) + '%'" style="background:var(--wm-success-mid)"></div>
                  </div>
                  <span class="td-mono">{{ s.completed }}</span>
                </div>
              </td>
              <td><span class="badge" [class]="s.noShow > 3 ? 'badge-danger' : 'badge-neutral'">{{ s.noShow }}</span></td>
              <td>
                <div style="display:flex;align-items:center;gap:6px">
                  <div class="wm-progress" style="flex:1;min-width:60px">
                    <div class="wm-progress-fill" [style.width]="s.util + '%'" [style.background]="s.util > 80 ? 'var(--wm-success-mid)' : s.util > 50 ? 'var(--wm-primary)' : 'var(--wm-warning-mid)'"></div>
                  </div>
                  <span class="td-mono">{{ s.util }}%</span>
                </div>
              </td>
              <td><span class="badge badge-active">Active</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>

  <!-- ── Bottom Row ──────────────────────────────────────────────── -->
  <div class="admin-bottom-grid">

    <!-- Recent Activity Feed -->
    <div class="wm-card">
      <div class="wm-card-header">
        <div class="wm-section-title">Recent Activity</div>
        <a routerLink="/admin/activity" class="see-all">All events <mat-icon>arrow_forward</mat-icon></a>
      </div>
      <div class="activity-feed">
        <div class="af-item" *ngFor="let a of activityFeed">
          <div class="af-icon" [style.background]="a.bg">
            <mat-icon [style.color]="a.color">{{ a.icon }}</mat-icon>
          </div>
          <div class="af-body">
            <div class="af-text">{{ a.text }}</div>
            <div class="af-time">{{ a.time }}</div>
          </div>
          <span class="badge" [class]="'badge-' + a.badgeClass">{{ a.badge }}</span>
        </div>
      </div>
    </div>

    <!-- Staff Availability -->
    <div class="wm-card">
      <div class="wm-card-header">
        <div class="wm-section-title">Staff On Duty Today</div>
        <span class="badge badge-success">{{ staffOnDuty.length }} active</span>
      </div>
      <div class="staff-list">
        <div class="staff-item" *ngFor="let s of staffOnDuty">
          <div class="avatar avatar-sm" [style.background]="s.avatarBg" [style.color]="s.avatarColor">{{ s.initials }}</div>
          <div class="staff-body">
            <div class="staff-name">{{ s.name }}</div>
            <div class="staff-role">{{ s.role }} · {{ s.service }}</div>
          </div>
          <div class="staff-apt-count">
            <span class="staff-count">{{ s.apts }}</span>
            <span class="staff-count-label">apts</span>
          </div>
          <div class="staff-indicator" [class]="'ind-' + s.status"></div>
        </div>
      </div>
    </div>

    <!-- Alerts & Notifications -->
    <div class="wm-card">
      <div class="wm-card-header">
        <div class="wm-section-title">System Alerts</div>
        <span class="badge badge-danger">{{ alerts.length }} active</span>
      </div>
      <div class="alerts-list">
        <div class="alert-item" *ngFor="let a of alerts" [class]="'wm-alert alert-' + a.type" style="margin: 0; border-radius: 0; border-top: none; border-left: none; border-right: none; border-bottom: 1px solid">
          <mat-icon>{{ a.icon }}</mat-icon>
          <div style="flex:1">
            <div style="font-weight:600;margin-bottom:2px">{{ a.title }}</div>
            <div style="font-size:var(--fs-xs);opacity:0.85">{{ a.body }}</div>
          </div>
          <button class="al-dismiss" (click)="dismissAlert(a)">
            <mat-icon>close</mat-icon>
          </button>
        </div>
      </div>
    </div>

  </div>
</div>
  `,
  styles: [`
    .hero-sub { color: var(--wm-muted); font-size: var(--fs-sm); margin: 6px 0 0; }
    .header-actions { display: flex; gap: 10px; flex-wrap: wrap; }
    .kpi-row { margin-bottom: 28px; }
    .card-sub { font-size: var(--fs-xs); color: var(--wm-muted-light); margin-top: 2px; }
    .see-all {
      display: inline-flex; align-items: center; gap: 3px;
      font-size: var(--fs-sm); font-weight: 600; color: var(--wm-primary); text-decoration: none;
      mat-icon { font-size: 14px; width: 14px; height: 14px; }
      &:hover { text-decoration: underline; }
    }

    /* Main grid */
    .admin-main-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 24px;
    }

    /* Appointment status */
    .apt-status-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
    .ast-item { text-align: center; }
    .ast-count {
      font-size: var(--fs-3xl);
      font-weight: 800;
      line-height: 1;
      letter-spacing: -0.03em;
    }

    /* Revenue card */
    .rev-total {
      font-size: var(--fs-4xl);
      font-weight: 800;
      color: var(--wm-text-strong);
      letter-spacing: -0.03em;
      line-height: 1;
      margin-bottom: 4px;
    }
    .rev-label { font-size: var(--fs-sm); color: var(--wm-muted); margin-bottom: 16px; }
    .rev-breakdown { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
    .rev-item {
      display: flex; align-items: center; gap: 8px;
      font-size: var(--fs-sm);
    }
    .rev-dot { width: 8px; height: 8px; border-radius: 2px; flex-shrink: 0; }
    .rev-name { flex: 1; color: var(--wm-muted); }
    .rev-val { font-weight: 600; color: var(--wm-text); }
    .mini-line-chart {
      height: 56px;
      border-radius: var(--r-md);
      overflow: hidden;
      background: var(--wm-bg-soft);
      svg { width: 100%; height: 100%; }
    }

    /* Service table */
    .svc-icon {
      width: 30px; height: 30px;
      border-radius: var(--r-md);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      mat-icon { font-size: 15px; width: 15px; height: 15px; }
    }

    /* Bottom grid */
    .admin-bottom-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }

    /* Activity feed */
    .activity-feed { padding: 8px 0; }
    .af-item {
      display: flex; align-items: center; gap: 12px;
      padding: 11px 24px;
      border-bottom: 1px solid var(--wm-border-light);
      transition: background var(--tr);
      &:last-child { border-bottom: none; }
      &:hover { background: var(--wm-primary-subtle); }
    }
    .af-icon {
      width: 32px; height: 32px;
      border-radius: var(--r-md);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      mat-icon { font-size: 15px; width: 15px; height: 15px; }
    }
    .af-body { flex: 1; min-width: 0; }
    .af-text { font-size: var(--fs-sm); color: var(--wm-text); line-height: 1.4; }
    .af-time { font-size: var(--fs-xs); color: var(--wm-muted-light); margin-top: 2px; }

    /* Staff list */
    .staff-list { padding: 8px 0; }
    .staff-item {
      display: flex; align-items: center; gap: 12px;
      padding: 11px 24px;
      border-bottom: 1px solid var(--wm-border-light);
      &:last-child { border-bottom: none; }
    }
    .staff-body { flex: 1; min-width: 0; }
    .staff-name { font-size: var(--fs-sm); font-weight: 600; color: var(--wm-text); }
    .staff-role { font-size: var(--fs-xs); color: var(--wm-muted); }
    .staff-apt-count { text-align: right; }
    .staff-count { display: block; font-size: var(--fs-md); font-weight: 700; color: var(--wm-text); line-height: 1; }
    .staff-count-label { font-size: var(--fs-xs); color: var(--wm-muted-light); }
    .staff-indicator {
      width: 8px; height: 8px; border-radius: 50%;
      &.ind-active  { background: var(--wm-success-mid); }
      &.ind-busy    { background: var(--wm-warning-mid); }
      &.ind-away    { background: var(--wm-muted-light); }
    }

    /* Alerts */
    .alerts-list {
      border-top: 1px solid var(--wm-border-light);
    }
    .alert-item {
      padding: 14px 24px !important;
      border-left: none !important;
      border-right: none !important;
      border-top: none !important;
      border-bottom: 1px solid !important;
      border-radius: 0 !important;
      &:last-child { border-bottom: none !important; }
    }
    .al-dismiss {
      border: none; background: none; cursor: pointer;
      width: 24px; height: 24px; border-radius: 4px;
      display: flex; align-items: center; justify-content: center;
      opacity: 0.6; transition: opacity var(--tr);
      &:hover { opacity: 1; }
      mat-icon { font-size: 14px; width: 14px; height: 14px; }
    }

    @media (max-width: 1300px) {
      .admin-main-grid { grid-template-columns: 1fr; }
      .admin-bottom-grid { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 768px) {
      .admin-bottom-grid { grid-template-columns: 1fr; }
      .apt-status-grid { grid-template-columns: repeat(2, 1fr); }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDashboardComponent {
  readonly today = new Date();

  readonly primaryKpis = [
    { icon: 'people',         label: 'Active Patients',       value: '1,248', bg: 'var(--wm-primary-light)', color: 'var(--wm-primary)',  change: '+23 this week',   changeClass: 'up',   changeIcon: 'trending_up' },
    { icon: 'event',          label: 'Today\'s Appointments', value: '87',    bg: 'var(--wm-teal-light)',    color: 'var(--wm-teal)',     change: '8 pending action',changeClass: 'flat', changeIcon: 'trending_flat' },
    { icon: 'payments',       label: 'Monthly Revenue',       value: '€48.7k',bg: 'var(--wm-success-light)', color: 'var(--wm-success)',  change: '+12.4% vs last',  changeClass: 'up',   changeIcon: 'trending_up' },
    { icon: 'badge',          label: 'Active Staff',          value: '34',    bg: 'var(--wm-warning-light)', color: 'var(--wm-warning)',  change: '2 on leave today',changeClass: 'flat', changeIcon: 'trending_flat' },
  ];

  readonly aptStatuses = [
    { label: 'Approved',   count: 52, pct: 60, class: 'approved', color: 'var(--wm-success-mid)' },
    { label: 'Completed',  count: 28, pct: 32, class: 'completed', color: 'var(--wm-primary)' },
    { label: 'Pending',    count: 14, pct: 16, class: 'pending', color: 'var(--wm-warning-mid)' },
    { label: 'Cancelled',  count:  7, pct:  8, class: 'cancelled', color: 'var(--wm-danger-mid)' },
    { label: 'No-Show',    count:  3, pct:  3, class: 'noshow', color: 'var(--wm-muted)' },
    { label: 'Requested',  count:  8, pct:  9, class: 'requested', color: 'var(--wm-teal)' },
  ];

  readonly revBreakdown = [
    { name: 'Consultations',  amount: 24300, color: 'var(--wm-primary)' },
    { name: 'Procedures',     amount: 14800, color: 'var(--wm-teal)' },
    { name: 'Lab / Imaging',  amount:  9650, color: 'var(--wm-success-mid)' },
  ];

  readonly services = [
    { name: 'Cardiology',      specialty: 'Cardiac Care',     icon: 'favorite',       total: 142, completed: 128, noShow: 4, util: 88, bg: 'var(--wm-danger-light)',   color: 'var(--wm-danger)' },
    { name: 'General Medicine',specialty: 'Primary Care',     icon: 'local_hospital', total: 234, completed: 210, noShow: 7, util: 92, bg: 'var(--wm-primary-light)',  color: 'var(--wm-primary)' },
    { name: 'Radiology',       specialty: 'Medical Imaging',  icon: 'radiology',      total:  89, completed:  80, noShow: 2, util: 74, bg: 'var(--wm-teal-light)',     color: 'var(--wm-teal)' },
    { name: 'Dermatology',     specialty: 'Dermatology',      icon: 'healing',        total:  76, completed:  68, noShow: 5, util: 65, bg: 'var(--wm-warning-light)',  color: 'var(--wm-warning)' },
    { name: 'Neurology',       specialty: 'Neuroscience',     icon: 'psychology',     total:  54, completed:  47, noShow: 3, util: 58, bg: 'var(--wm-violet-light)',   color: 'var(--wm-violet)' },
  ];

  readonly activityFeed = [
    { icon: 'event_available', text: 'Dr. Fontaine approved appointment for Marie Dupont',      time: '2 min ago',  badge: 'Appointment', badgeClass: 'approved', bg: 'var(--wm-teal-light)',   color: 'var(--wm-teal)' },
    { icon: 'person_add',      text: 'New patient registered: Henri Marchand (DOB 1972-08-14)', time: '14 min ago', badge: 'Patient',     badgeClass: 'info',     bg: 'var(--wm-primary-light)',color: 'var(--wm-primary)' },
    { icon: 'receipt',         text: 'Invoice #INV-2025-0489 paid — €320.00',                   time: '31 min ago', badge: 'Billing',     badgeClass: 'success',  bg: 'var(--wm-success-light)',color: 'var(--wm-success)' },
    { icon: 'cancel',          text: 'Appointment cancelled by Sylvie Beaumont (14:00 slot)',   time: '45 min ago', badge: 'Cancelled',   badgeClass: 'cancelled',bg: 'var(--wm-danger-light)', color: 'var(--wm-danger)' },
    { icon: 'science',         text: 'Lab results uploaded for Isabelle Tremblay',              time: '1h 10m ago', badge: 'Lab',         badgeClass: 'info',     bg: 'var(--wm-teal-light)',   color: 'var(--wm-teal)' },
    { icon: 'edit_note',       text: 'Consultation completed: Jean-Pierre Moreau — Cardiology', time: '2h ago',     badge: 'Consultation',badgeClass: 'completed',bg: 'var(--wm-primary-light)',color: 'var(--wm-primary)' },
  ];

  readonly staffOnDuty = [
    { name: 'Dr. Éric Fontaine',    initials: 'EF', role: 'Doctor',        service: 'Cardiology',       apts: 8,  status: 'busy',   avatarBg: 'var(--wm-primary-light)', avatarColor: 'var(--wm-primary)' },
    { name: 'Dr. Claire Martin',    initials: 'CM', role: 'Doctor',        service: 'General Medicine', apts: 12, status: 'active', avatarBg: 'var(--wm-teal-light)',    avatarColor: 'var(--wm-teal)' },
    { name: 'Nurse Sophie Bernard', initials: 'SB', role: 'Medical Staff', service: 'Cardiology',       apts: 0,  status: 'active', avatarBg: 'var(--wm-success-light)', avatarColor: 'var(--wm-success)' },
    { name: 'Dr. Yann Leblanc',     initials: 'YL', role: 'Doctor',        service: 'Radiology',        apts: 6,  status: 'active', avatarBg: 'var(--wm-warning-light)', avatarColor: 'var(--wm-warning)' },
    { name: 'Dr. Sophie Renard',    initials: 'SR', role: 'Doctor',        service: 'Dermatology',      apts: 4,  status: 'away',   avatarBg: 'var(--wm-violet-light)',  avatarColor: 'var(--wm-violet)' },
  ];

  alerts = [
    { type: 'warning', icon: 'warning',       title: '5 appointments pending doctor approval',  body: 'Oldest request: 3 days ago — action required',    badgeClass: 'warning' },
    { type: 'info',    icon: 'info',           title: 'Dr. Renard on leave from April 28–30',   body: '4 upcoming appointments need reassignment',        badgeClass: 'info' },
    { type: 'danger',  icon: 'error_outline',  title: '3 unpaid invoices over 30 days',         body: 'Total outstanding: €1,240 · Contact billing team', badgeClass: 'danger' },
  ];

  dismissAlert(a: any): void {
    this.alerts = this.alerts.filter(x => x !== a);
  }
}
