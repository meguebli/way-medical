import { NgFor, NgIf, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'wm-appointment-detail',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, RouterLink, MatIconModule, MatButtonModule],
  template: `
<div class="wm-page">

  <!-- Breadcrumb -->
  <div class="breadcrumb">
    <a routerLink="/appointments">Appointments</a>
    <mat-icon>chevron_right</mat-icon>
    <span>Appointment #APT-2025-0489</span>
  </div>

  <!-- Header -->
  <div class="apt-detail-header">
    <div class="adh-left">
      <h1 class="wm-page-title">Cardiology Consultation</h1>
      <div class="adh-meta">
        <span class="badge badge-approved"><span class="badge-dot"></span>Approved</span>
        <span class="adh-sep">·</span>
        <span class="adh-info"><mat-icon>event</mat-icon> Tuesday, April 29, 2025</span>
        <span class="adh-sep">·</span>
        <span class="adh-info"><mat-icon>schedule</mat-icon> 10:30 – 11:00 AM</span>
        <span class="adh-sep">·</span>
        <span class="adh-info"><mat-icon>location_on</mat-icon> Room 3B</span>
      </div>
    </div>
    <div class="adh-actions">
      <button mat-stroked-button color="warn" *ngIf="apt.statusClass !== 'completed'">
        <mat-icon>cancel</mat-icon> Cancel
      </button>
      <button mat-stroked-button *ngIf="apt.statusClass === 'approved'">
        <mat-icon>edit</mat-icon> Reschedule
      </button>
      <a routerLink="/consultations/new" mat-raised-button color="primary" *ngIf="apt.statusClass === 'approved'">
        <mat-icon>stethoscope</mat-icon> Start Consultation
      </a>
    </div>
  </div>

  <!-- Workflow Steps -->
  <div class="workflow-steps">
    <div class="ws-step" [class.done]="true">
      <div class="ws-icon done"><mat-icon>check</mat-icon></div>
      <div class="ws-label">Requested</div>
      <div class="ws-date">Apr 20, 14:23</div>
    </div>
    <div class="ws-line done"></div>
    <div class="ws-step" [class.done]="true">
      <div class="ws-icon done"><mat-icon>check</mat-icon></div>
      <div class="ws-label">Pending Review</div>
      <div class="ws-date">Apr 21, 09:11</div>
    </div>
    <div class="ws-line done"></div>
    <div class="ws-step active">
      <div class="ws-icon active"><mat-icon>event_available</mat-icon></div>
      <div class="ws-label">Approved</div>
      <div class="ws-date">Apr 21, 11:05</div>
    </div>
    <div class="ws-line"></div>
    <div class="ws-step">
      <div class="ws-icon"><mat-icon>stethoscope</mat-icon></div>
      <div class="ws-label">Consultation</div>
      <div class="ws-date">—</div>
    </div>
    <div class="ws-line"></div>
    <div class="ws-step">
      <div class="ws-icon"><mat-icon>check_circle</mat-icon></div>
      <div class="ws-label">Completed</div>
      <div class="ws-date">—</div>
    </div>
  </div>

  <!-- Detail Grid -->
  <div class="detail-grid">

    <!-- Left: Patient Info + Appointment Info -->
    <div class="detail-left">

      <!-- Patient Card -->
      <div class="wm-card">
        <div class="wm-card-header">
          <div class="wm-section-title">Patient</div>
          <a routerLink="/patients/1" class="see-all">View record <mat-icon>arrow_forward</mat-icon></a>
        </div>
        <div class="patient-detail-card">
          <div class="avatar avatar-xl" style="background:var(--wm-primary-light);color:var(--wm-primary)">MD</div>
          <div class="pdc-body">
            <div class="pdc-name">Marie Dupont</div>
            <div class="pdc-ref">PAT-00124</div>
            <div class="pdc-grid">
              <div class="pdc-item">
                <div class="pdc-label">Date of Birth</div>
                <div class="pdc-value">March 14, 1978 (47 y/o)</div>
              </div>
              <div class="pdc-item">
                <div class="pdc-label">Gender</div>
                <div class="pdc-value">Female</div>
              </div>
              <div class="pdc-item">
                <div class="pdc-label">Blood Type</div>
                <div class="pdc-value">A+</div>
              </div>
              <div class="pdc-item">
                <div class="pdc-label">Allergies</div>
                <div class="pdc-value">
                  <span class="chip" style="background:var(--wm-danger-light);color:var(--wm-danger);border-color:var(--wm-danger-border)">Penicillin</span>
                </div>
              </div>
              <div class="pdc-item">
                <div class="pdc-label">Phone</div>
                <div class="pdc-value">+33 6 12 34 56 78</div>
              </div>
              <div class="pdc-item">
                <div class="pdc-label">Email</div>
                <div class="pdc-value">marie.dupont&#64;mail.fr</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Appointment Info -->
      <div class="wm-card mt-5">
        <div class="wm-card-header">
          <div class="wm-section-title">Appointment Details</div>
        </div>
        <div class="info-grid">
          <div class="info-item" *ngFor="let info of aptInfo">
            <div class="info-label">{{ info.label }}</div>
            <div class="info-value">{{ info.value }}</div>
          </div>
        </div>
      </div>

      <!-- Reason / Notes -->
      <div class="wm-card mt-5">
        <div class="wm-card-header">
          <div class="wm-section-title">Reason for Visit</div>
        </div>
        <div class="wm-card-body">
          <p class="reason-text">
            Patient reports recurring chest tightness over the past 2 weeks, especially during physical activity.
            Previous ECG showed minor ST changes. This appointment is a follow-up on the April 10 consultation
            to review updated ECG results and adjust treatment if necessary.
          </p>
          <div class="wm-alert alert-warning mt-5" style="margin-top:16px">
            <mat-icon>warning</mat-icon>
            <div>
              <strong>Allergy Alert:</strong> Patient is allergic to Penicillin. Ensure no related antibiotics are prescribed.
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right: Doctor, Timeline, Related -->
    <div class="detail-right">

      <!-- Doctor Card -->
      <div class="wm-card">
        <div class="wm-card-header">
          <div class="wm-section-title">Assigned Doctor</div>
        </div>
        <div class="doctor-card">
          <div class="avatar avatar-lg" style="background:var(--wm-teal-light);color:var(--wm-teal-dark)">EF</div>
          <div class="dc-body">
            <div class="dc-name">Dr. Éric Fontaine</div>
            <div class="dc-spec">Cardiologist</div>
            <div class="dc-service">Cardiology Department</div>
            <div class="dc-contact">
              <span><mat-icon>phone</mat-icon> Ext. 3201</span>
              <span><mat-icon>email</mat-icon> e.fontaine&#64;clinic.fr</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Activity Timeline -->
      <div class="wm-card mt-5">
        <div class="wm-card-header">
          <div class="wm-section-title">Activity Log</div>
        </div>
        <div class="wm-card-body">
          <div class="wm-timeline">
            <div class="timeline-item" *ngFor="let ev of activityLog">
              <div class="timeline-dot" [style.background]="ev.color"></div>
              <div class="timeline-time">{{ ev.time }}</div>
              <div class="timeline-title">{{ ev.title }}</div>
              <div class="timeline-body">{{ ev.body }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Consultations -->
      <div class="wm-card mt-5">
        <div class="wm-card-header">
          <div class="wm-section-title">Previous Consultations</div>
          <a routerLink="/consultations" class="see-all">All <mat-icon>arrow_forward</mat-icon></a>
        </div>
        <div class="related-list">
          <div class="rel-item" *ngFor="let c of relatedConsults">
            <div class="rel-icon" [style.background]="c.bg">
              <mat-icon [style.color]="c.color">stethoscope</mat-icon>
            </div>
            <div class="rel-body">
              <div class="rel-title">{{ c.title }}</div>
              <div class="rel-date">{{ c.date }}</div>
            </div>
            <span class="badge badge-completed">Completed</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
  `,
  styles: [`
    .breadcrumb {
      display: flex; align-items: center; gap: 4px;
      font-size: var(--fs-sm); color: var(--wm-muted); margin-bottom: 20px;
      a { color: var(--wm-primary); text-decoration: none; &:hover { text-decoration: underline; } }
      mat-icon { font-size: 16px; width: 16px; height: 16px; }
    }

    .apt-detail-header {
      display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 28px;
    }
    .adh-meta {
      display: flex; align-items: center; gap: 8px; margin-top: 10px; flex-wrap: wrap;
    }
    .adh-sep { color: var(--wm-border-strong); }
    .adh-info {
      display: inline-flex; align-items: center; gap: 4px;
      font-size: var(--fs-sm); color: var(--wm-muted);
      mat-icon { font-size: 15px; width: 15px; height: 15px; }
    }
    .adh-actions { display: flex; gap: 10px; flex-wrap: wrap; }

    /* Workflow Steps */
    .workflow-steps {
      display: flex; align-items: center;
      background: var(--wm-surface); border: 1px solid var(--wm-border-light);
      border-radius: var(--r-xl); padding: 20px 28px; margin-bottom: 28px;
      box-shadow: var(--sh-card); overflow-x: auto;
    }
    .ws-step { display: flex; flex-direction: column; align-items: center; gap: 6px; min-width: 80px; }
    .ws-icon {
      width: 36px; height: 36px; border-radius: 50%;
      background: var(--wm-bg-soft); border: 2px solid var(--wm-border);
      display: flex; align-items: center; justify-content: center;
      mat-icon { font-size: 16px; width: 16px; height: 16px; color: var(--wm-muted-light); }
      &.done { background: var(--wm-success-light); border-color: var(--wm-success-border); mat-icon { color: var(--wm-success); } }
      &.active { background: var(--wm-primary); border-color: var(--wm-primary); box-shadow: 0 0 0 4px rgba(0,92,187,0.15); mat-icon { color: white; } }
    }
    .ws-label { font-size: var(--fs-xs); font-weight: 600; color: var(--wm-text); text-align: center; }
    .ws-date  { font-size: 10px; color: var(--wm-muted-light); }
    .ws-line { flex: 1; height: 2px; background: var(--wm-border-light); min-width: 40px; margin: 0 4px; &.done { background: var(--wm-success-mid); } }

    /* Detail grid */
    .detail-grid { display: grid; grid-template-columns: 1fr 360px; gap: 24px; align-items: start; }
    .detail-left, .detail-right { display: flex; flex-direction: column; }
    .mt-5 { margin-top: 20px; }
    .see-all {
      display: inline-flex; align-items: center; gap: 3px;
      font-size: var(--fs-sm); font-weight: 600; color: var(--wm-primary); text-decoration: none;
      mat-icon { font-size: 14px; width: 14px; height: 14px; }
    }

    /* Patient detail card */
    .patient-detail-card { display: flex; gap: 20px; padding: 20px 24px; }
    .pdc-body { flex: 1; }
    .pdc-name { font-size: var(--fs-xl); font-weight: 700; color: var(--wm-text-strong); }
    .pdc-ref  { font-size: var(--fs-xs); color: var(--wm-muted-light); font-family: var(--wm-font-mono); margin: 4px 0 14px; }
    .pdc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .pdc-label { font-size: var(--fs-xs); font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--wm-muted); margin-bottom: 3px; }
    .pdc-value { font-size: var(--fs-sm); font-weight: 500; color: var(--wm-text); }

    /* Info grid */
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
    .info-item {
      padding: 14px 24px;
      border-bottom: 1px solid var(--wm-border-light);
      border-right: 1px solid var(--wm-border-light);
      &:nth-child(even) { border-right: none; }
      &:nth-last-child(-n+2) { border-bottom: none; }
    }
    .info-label { font-size: var(--fs-xs); font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--wm-muted); margin-bottom: 4px; }
    .info-value { font-size: var(--fs-sm); font-weight: 500; color: var(--wm-text); }

    .reason-text { font-size: var(--fs-sm); color: var(--wm-text-secondary); line-height: 1.7; margin: 0; }

    /* Doctor card */
    .doctor-card { display: flex; gap: 16px; padding: 20px 24px; }
    .dc-body { flex: 1; }
    .dc-name { font-size: var(--fs-lg); font-weight: 700; color: var(--wm-text-strong); }
    .dc-spec { font-size: var(--fs-sm); color: var(--wm-teal); font-weight: 600; margin: 2px 0; }
    .dc-service { font-size: var(--fs-sm); color: var(--wm-muted); margin-bottom: 10px; }
    .dc-contact {
      display: flex; flex-direction: column; gap: 4px;
      span { display: inline-flex; align-items: center; gap: 5px; font-size: var(--fs-sm); color: var(--wm-muted); mat-icon { font-size: 14px; width: 14px; height: 14px; } }
    }

    /* Related list */
    .related-list { padding: 8px 0; }
    .rel-item {
      display: flex; align-items: center; gap: 12px;
      padding: 12px 24px; border-bottom: 1px solid var(--wm-border-light);
      &:last-child { border-bottom: none; }
    }
    .rel-icon { width: 34px; height: 34px; border-radius: var(--r-md); display: flex; align-items: center; justify-content: center; flex-shrink: 0; mat-icon { font-size: 16px; width: 16px; height: 16px; } }
    .rel-body { flex: 1; }
    .rel-title { font-size: var(--fs-sm); font-weight: 600; color: var(--wm-text); }
    .rel-date  { font-size: var(--fs-xs); color: var(--wm-muted); }

    @media (max-width: 1200px) { .detail-grid { grid-template-columns: 1fr; } }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppointmentDetailComponent {
  readonly apt = {
    statusClass: 'approved',
  };

  readonly aptInfo = [
    { label: 'Reference',     value: 'APT-2025-0489' },
    { label: 'Service',       value: 'Cardiology' },
    { label: 'Doctor',        value: 'Dr. Éric Fontaine' },
    { label: 'Date',          value: 'Tuesday, April 29, 2025' },
    { label: 'Time',          value: '10:30 – 11:00 AM' },
    { label: 'Location',      value: 'Room 3B, Building A' },
    { label: 'Type',          value: 'Follow-up Consultation' },
    { label: 'Created By',    value: 'Patient (self-service)' },
    { label: 'Created On',    value: 'April 20, 2025 at 14:23' },
    { label: 'Approved By',   value: 'Dr. Éric Fontaine' },
  ];

  readonly activityLog = [
    { time: 'Apr 21, 11:05', title: 'Appointment Approved',       body: 'Dr. Éric Fontaine confirmed the appointment.',      color: 'var(--wm-teal)' },
    { time: 'Apr 21, 09:11', title: 'Pending Review',             body: 'Appointment forwarded to doctor for approval.',     color: 'var(--wm-warning-mid)' },
    { time: 'Apr 20, 14:23', title: 'Appointment Requested',      body: 'Patient Marie Dupont submitted booking request.',   color: 'var(--wm-primary)' },
  ];

  readonly relatedConsults = [
    { title: 'Cardiology Consultation',   date: 'Apr 10, 2025', bg: 'var(--wm-primary-light)', color: 'var(--wm-primary)' },
    { title: 'Cardiology Consultation',   date: 'Jan 15, 2025', bg: 'var(--wm-teal-light)',    color: 'var(--wm-teal)' },
    { title: 'Annual Health Check-up',    date: 'Oct 5, 2024',  bg: 'var(--wm-success-light)', color: 'var(--wm-success)' },
  ];
}
