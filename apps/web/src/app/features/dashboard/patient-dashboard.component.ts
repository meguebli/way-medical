import { NgFor, NgIf, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'wm-patient-dashboard',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, RouterLink, MatIconModule, MatButtonModule, MatTooltipModule],
  template: `
<div class="wm-page">

  <!-- ── Page Header ─────────────────────────────────────────────── -->
  <div class="page-hero">
    <div class="hero-left">
      <p class="wm-eyebrow">Patient Portal</p>
      <h1 class="wm-page-title">Good morning, Marie 👋</h1>
      <p class="hero-sub">Here's your health summary for today, {{ today | date:'MMMM d, y' }}</p>
    </div>
    <div class="hero-actions">
      <a routerLink="/appointments/new" mat-raised-button color="primary" class="btn-book">
        <mat-icon>add</mat-icon> Book Appointment
      </a>
    </div>
  </div>

  <!-- ── Next Appointment Banner ─────────────────────────────────── -->
  <div class="next-apt-banner">
    <div class="nab-icon-wrap">
      <mat-icon>event_available</mat-icon>
    </div>
    <div class="nab-content">
      <div class="nab-label">Your next appointment</div>
      <div class="nab-title">Cardiology Consultation — Dr. Éric Fontaine</div>
      <div class="nab-meta">
        <span><mat-icon>schedule</mat-icon> Tuesday, April 29 · 10:30 AM</span>
        <span><mat-icon>location_on</mat-icon> Polyclinique Saint-Louis, Room 3B</span>
      </div>
    </div>
    <div class="nab-actions">
      <button mat-stroked-button class="btn-details" routerLink="/appointments/1">View details</button>
      <button mat-button class="btn-cancel" color="warn">Cancel</button>
    </div>
  </div>

  <!-- ── KPI Row ──────────────────────────────────────────────────── -->
  <div class="wm-grid-4 kpi-row">
    <div class="kpi-card" *ngFor="let k of kpis">
      <div class="kpi-icon" [style.background]="k.bg">
        <mat-icon [style.color]="k.color">{{ k.icon }}</mat-icon>
      </div>
      <div class="kpi-value">{{ k.value }}</div>
      <div class="kpi-label">{{ k.label }}</div>
      <div class="kpi-accent-bar" [style.background]="k.color"></div>
    </div>
  </div>

  <!-- ── Main Grid ────────────────────────────────────────────────── -->
  <div class="main-grid">

    <!-- Left Column -->
    <div class="col-left">

      <!-- Upcoming Appointments -->
      <div class="wm-card">
        <div class="wm-card-header">
          <div>
            <div class="wm-section-title">Upcoming Appointments</div>
            <div class="card-sub">Next 30 days</div>
          </div>
          <a routerLink="/appointments" class="see-all">See all <mat-icon>arrow_forward</mat-icon></a>
        </div>
        <div class="apt-list">
          <div class="apt-item" *ngFor="let a of upcomingApts">
            <div class="apt-date-col">
              <div class="apt-day">{{ a.day }}</div>
              <div class="apt-month">{{ a.month }}</div>
            </div>
            <div class="apt-dot" [style.background]="a.color"></div>
            <div class="apt-body">
              <div class="apt-title">{{ a.title }}</div>
              <div class="apt-meta">{{ a.doctor }} · {{ a.time }}</div>
            </div>
            <span class="badge" [class]="'badge-' + a.statusClass">
              <span class="badge-dot"></span>{{ a.status }}
            </span>
          </div>
        </div>
      </div>

      <!-- Consultation History Timeline -->
      <div class="wm-card mt-6">
        <div class="wm-card-header">
          <div>
            <div class="wm-section-title">Recent Consultations</div>
            <div class="card-sub">Your last 3 visits</div>
          </div>
          <a routerLink="/consultations" class="see-all">History <mat-icon>arrow_forward</mat-icon></a>
        </div>
        <div class="wm-card-body">
          <div class="wm-timeline">
            <div class="timeline-item" *ngFor="let c of recentConsultations">
              <div class="timeline-dot" [style.background]="c.color"></div>
              <div class="timeline-time">{{ c.date }}</div>
              <div class="timeline-title">{{ c.title }}</div>
              <div class="timeline-body">{{ c.summary }}</div>
              <div class="consult-chips">
                <span class="chip" *ngFor="let tag of c.tags">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Column -->
    <div class="col-right">

      <!-- Active Treatments -->
      <div class="wm-card">
        <div class="wm-card-header">
          <div class="wm-section-title">Active Treatments</div>
          <a routerLink="/treatments" class="see-all">View all <mat-icon>arrow_forward</mat-icon></a>
        </div>
        <div class="treatments-list">
          <div class="treatment-item" *ngFor="let t of treatments">
            <div class="ti-icon" [style.background]="t.bg">
              <mat-icon [style.color]="t.color">{{ t.icon }}</mat-icon>
            </div>
            <div class="ti-body">
              <div class="ti-name">{{ t.name }}</div>
              <div class="ti-sub">{{ t.dose }} · {{ t.freq }}</div>
              <div class="ti-progress">
                <div class="wm-progress">
                  <div class="wm-progress-fill" [style.width]="t.progress + '%'" [style.background]="t.color"></div>
                </div>
                <span class="ti-prog-label">{{ t.progress }}% complete</span>
              </div>
            </div>
            <span class="badge badge-active">Active</span>
          </div>
        </div>
      </div>

      <!-- Health Metrics -->
      <div class="wm-card mt-5">
        <div class="wm-card-header">
          <div class="wm-section-title">Health Metrics</div>
          <span class="badge badge-success">Normal range</span>
        </div>
        <div class="metrics-grid">
          <div class="metric-item" *ngFor="let m of healthMetrics">
            <div class="metric-icon" [style.background]="m.bg">
              <mat-icon [style.color]="m.color">{{ m.icon }}</mat-icon>
            </div>
            <div class="metric-value" [style.color]="m.color">{{ m.value }}</div>
            <div class="metric-unit">{{ m.unit }}</div>
            <div class="metric-label">{{ m.label }}</div>
            <div class="metric-trend">
              <mat-icon [class]="m.trend === 'up' ? 'trend-up' : m.trend === 'down' ? 'trend-down' : 'trend-flat'">
                {{ m.trend === 'up' ? 'trending_up' : m.trend === 'down' ? 'trending_down' : 'trending_flat' }}
              </mat-icon>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Documents -->
      <div class="wm-card mt-5">
        <div class="wm-card-header">
          <div class="wm-section-title">Recent Documents</div>
          <a routerLink="/lab-results" class="see-all">All docs <mat-icon>arrow_forward</mat-icon></a>
        </div>
        <div class="docs-list">
          <div class="doc-item" *ngFor="let d of recentDocs">
            <div class="doc-icon" [style.background]="d.bg">
              <mat-icon [style.color]="d.color">{{ d.icon }}</mat-icon>
            </div>
            <div class="doc-body">
              <div class="doc-name">{{ d.name }}</div>
              <div class="doc-meta">{{ d.date }} · {{ d.doctor }}</div>
            </div>
            <button class="doc-download" [matTooltip]="'Download ' + d.name">
              <mat-icon>download</mat-icon>
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
  `,
  styles: [`
    .page-hero {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 28px;
    }
    .hero-sub {
      color: var(--wm-muted);
      font-size: var(--fs-sm);
      margin: 6px 0 0;
    }
    .btn-book {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
    }

    /* Next apt banner */
    .next-apt-banner {
      background: linear-gradient(135deg, var(--wm-primary-strong) 0%, var(--wm-primary) 100%);
      border-radius: var(--r-xl);
      padding: 20px 24px;
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 28px;
      box-shadow: var(--sh-lg);
    }
    .nab-icon-wrap {
      width: 52px; height: 52px;
      background: rgba(255,255,255,0.15);
      border-radius: var(--r-lg);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      mat-icon { color: white; font-size: 26px; width: 26px; height: 26px; }
    }
    .nab-content { flex: 1; }
    .nab-label {
      font-size: var(--fs-xs);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.09em;
      color: rgba(255,255,255,0.65);
      margin-bottom: 4px;
    }
    .nab-title {
      font-size: var(--fs-lg);
      font-weight: 700;
      color: white;
      margin-bottom: 8px;
    }
    .nab-meta {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
      span {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        font-size: var(--fs-sm);
        color: rgba(255,255,255,0.75);
        mat-icon { font-size: 14px; width: 14px; height: 14px; }
      }
    }
    .nab-actions {
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex-shrink: 0;
    }
    .btn-details {
      background: rgba(255,255,255,0.15) !important;
      color: white !important;
      border-color: rgba(255,255,255,0.3) !important;
      font-size: var(--fs-sm) !important;
    }
    .btn-cancel {
      font-size: var(--fs-xs) !important;
      color: rgba(255,255,255,0.6) !important;
    }

    /* KPI row */
    .kpi-row { margin-bottom: 28px; }

    /* Main grid */
    .main-grid {
      display: grid;
      grid-template-columns: 1fr 400px;
      gap: 24px;
      align-items: start;
    }
    .col-left, .col-right { display: flex; flex-direction: column; gap: 0; }
    .mt-5 { margin-top: 20px; }
    .mt-6 { margin-top: 24px; }

    /* Card common */
    .card-sub {
      font-size: var(--fs-xs);
      color: var(--wm-muted-light);
      margin-top: 2px;
    }
    .see-all {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      font-size: var(--fs-sm);
      font-weight: 600;
      color: var(--wm-primary);
      text-decoration: none;
      mat-icon { font-size: 14px; width: 14px; height: 14px; }
      &:hover { text-decoration: underline; }
    }

    /* Apt list */
    .apt-list { padding: 8px 0; }
    .apt-item {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 14px 24px;
      border-bottom: 1px solid var(--wm-border-light);
      transition: background var(--tr);
      &:last-child { border-bottom: none; }
      &:hover { background: var(--wm-primary-subtle); }
    }
    .apt-date-col {
      width: 40px;
      text-align: center;
      flex-shrink: 0;
    }
    .apt-day {
      font-size: var(--fs-xl);
      font-weight: 800;
      color: var(--wm-primary);
      line-height: 1;
    }
    .apt-month {
      font-size: var(--fs-xs);
      font-weight: 600;
      text-transform: uppercase;
      color: var(--wm-muted-light);
      letter-spacing: 0.06em;
    }
    .apt-dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .apt-body { flex: 1; min-width: 0; }
    .apt-title {
      font-size: var(--fs-sm);
      font-weight: 600;
      color: var(--wm-text);
    }
    .apt-meta {
      font-size: var(--fs-xs);
      color: var(--wm-muted);
      margin-top: 2px;
    }

    /* Timeline add-ons */
    .consult-chips {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      margin-top: 8px;
    }

    /* Treatments */
    .treatments-list { padding: 8px 0; }
    .treatment-item {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 14px 24px;
      border-bottom: 1px solid var(--wm-border-light);
      &:last-child { border-bottom: none; }
    }
    .ti-icon {
      width: 40px; height: 40px;
      border-radius: var(--r-lg);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      mat-icon { font-size: 18px; width: 18px; height: 18px; }
    }
    .ti-body { flex: 1; min-width: 0; }
    .ti-name { font-size: var(--fs-sm); font-weight: 600; color: var(--wm-text); }
    .ti-sub { font-size: var(--fs-xs); color: var(--wm-muted); margin: 2px 0 6px; }
    .ti-progress { display: flex; align-items: center; gap: 8px; }
    .ti-prog-label { font-size: var(--fs-xs); color: var(--wm-muted-light); white-space: nowrap; }

    /* Health metrics */
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      padding: 20px 24px;
    }
    .metric-item {
      background: var(--wm-bg-soft);
      border: 1px solid var(--wm-border-light);
      border-radius: var(--r-lg);
      padding: 14px;
      position: relative;
    }
    .metric-icon {
      width: 32px; height: 32px;
      border-radius: var(--r-md);
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 10px;
      mat-icon { font-size: 16px; width: 16px; height: 16px; }
    }
    .metric-value {
      font-size: var(--fs-2xl);
      font-weight: 800;
      line-height: 1;
      letter-spacing: -0.02em;
    }
    .metric-unit {
      font-size: var(--fs-xs);
      color: var(--wm-muted);
      font-weight: 500;
    }
    .metric-label {
      font-size: var(--fs-xs);
      color: var(--wm-muted);
      margin-top: 4px;
    }
    .metric-trend {
      position: absolute;
      top: 12px; right: 12px;
      mat-icon { font-size: 16px; width: 16px; height: 16px; }
      .trend-up   { color: var(--wm-success); }
      .trend-down { color: var(--wm-danger); }
      .trend-flat { color: var(--wm-muted-light); }
    }

    /* Documents */
    .docs-list { padding: 8px 0; }
    .doc-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 24px;
      border-bottom: 1px solid var(--wm-border-light);
      transition: background var(--tr);
      &:last-child { border-bottom: none; }
      &:hover { background: var(--wm-primary-subtle); }
    }
    .doc-icon {
      width: 36px; height: 36px;
      border-radius: var(--r-md);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      mat-icon { font-size: 18px; width: 18px; height: 18px; }
    }
    .doc-body { flex: 1; min-width: 0; }
    .doc-name { font-size: var(--fs-sm); font-weight: 600; color: var(--wm-text); }
    .doc-meta { font-size: var(--fs-xs); color: var(--wm-muted); }
    .doc-download {
      border: none;
      background: none;
      cursor: pointer;
      width: 32px; height: 32px;
      border-radius: var(--r-md);
      display: flex; align-items: center; justify-content: center;
      color: var(--wm-muted-light);
      transition: background var(--tr), color var(--tr);
      &:hover { background: var(--wm-primary-light); color: var(--wm-primary); }
      mat-icon { font-size: 18px; width: 18px; height: 18px; }
    }

    @media (max-width: 1200px) {
      .main-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 768px) {
      .next-apt-banner { flex-direction: column; align-items: flex-start; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientDashboardComponent {
  readonly today = new Date();

  readonly kpis = [
    { icon: 'event',          label: 'Upcoming Appointments', value: '3',  bg: 'var(--wm-primary-light)',  color: 'var(--wm-primary)' },
    { icon: 'medication',     label: 'Active Treatments',     value: '2',  bg: 'var(--wm-success-light)',  color: 'var(--wm-success)' },
    { icon: 'science',        label: 'Pending Lab Results',   value: '1',  bg: 'var(--wm-warning-light)',  color: 'var(--wm-warning)' },
    { icon: 'receipt_long',   label: 'Active Prescriptions',  value: '4',  bg: 'var(--wm-teal-light)',     color: 'var(--wm-teal)' },
  ];

  readonly upcomingApts = [
    { day: '29', month: 'Apr', title: 'Cardiology Consultation',    doctor: 'Dr. Éric Fontaine',   time: '10:30 AM', status: 'Approved',  statusClass: 'approved', color: 'var(--wm-teal)' },
    { day: '05', month: 'May', title: 'General Check-up',           doctor: 'Dr. Claire Martin',   time: '2:00 PM',  status: 'Pending',   statusClass: 'pending',  color: 'var(--wm-warning-mid)' },
    { day: '12', month: 'May', title: 'Radiology — Chest X-Ray',    doctor: 'Dr. Yann Leblanc',    time: '9:15 AM',  status: 'Requested', statusClass: 'requested',color: 'var(--wm-primary)' },
    { day: '18', month: 'May', title: 'Dermatology Follow-up',      doctor: 'Dr. Sophie Renard',   time: '11:45 AM', status: 'Approved',  statusClass: 'approved', color: 'var(--wm-teal)' },
  ];

  readonly recentConsultations = [
    {
      date: 'April 10, 2025',
      title: 'Cardiology – Routine Follow-up',
      summary: 'ECG performed, results normal. Blood pressure slightly elevated. Medication dosage adjusted.',
      color: 'var(--wm-primary)',
      tags: ['ECG', 'Hypertension', 'Prescription updated']
    },
    {
      date: 'March 3, 2025',
      title: 'General Medicine – Seasonal Respiratory',
      summary: 'Diagnosis of acute bronchitis. 7-day antibiotic course prescribed. Follow-up in 3 weeks.',
      color: 'var(--wm-teal)',
      tags: ['Bronchitis', 'Antibiotic', 'Lab request']
    },
    {
      date: 'January 20, 2025',
      title: 'Blood Test – Annual Biology',
      summary: 'Comprehensive blood work panel. Cholesterol slightly high. Dietary recommendations provided.',
      color: 'var(--wm-success-mid)',
      tags: ['Blood panel', 'Cholesterol', 'Normal overall']
    },
  ];

  readonly treatments = [
    { name: 'Amlodipine 5mg',      dose: '1 tablet', freq: 'Every morning',   progress: 68, icon: 'medication',    bg: 'var(--wm-primary-light)', color: 'var(--wm-primary)' },
    { name: 'Atorvastatin 20mg',   dose: '1 tablet', freq: 'Every evening',   progress: 45, icon: 'local_pharmacy',bg: 'var(--wm-teal-light)',    color: 'var(--wm-teal)' },
  ];

  readonly healthMetrics = [
    { icon: 'favorite',    label: 'Heart Rate',   value: '72',    unit: 'bpm',   bg: 'var(--wm-danger-light)',   color: 'var(--wm-danger)',   trend: 'flat' },
    { icon: 'compress',    label: 'Blood Press.', value: '128/82',unit: 'mmHg',  bg: 'var(--wm-warning-light)',  color: 'var(--wm-warning)',  trend: 'down' },
    { icon: 'monitor_weight',label:'Weight',     value: '74.2',  unit: 'kg',    bg: 'var(--wm-success-light)',  color: 'var(--wm-success)',  trend: 'flat' },
    { icon: 'thermostat',  label: 'Temperature',  value: '36.7',  unit: '°C',    bg: 'var(--wm-teal-light)',     color: 'var(--wm-teal)',     trend: 'flat' },
  ];

  readonly recentDocs = [
    { name: 'Blood Test Results – April',    date: 'Apr 10, 2025', doctor: 'Lab Central',        icon: 'science',      bg: 'var(--wm-teal-light)',   color: 'var(--wm-teal)' },
    { name: 'Cardiology ECG Report',         date: 'Apr 10, 2025', doctor: 'Dr. Fontaine',       icon: 'favorite',     bg: 'var(--wm-danger-light)', color: 'var(--wm-danger)' },
    { name: 'Prescription – Amlodipine',     date: 'Apr 10, 2025', doctor: 'Dr. Fontaine',       icon: 'receipt_long', bg: 'var(--wm-primary-light)',color: 'var(--wm-primary)' },
    { name: 'Chest X-Ray Imaging Report',    date: 'Mar 3, 2025',  doctor: 'Dr. Leblanc',        icon: 'radiology',    bg: 'var(--wm-success-light)',color: 'var(--wm-success)' },
  ];
}
