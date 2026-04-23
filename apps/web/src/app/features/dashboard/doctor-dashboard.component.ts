import { NgFor, NgIf, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'wm-doctor-dashboard',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, RouterLink, MatIconModule, MatButtonModule],
  template: `
<div class="wm-page">

  <!-- ── Page Header ────────────────────────────────────────────── -->
  <div class="wm-page-header">
    <div>
      <p class="wm-eyebrow">Clinical Workspace</p>
      <h1 class="wm-page-title">Good morning, Dr. Fontaine</h1>
      <p class="hero-sub">{{ today | date:'EEEE, MMMM d, y' }} · Cardiology Department</p>
    </div>
    <div class="header-actions">
      <a routerLink="/consultations/new" mat-raised-button color="primary">
        <mat-icon>add</mat-icon> New Consultation
      </a>
      <a routerLink="/schedule" mat-stroked-button>
        <mat-icon>calendar_month</mat-icon> My Schedule
      </a>
    </div>
  </div>

  <!-- ── KPIs ───────────────────────────────────────────────────── -->
  <div class="wm-grid-4 kpi-row">
    <div class="kpi-card" *ngFor="let k of kpis">
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

  <!-- ── Main Grid ──────────────────────────────────────────────── -->
  <div class="doctor-grid">

    <!-- Today's Appointments Timeline -->
    <div class="wm-card">
      <div class="wm-card-header">
        <div>
          <div class="wm-section-title">Today's Schedule</div>
          <div class="card-sub">{{ today | date:'MMMM d' }} · {{ todayApts.length }} appointments</div>
        </div>
        <a routerLink="/schedule" class="see-all">Full schedule <mat-icon>arrow_forward</mat-icon></a>
      </div>
      <div class="schedule-timeline">
        <div class="sch-item" *ngFor="let a of todayApts" [class.sch-active]="a.active" [class.sch-done]="a.done">
          <div class="sch-time">
            <span class="time-main">{{ a.time }}</span>
            <span class="time-dur">{{ a.duration }}</span>
          </div>
          <div class="sch-line">
            <div class="sch-dot" [class.dot-active]="a.active"></div>
          </div>
          <div class="sch-body">
            <div class="sch-patient">
              <div class="avatar avatar-sm" [style.background]="a.avatarBg" [style.color]="a.avatarColor">{{ a.initials }}</div>
              <div>
                <div class="sch-patient-name">{{ a.patient }}</div>
                <div class="sch-reason">{{ a.reason }}</div>
              </div>
            </div>
            <div class="sch-footer">
              <span class="badge" [class]="'badge-' + a.statusClass">
                <span class="badge-dot"></span>{{ a.status }}
              </span>
              <span class="chip" *ngIf="a.tag">{{ a.tag }}</span>
              <a *ngIf="!a.done" routerLink="/consultations/new" class="btn-start-consult" mat-stroked-button>
                <mat-icon>stethoscope</mat-icon> Start consult
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Panel -->
    <div class="right-panel">

      <!-- Patient Queue -->
      <div class="wm-card">
        <div class="wm-card-header">
          <div class="wm-section-title">Patient Queue</div>
          <span class="badge badge-warning">3 waiting</span>
        </div>
        <div class="queue-list">
          <div class="queue-item" *ngFor="let p of queue; let i = index">
            <div class="queue-pos" [class.pos-next]="i === 0">{{ i + 1 }}</div>
            <div class="avatar avatar-sm" [style.background]="p.avatarBg" [style.color]="p.avatarColor">{{ p.initials }}</div>
            <div class="qi-body">
              <div class="qi-name">{{ p.name }}</div>
              <div class="qi-wait">Waiting {{ p.wait }}</div>
            </div>
            <span *ngIf="i === 0" class="badge badge-inprogress">
              <span class="badge-dot"></span>Next
            </span>
          </div>
        </div>
      </div>

      <!-- Pending Actions -->
      <div class="wm-card mt-5">
        <div class="wm-card-header">
          <div class="wm-section-title">Pending Actions</div>
          <span class="badge badge-danger">{{ pendingActions.length }} items</span>
        </div>
        <div class="action-list">
          <div class="action-item" *ngFor="let a of pendingActions">
            <div class="action-icon" [style.background]="a.bg">
              <mat-icon [style.color]="a.color">{{ a.icon }}</mat-icon>
            </div>
            <div class="action-body">
              <div class="action-title">{{ a.title }}</div>
              <div class="action-meta">{{ a.meta }}</div>
            </div>
            <button class="action-btn" [style.color]="a.color">
              <mat-icon>arrow_forward_ios</mat-icon>
            </button>
          </div>
        </div>
      </div>

      <!-- Recent Consultations Summary -->
      <div class="wm-card mt-5">
        <div class="wm-card-header">
          <div class="wm-section-title">Recent Consultations</div>
          <a routerLink="/consultations" class="see-all">All <mat-icon>arrow_forward</mat-icon></a>
        </div>
        <div class="recent-consult-list">
          <div class="rc-item" *ngFor="let c of recentConsults">
            <div class="avatar avatar-sm" [style.background]="c.avatarBg" [style.color]="c.avatarColor">{{ c.initials }}</div>
            <div class="rc-body">
              <div class="rc-name">{{ c.patient }}</div>
              <div class="rc-date">{{ c.date }}</div>
            </div>
            <span class="badge" [class]="'badge-' + c.statusClass">{{ c.status }}</span>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- ── Bottom Row: Stats ───────────────────────────────────────── -->
  <div class="wm-grid-2 mt-6">

    <!-- Weekly Activity -->
    <div class="wm-card">
      <div class="wm-card-header">
        <div class="wm-section-title">Weekly Activity</div>
        <div class="card-sub">This week vs last week</div>
      </div>
      <div class="wm-card-body">
        <div class="bar-chart">
          <div class="bar-group" *ngFor="let d of weeklyData">
            <div class="bars">
              <div class="bar bar-prev" [style.height]="d.prev + '%'" title="Last week: {{d.prev}}"></div>
              <div class="bar bar-curr" [style.height]="d.curr + '%'" title="This week: {{d.curr}}"></div>
            </div>
            <div class="bar-label">{{ d.day }}</div>
          </div>
        </div>
        <div class="chart-legend">
          <div class="legend-item"><div class="legend-dot" style="background:var(--wm-border)"></div> Last week</div>
          <div class="legend-item"><div class="legend-dot" style="background:var(--wm-primary)"></div> This week</div>
        </div>
      </div>
    </div>

    <!-- Service Breakdown -->
    <div class="wm-card">
      <div class="wm-card-header">
        <div class="wm-section-title">Appointment Types</div>
        <div class="card-sub">This month</div>
      </div>
      <div class="wm-card-body">
        <div class="service-breakdown">
          <div class="sb-item" *ngFor="let s of serviceBreakdown">
            <div class="sb-head">
              <span class="sb-label">{{ s.label }}</span>
              <span class="sb-value">{{ s.count }}</span>
            </div>
            <div class="wm-progress">
              <div class="wm-progress-fill" [style.width]="s.pct + '%'" [style.background]="s.color"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>
  `,
  styles: [`
    .hero-sub {
      color: var(--wm-muted);
      font-size: var(--fs-sm);
      margin: 6px 0 0;
    }
    .header-actions {
      display: flex;
      gap: 10px;
      align-items: center;
      flex-wrap: wrap;
    }
    .kpi-row { margin-bottom: 28px; }
    .mt-5 { margin-top: 20px; }
    .mt-6 { margin-top: 24px; }
    .card-sub { font-size: var(--fs-xs); color: var(--wm-muted-light); margin-top: 2px; }
    .see-all {
      display: inline-flex; align-items: center; gap: 3px;
      font-size: var(--fs-sm); font-weight: 600; color: var(--wm-primary); text-decoration: none;
      mat-icon { font-size: 14px; width: 14px; height: 14px; }
      &:hover { text-decoration: underline; }
    }

    /* Doctor grid */
    .doctor-grid {
      display: grid;
      grid-template-columns: 1fr 340px;
      gap: 24px;
      margin-bottom: 24px;
    }
    .right-panel { display: flex; flex-direction: column; gap: 0; }

    /* Schedule timeline */
    .schedule-timeline { padding: 8px 0; }
    .sch-item {
      display: grid;
      grid-template-columns: 72px 28px 1fr;
      gap: 0;
      padding: 0 16px;
      position: relative;
    }
    .sch-time {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      padding: 14px 12px 14px 0;
    }
    .time-main { font-size: var(--fs-sm); font-weight: 700; color: var(--wm-text); }
    .time-dur  { font-size: var(--fs-xs); color: var(--wm-muted-light); }

    .sch-line {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        top: 0; bottom: 0;
        width: 2px;
        background: var(--wm-border-light);
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .sch-dot {
      width: 12px; height: 12px;
      border-radius: 50%;
      background: var(--wm-border);
      border: 2px solid var(--wm-surface);
      box-shadow: 0 0 0 2px var(--wm-border);
      margin-top: 16px;
      position: relative;
      z-index: 1;
      transition: all var(--tr);
      &.dot-active {
        background: var(--wm-primary);
        box-shadow: 0 0 0 3px rgba(0,92,187,0.2);
      }
    }
    .sch-body {
      padding: 12px 0 12px 16px;
      border-bottom: 1px solid var(--wm-border-light);
    }
    .sch-item:last-child .sch-body { border-bottom: none; }
    .sch-patient {
      display: flex; align-items: center; gap: 10px; margin-bottom: 8px;
    }
    .sch-patient-name { font-size: var(--fs-sm); font-weight: 600; color: var(--wm-text); }
    .sch-reason       { font-size: var(--fs-xs); color: var(--wm-muted); }
    .sch-footer {
      display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
    }
    .btn-start-consult {
      margin-left: auto;
      font-size: var(--fs-xs) !important;
      mat-icon { font-size: 14px; width: 14px; height: 14px; }
    }
    .sch-active .sch-body { background: var(--wm-primary-subtle); border-radius: var(--r-md); }
    .sch-done { opacity: 0.5; }

    /* Queue */
    .queue-list { padding: 8px 0; }
    .queue-item {
      display: flex; align-items: center; gap: 12px;
      padding: 10px 24px;
      border-bottom: 1px solid var(--wm-border-light);
      &:last-child { border-bottom: none; }
    }
    .queue-pos {
      width: 24px; height: 24px;
      border-radius: 50%;
      background: var(--wm-bg-soft);
      color: var(--wm-muted);
      font-size: var(--fs-xs);
      font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      &.pos-next {
        background: var(--wm-primary);
        color: white;
      }
    }
    .qi-body { flex: 1; }
    .qi-name { font-size: var(--fs-sm); font-weight: 600; color: var(--wm-text); }
    .qi-wait { font-size: var(--fs-xs); color: var(--wm-warning); }

    /* Pending actions */
    .action-list { padding: 8px 0; }
    .action-item {
      display: flex; align-items: center; gap: 12px;
      padding: 12px 24px;
      border-bottom: 1px solid var(--wm-border-light);
      transition: background var(--tr);
      &:last-child { border-bottom: none; }
      &:hover { background: var(--wm-primary-subtle); }
    }
    .action-icon {
      width: 36px; height: 36px;
      border-radius: var(--r-md);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      mat-icon { font-size: 18px; width: 18px; height: 18px; }
    }
    .action-body { flex: 1; }
    .action-title { font-size: var(--fs-sm); font-weight: 600; color: var(--wm-text); }
    .action-meta  { font-size: var(--fs-xs); color: var(--wm-muted); }
    .action-btn {
      border: none; background: none; cursor: pointer; padding: 4px;
      border-radius: var(--r-sm);
      mat-icon { font-size: 14px; width: 14px; height: 14px; }
    }

    /* Recent consults */
    .recent-consult-list { padding: 8px 0; }
    .rc-item {
      display: flex; align-items: center; gap: 12px;
      padding: 10px 24px;
      border-bottom: 1px solid var(--wm-border-light);
      &:last-child { border-bottom: none; }
    }
    .rc-body { flex: 1; }
    .rc-name { font-size: var(--fs-sm); font-weight: 600; color: var(--wm-text); }
    .rc-date { font-size: var(--fs-xs); color: var(--wm-muted); }

    /* Bar chart */
    .bar-chart {
      display: flex;
      align-items: flex-end;
      gap: 16px;
      height: 120px;
      margin-bottom: 12px;
    }
    .bar-group {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
    }
    .bars {
      flex: 1;
      display: flex;
      align-items: flex-end;
      gap: 4px;
      width: 100%;
    }
    .bar {
      flex: 1;
      border-radius: 4px 4px 0 0;
      min-height: 4px;
      transition: height 600ms cubic-bezier(0.4,0,0.2,1);
    }
    .bar-prev { background: var(--wm-border); }
    .bar-curr { background: var(--wm-primary); }
    .bar-label {
      font-size: var(--fs-xs);
      color: var(--wm-muted-light);
      margin-top: 6px;
      font-weight: 500;
    }
    .chart-legend {
      display: flex;
      gap: 16px;
    }
    .legend-item {
      display: flex; align-items: center; gap: 6px;
      font-size: var(--fs-xs); color: var(--wm-muted);
    }
    .legend-dot {
      width: 8px; height: 8px; border-radius: 2px; flex-shrink: 0;
    }

    /* Service breakdown */
    .service-breakdown {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .sb-item {}
    .sb-head {
      display: flex;
      justify-content: space-between;
      margin-bottom: 6px;
    }
    .sb-label { font-size: var(--fs-sm); font-weight: 500; color: var(--wm-text); }
    .sb-value { font-size: var(--fs-sm); font-weight: 700; color: var(--wm-text); }

    @media (max-width: 1200px) {
      .doctor-grid { grid-template-columns: 1fr; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DoctorDashboardComponent {
  readonly today = new Date();

  readonly kpis = [
    { icon: 'event',           label: 'Today\'s Appointments', value: '8',   bg: 'var(--wm-primary-light)',  color: 'var(--wm-primary)',  change: '+2 vs yesterday',   changeClass: 'up',   changeIcon: 'trending_up' },
    { icon: 'stethoscope',     label: 'In Progress',           value: '1',   bg: 'var(--wm-teal-light)',     color: 'var(--wm-teal)',     change: '1 ongoing',         changeClass: 'flat', changeIcon: 'trending_flat' },
    { icon: 'pending_actions', label: 'Awaiting Approval',     value: '5',   bg: 'var(--wm-warning-light)',  color: 'var(--wm-warning)',  change: '2 urgent',          changeClass: 'down', changeIcon: 'trending_up' },
    { icon: 'people',          label: 'Patients This Week',    value: '34',  bg: 'var(--wm-success-light)',  color: 'var(--wm-success)',  change: '+8% vs last week',  changeClass: 'up',   changeIcon: 'trending_up' },
  ];

  readonly todayApts = [
    { time: '08:30', duration: '30 min', patient: 'Jean-Pierre Moreau',   initials: 'JM', reason: 'Annual Cardiology Check-up',      status: 'Completed', statusClass: 'completed', tag: '',              active: false, done: true,  avatarBg: 'var(--wm-success-light)', avatarColor: 'var(--wm-success)' },
    { time: '09:15', duration: '45 min', patient: 'Isabelle Tremblay',    initials: 'IT', reason: 'Chest Pain Investigation',         status: 'Completed', statusClass: 'completed', tag: '',              active: false, done: true,  avatarBg: 'var(--wm-teal-light)',   avatarColor: 'var(--wm-teal)' },
    { time: '10:30', duration: '30 min', patient: 'Marie Dupont',         initials: 'MD', reason: 'Cardiology Consultation',          status: 'In Progress', statusClass: 'inprogress',tag: 'Priority',   active: true,  done: false, avatarBg: 'var(--wm-primary-light)',avatarColor: 'var(--wm-primary)' },
    { time: '11:30', duration: '30 min', patient: 'Robert Lefevre',       initials: 'RL', reason: 'ECG Follow-up',                    status: 'Approved',  statusClass: 'approved',  tag: '',              active: false, done: false, avatarBg: 'var(--wm-warning-light)',avatarColor: 'var(--wm-warning)' },
    { time: '14:00', duration: '60 min', patient: 'Sylvie Beaumont',      initials: 'SB', reason: 'Stress Test Consultation',         status: 'Approved',  statusClass: 'approved',  tag: 'Lab Required',  active: false, done: false, avatarBg: 'var(--wm-violet-light)', avatarColor: 'var(--wm-violet)' },
    { time: '15:15', duration: '30 min', patient: 'Henri Marchand',       initials: 'HM', reason: 'Post-op Cardiac Follow-up',        status: 'Pending',   statusClass: 'pending',   tag: '',              active: false, done: false, avatarBg: 'var(--wm-danger-light)', avatarColor: 'var(--wm-danger)' },
  ];

  readonly queue = [
    { name: 'Robert Lefevre',  initials: 'RL', wait: '5 min',  avatarBg: 'var(--wm-warning-light)', avatarColor: 'var(--wm-warning)' },
    { name: 'Sylvie Beaumont', initials: 'SB', wait: '35 min', avatarBg: 'var(--wm-violet-light)',  avatarColor: 'var(--wm-violet)' },
    { name: 'Henri Marchand',  initials: 'HM', wait: '1h 20m', avatarBg: 'var(--wm-danger-light)',  avatarColor: 'var(--wm-danger)' },
  ];

  readonly pendingActions = [
    { icon: 'science',        title: 'Lab Results Pending Review',   meta: 'Isabelle Tremblay · Blood panel', bg: 'var(--wm-teal-light)',   color: 'var(--wm-teal)' },
    { icon: 'receipt_long',   title: 'Prescription Renewal Request', meta: 'Jean-Pierre Moreau · Amlodipine', bg: 'var(--wm-primary-light)',color: 'var(--wm-primary)' },
    { icon: 'pending',        title: '3 Appointment Approvals',      meta: 'Awaiting your decision',          bg: 'var(--wm-warning-light)',color: 'var(--wm-warning)' },
  ];

  readonly recentConsults = [
    { patient: 'Isabelle Tremblay',  initials: 'IT', date: 'Today, 09:15',      status: 'Completed', statusClass: 'completed', avatarBg: 'var(--wm-teal-light)',   avatarColor: 'var(--wm-teal)' },
    { patient: 'Jean-Pierre Moreau', initials: 'JM', date: 'Today, 08:30',      status: 'Completed', statusClass: 'completed', avatarBg: 'var(--wm-success-light)', avatarColor: 'var(--wm-success)' },
    { patient: 'Claire Bernard',     initials: 'CB', date: 'Yesterday, 14:00',  status: 'Archived',  statusClass: 'archived',  avatarBg: 'var(--wm-bg-soft)',       avatarColor: 'var(--wm-muted)' },
    { patient: 'Alain Rousseau',     initials: 'AR', date: 'Yesterday, 10:30',  status: 'Archived',  statusClass: 'archived',  avatarBg: 'var(--wm-bg-soft)',       avatarColor: 'var(--wm-muted)' },
  ];

  readonly weeklyData = [
    { day: 'Mon', prev: 55, curr: 70 },
    { day: 'Tue', prev: 75, curr: 85 },
    { day: 'Wed', prev: 60, curr: 65 },
    { day: 'Thu', prev: 80, curr: 90 },
    { day: 'Fri', prev: 50, curr: 75 },
    { day: 'Sat', prev: 30, curr: 40 },
    { day: 'Sun', prev: 10, curr: 15 },
  ];

  readonly serviceBreakdown = [
    { label: 'Consultations',    count: 28, pct: 85, color: 'var(--wm-primary)' },
    { label: 'ECG / Imaging',    count: 12, pct: 36, color: 'var(--wm-teal)' },
    { label: 'Follow-ups',       count: 19, pct: 58, color: 'var(--wm-success-mid)' },
    { label: 'Urgent Cases',     count:  5, pct: 15, color: 'var(--wm-danger-mid)' },
  ];
}
