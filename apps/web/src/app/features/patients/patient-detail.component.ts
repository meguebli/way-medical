import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'wm-patient-detail',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, MatIconModule, MatButtonModule],
  template: `
<div class="wm-page">
  <!-- Breadcrumb -->
  <div class="breadcrumb">
    <a routerLink="/patients">Patients</a>
    <mat-icon>chevron_right</mat-icon>
    <span>Marie Dupont</span>
  </div>

  <!-- Patient Hero -->
  <div class="patient-hero">
    <div class="ph-avatar">
      <div class="avatar avatar-xl" style="background:var(--wm-primary-light);color:var(--wm-primary)">MD</div>
      <div class="status-indicator active"></div>
    </div>
    <div class="ph-info">
      <div class="ph-name">Marie Dupont</div>
      <div class="ph-ref">PAT-00124</div>
      <div class="ph-meta">
        <span><mat-icon>cake</mat-icon> March 14, 1978 · 47 years old</span>
        <span><mat-icon>person</mat-icon> Female</span>
        <span class="blood-type">A+</span>
        <span class="badge badge-danger" style="font-size:11px"><mat-icon style="font-size:11px;width:11px;height:11px">warning</mat-icon>Penicillin allergy</span>
      </div>
    </div>
    <div class="ph-actions">
      <a routerLink="/appointments/new" mat-raised-button color="primary">
        <mat-icon>event_available</mat-icon> Book Appointment
      </a>
      <a routerLink="/consultations/new" mat-stroked-button>
        <mat-icon>stethoscope</mat-icon> New Consultation
      </a>
      <a routerLink="/patients/1/edit" mat-stroked-button>
        <mat-icon>edit</mat-icon> Edit
      </a>
    </div>
  </div>

  <!-- Quick KPIs -->
  <div class="wm-grid-4 kpi-row">
    <div class="kpi-card" *ngFor="let k of patientKpis">
      <div class="kpi-icon" [style.background]="k.bg">
        <mat-icon [style.color]="k.color">{{ k.icon }}</mat-icon>
      </div>
      <div class="kpi-value">{{ k.value }}</div>
      <div class="kpi-label">{{ k.label }}</div>
      <div class="kpi-accent-bar" [style.background]="k.color"></div>
    </div>
  </div>

  <!-- Tabs -->
  <div class="wm-tabs" style="margin-bottom:24px">
    <button *ngFor="let t of tabs; let i = index"
      class="wm-tab" [class.active]="activeTab() === i"
      (click)="activeTab.set(i)">
      {{ t }}
    </button>
  </div>

  <!-- ── TAB 0: Overview ──────────────────────────────────────── -->
  <div *ngIf="activeTab() === 0" class="tab-grid">
    <div class="tab-main">

      <!-- Patient Info Card -->
      <div class="wm-card">
        <div class="wm-card-header">
          <div class="wm-section-title">Personal Information</div>
        </div>
        <div class="info-grid-2">
          <div class="ig-item" *ngFor="let f of personalInfo">
            <div class="ig-label">{{ f.label }}</div>
            <div class="ig-value">{{ f.value }}</div>
          </div>
        </div>
      </div>

      <!-- Medical History Timeline -->
      <div class="wm-card mt-5">
        <div class="wm-card-header">
          <div class="wm-section-title">Medical History</div>
          <a routerLink="/consultations" class="see-all">All consultations <mat-icon>arrow_forward</mat-icon></a>
        </div>
        <div class="wm-card-body">
          <div class="wm-timeline">
            <div class="timeline-item" *ngFor="let h of medicalHistory">
              <div class="timeline-dot" [style.background]="h.color"></div>
              <div class="timeline-time">{{ h.date }}</div>
              <div class="timeline-title">{{ h.title }}</div>
              <div class="timeline-body">{{ h.body }}</div>
              <div class="history-tags">
                <span class="chip" *ngFor="let t of h.tags">{{ t }}</span>
                <span class="badge" [class]="'badge-' + h.statusClass">{{ h.status }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="tab-side">
      <!-- Emergency Contact -->
      <div class="wm-card">
        <div class="wm-card-header">
          <div class="wm-section-title">Emergency Contact</div>
        </div>
        <div class="wm-card-body">
          <div class="ec-card">
            <div class="avatar avatar-md" style="background:var(--wm-warning-light);color:var(--wm-warning)">PD</div>
            <div class="ec-info">
              <div class="ec-name">Paul Dupont</div>
              <div class="ec-rel">Spouse</div>
              <div class="ec-phone">+33 6 98 76 54 32</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Insurance -->
      <div class="wm-card mt-5">
        <div class="wm-card-header">
          <div class="wm-section-title">Insurance</div>
        </div>
        <div class="wm-card-body">
          <div class="ins-grid">
            <div class="ins-item" *ngFor="let i of insuranceInfo">
              <div class="ig-label">{{ i.label }}</div>
              <div class="ig-value">{{ i.value }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Allergies & Conditions -->
      <div class="wm-card mt-5">
        <div class="wm-card-header">
          <div class="wm-section-title">Clinical Flags</div>
        </div>
        <div class="wm-card-body">
          <div class="flags-section">
            <div class="flags-label">Allergies</div>
            <div class="flags-list">
              <span class="badge badge-danger">Penicillin</span>
              <span class="badge badge-warning">Latex (mild)</span>
            </div>
          </div>
          <div class="wm-divider"></div>
          <div class="flags-section">
            <div class="flags-label">Chronic Conditions</div>
            <div class="flags-list">
              <span class="chip">Hypertension</span>
              <span class="chip">Hypercholesterolaemia</span>
            </div>
          </div>
          <div class="wm-divider"></div>
          <div class="flags-section">
            <div class="flags-label">Blood Type</div>
            <div class="blood-type-badge">A+</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ── TAB 1: Appointments ──────────────────────────────────── -->
  <div *ngIf="activeTab() === 1" class="wm-table-wrap">
    <table class="wm-table">
      <thead><tr><th>Date</th><th>Service</th><th>Doctor</th><th>Status</th><th></th></tr></thead>
      <tbody>
        <tr *ngFor="let a of appointments">
          <td><div class="td-primary">{{ a.date }}</div><div style="font-size:var(--fs-xs);color:var(--wm-muted)">{{ a.time }}</div></td>
          <td class="td-primary">{{ a.service }}</td>
          <td>{{ a.doctor }}</td>
          <td><span class="badge" [class]="'badge-' + a.statusClass"><span class="badge-dot"></span>{{ a.status }}</span></td>
          <td><a [routerLink]="'/appointments/' + a.id" mat-icon-button><mat-icon>visibility</mat-icon></a></td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ── TAB 2: Treatments ────────────────────────────────────── -->
  <div *ngIf="activeTab() === 2">
    <div class="treatments-full">
      <div class="trf-item" *ngFor="let t of treatments">
        <div class="trf-icon" [style.background]="t.bg">
          <mat-icon [style.color]="t.color">medication</mat-icon>
        </div>
        <div class="trf-body">
          <div class="trf-name">{{ t.name }}</div>
          <div class="trf-details">{{ t.dose }} · {{ t.freq }} · Started {{ t.started }}</div>
          <div class="trf-progress">
            <div class="wm-progress" style="max-width:200px">
              <div class="wm-progress-fill" [style.width]="t.progress + '%'" [style.background]="t.color"></div>
            </div>
            <span style="font-size:var(--fs-xs);color:var(--wm-muted)">{{ t.progress }}% complete · {{ t.remaining }}</span>
          </div>
        </div>
        <div class="trf-right">
          <span class="badge badge-active">Active</span>
          <div style="font-size:var(--fs-xs);color:var(--wm-muted);text-align:right;margin-top:4px">By {{ t.prescribedBy }}</div>
        </div>
      </div>
    </div>
  </div>

  <!-- ── TAB 3: Documents ─────────────────────────────────────── -->
  <div *ngIf="activeTab() === 3">
    <div class="docs-full">
      <div class="doc-full-item" *ngFor="let d of documents">
        <div class="dfi-icon" [style.background]="d.bg">
          <mat-icon [style.color]="d.color">{{ d.icon }}</mat-icon>
        </div>
        <div class="dfi-body">
          <div class="dfi-name">{{ d.name }}</div>
          <div class="dfi-meta">{{ d.date }} · {{ d.doctor }}</div>
        </div>
        <span class="chip">{{ d.type }}</span>
        <button mat-icon-button><mat-icon>download</mat-icon></button>
        <button mat-icon-button><mat-icon>visibility</mat-icon></button>
      </div>
    </div>
  </div>
</div>
  `,
  styles: [`
    .breadcrumb {
      display: flex; align-items: center; gap: 4px; font-size: var(--fs-sm); color: var(--wm-muted); margin-bottom: 20px;
      a { color: var(--wm-primary); text-decoration: none; }
      mat-icon { font-size: 16px; width: 16px; height: 16px; }
    }

    .patient-hero {
      background: var(--wm-surface); border: 1px solid var(--wm-border-light); border-radius: var(--r-xl);
      padding: 24px; display: flex; align-items: center; gap: 24px; margin-bottom: 24px; box-shadow: var(--sh-card);
    }
    .ph-avatar { position: relative; }
    .status-indicator {
      position: absolute; bottom: 2px; right: 2px; width: 14px; height: 14px; border-radius: 50%;
      border: 2px solid white; &.active { background: var(--wm-success-mid); }
    }
    .ph-info { flex: 1; }
    .ph-name { font-size: var(--fs-3xl); font-weight: 800; color: var(--wm-text-strong); letter-spacing: -0.02em; }
    .ph-ref  { font-size: var(--fs-sm); color: var(--wm-muted-light); font-family: var(--wm-font-mono); margin: 3px 0 10px; }
    .ph-meta {
      display: flex; align-items: center; gap: 14px; flex-wrap: wrap;
      span { display: inline-flex; align-items: center; gap: 4px; font-size: var(--fs-sm); color: var(--wm-muted); mat-icon { font-size: 14px; width: 14px; height: 14px; } }
    }
    .blood-type {
      display: inline-flex; align-items: center; justify-content: center;
      width: 30px; height: 30px; border-radius: 50%; background: var(--wm-danger-light); color: var(--wm-danger);
      font-weight: 800; font-size: var(--fs-xs); border: 1.5px solid var(--wm-danger-border);
    }
    .ph-actions { display: flex; gap: 10px; flex-wrap: wrap; }

    .kpi-row { margin-bottom: 24px; }
    .mt-5 { margin-top: 20px; }
    .see-all {
      display: inline-flex; align-items: center; gap: 3px; font-size: var(--fs-sm); font-weight: 600; color: var(--wm-primary); text-decoration: none;
      mat-icon { font-size: 14px; width: 14px; height: 14px; }
    }

    /* Tab content */
    .tab-grid { display: grid; grid-template-columns: 1fr 320px; gap: 24px; align-items: start; }
    .tab-main, .tab-side { display: flex; flex-direction: column; gap: 0; }

    .info-grid-2 { display: grid; grid-template-columns: 1fr 1fr; }
    .ig-item {
      padding: 14px 24px; border-bottom: 1px solid var(--wm-border-light); border-right: 1px solid var(--wm-border-light);
      &:nth-child(even) { border-right: none; }
      &:nth-last-child(-n+2) { border-bottom: none; }
    }
    .ig-label { font-size: var(--fs-xs); font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--wm-muted); margin-bottom: 4px; }
    .ig-value { font-size: var(--fs-sm); font-weight: 500; color: var(--wm-text); }

    .history-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px; }

    .ec-card { display: flex; gap: 14px; align-items: center; }
    .ec-info {}
    .ec-name  { font-size: var(--fs-md); font-weight: 700; color: var(--wm-text); }
    .ec-rel   { font-size: var(--fs-xs); color: var(--wm-muted); margin: 2px 0; }
    .ec-phone { font-size: var(--fs-sm); color: var(--wm-primary); font-weight: 500; }

    .ins-grid { display: flex; flex-direction: column; gap: 10px; }
    .ins-item {}

    .flags-section { margin-bottom: 14px; &:last-child { margin-bottom: 0; } }
    .flags-label { font-size: var(--fs-xs); font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; color: var(--wm-muted); margin-bottom: 8px; }
    .flags-list { display: flex; gap: 6px; flex-wrap: wrap; }
    .blood-type-badge {
      display: inline-flex; align-items: center; justify-content: center;
      width: 36px; height: 36px; border-radius: 50%; background: var(--wm-danger-light); color: var(--wm-danger);
      font-weight: 800; font-size: var(--fs-sm); border: 2px solid var(--wm-danger-border);
    }

    .treatments-full { display: flex; flex-direction: column; gap: 12px; }
    .trf-item {
      display: flex; align-items: center; gap: 16px;
      background: var(--wm-surface); border: 1px solid var(--wm-border-light);
      border-radius: var(--r-xl); padding: 20px; box-shadow: var(--sh-card);
    }
    .trf-icon { width: 44px; height: 44px; border-radius: var(--r-lg); display: flex; align-items: center; justify-content: center; flex-shrink: 0; mat-icon { font-size: 22px; width: 22px; height: 22px; } }
    .trf-body { flex: 1; }
    .trf-name { font-size: var(--fs-md); font-weight: 700; color: var(--wm-text); margin-bottom: 4px; }
    .trf-details { font-size: var(--fs-sm); color: var(--wm-muted); margin-bottom: 8px; }
    .trf-progress { display: flex; align-items: center; gap: 10px; }
    .trf-right { text-align: right; flex-shrink: 0; }

    .docs-full { display: flex; flex-direction: column; gap: 10px; }
    .doc-full-item {
      display: flex; align-items: center; gap: 14px;
      background: var(--wm-surface); border: 1px solid var(--wm-border-light);
      border-radius: var(--r-xl); padding: 16px 20px; box-shadow: var(--sh-card);
      transition: box-shadow var(--tr); &:hover { box-shadow: var(--sh-md); }
    }
    .dfi-icon { width: 40px; height: 40px; border-radius: var(--r-lg); display: flex; align-items: center; justify-content: center; flex-shrink: 0; mat-icon { font-size: 20px; width: 20px; height: 20px; } }
    .dfi-body { flex: 1; }
    .dfi-name { font-size: var(--fs-sm); font-weight: 600; color: var(--wm-text); }
    .dfi-meta { font-size: var(--fs-xs); color: var(--wm-muted); margin-top: 2px; }

    @media (max-width: 1200px) { .tab-grid { grid-template-columns: 1fr; } }
    @media (max-width: 768px) { .patient-hero { flex-direction: column; align-items: flex-start; } }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientDetailComponent {
  readonly activeTab = signal(0);
  readonly tabs = ['Overview', 'Appointments', 'Treatments', 'Documents'];

  readonly patientKpis = [
    { icon: 'event',        label: 'Total Appointments', value: '18',  bg: 'var(--wm-primary-light)', color: 'var(--wm-primary)' },
    { icon: 'stethoscope',  label: 'Consultations',      value: '12',  bg: 'var(--wm-teal-light)',    color: 'var(--wm-teal)' },
    { icon: 'medication',   label: 'Active Treatments',  value: '2',   bg: 'var(--wm-success-light)', color: 'var(--wm-success)' },
    { icon: 'folder_open',  label: 'Documents',          value: '9',   bg: 'var(--wm-warning-light)', color: 'var(--wm-warning)' },
  ];

  readonly personalInfo = [
    { label: 'Full Name',          value: 'Marie Dupont' },
    { label: 'Date of Birth',      value: 'March 14, 1978' },
    { label: 'Age',                value: '47 years old' },
    { label: 'Gender',             value: 'Female' },
    { label: 'National ID',        value: '278031234567890' },
    { label: 'Blood Type',         value: 'A+' },
    { label: 'Phone',              value: '+33 6 12 34 56 78' },
    { label: 'Email',              value: 'marie.dupont@mail.fr' },
    { label: 'Address',            value: '14 Rue de la Paix, 75001 Paris' },
    { label: 'Marital Status',     value: 'Married' },
    { label: 'Occupation',         value: 'Accountant' },
    { label: 'Patient Since',      value: 'January 12, 2019' },
  ];

  readonly insuranceInfo = [
    { label: 'Provider',       value: 'CPAM Île-de-France' },
    { label: 'Policy Number',  value: 'CPM-00124-FR' },
    { label: 'Coverage',       value: '70% (Social Security)' },
    { label: 'Mutual',         value: 'AXA Santé — 30%' },
    { label: 'Valid Until',    value: 'December 31, 2025' },
  ];

  readonly medicalHistory = [
    { date: 'April 10, 2025', title: 'Cardiology Consultation', body: 'ECG performed, ST changes monitored. Blood pressure elevated — dosage of Amlodipine increased to 10mg.', color: 'var(--wm-primary)', tags: ['ECG', 'Hypertension'], status: 'Completed', statusClass: 'completed' },
    { date: 'March 3, 2025',  title: 'Respiratory Consultation', body: 'Acute bronchitis diagnosed. 7-day antibiotic prescribed (Amoxicillin). Note: avoid Penicillin derivatives — allergy alert triggered.', color: 'var(--wm-teal)', tags: ['Bronchitis', 'Lab request'], status: 'Completed', statusClass: 'completed' },
    { date: 'January 20, 2025',title: 'Annual Biology Panel', body: 'Full blood panel: cholesterol slightly elevated at 5.8 mmol/L. All other values within normal range. Statin therapy recommended.', color: 'var(--wm-success-mid)', tags: ['Blood panel', 'Cholesterol'], status: 'Archived', statusClass: 'archived' },
    { date: 'October 5, 2024', title: 'Cardiology Annual Review', body: 'Routine check-up. Echocardiogram normal. Continue current treatment plan. Next review in 6 months.', color: 'var(--wm-muted-light)', tags: ['Echo', 'Annual'], status: 'Archived', statusClass: 'archived' },
  ];

  readonly appointments = [
    { id:'1', date:'Apr 29, 2025', time:'10:30 AM', service:'Cardiology Consultation', doctor:'Dr. Fontaine', status:'Approved',  statusClass:'approved' },
    { id:'2', date:'Apr 10, 2025', time:'09:00 AM', service:'Cardiology Consultation', doctor:'Dr. Fontaine', status:'Completed', statusClass:'completed' },
    { id:'3', date:'Mar 3, 2025',  time:'14:30 PM', service:'General Medicine',         doctor:'Dr. Martin',   status:'Completed', statusClass:'completed' },
    { id:'4', date:'Jan 20, 2025', time:'08:45 AM', service:'Laboratory Analysis',      doctor:'Lab Central',  status:'Completed', statusClass:'completed' },
    { id:'5', date:'Oct 5, 2024',  time:'10:00 AM', service:'Cardiology Annual Review', doctor:'Dr. Fontaine', status:'Completed', statusClass:'completed' },
  ];

  readonly treatments = [
    { name:'Amlodipine 10mg',    dose:'1 tablet', freq:'Every morning',  started:'Mar 1, 2025', progress:68, remaining:'~32 days', prescribedBy:'Dr. Fontaine', bg:'var(--wm-primary-light)', color:'var(--wm-primary)' },
    { name:'Atorvastatin 20mg',  dose:'1 tablet', freq:'Every evening',  started:'Jan 20, 2025',progress:45, remaining:'~55 days', prescribedBy:'Dr. Fontaine', bg:'var(--wm-teal-light)',   color:'var(--wm-teal)' },
  ];

  readonly documents = [
    { name:'Blood Test Results – April 2025',  date:'Apr 10, 2025', doctor:'Lab Central',  type:'Lab Report',   icon:'science',    bg:'var(--wm-teal-light)',   color:'var(--wm-teal)' },
    { name:'Cardiology ECG Report',            date:'Apr 10, 2025', doctor:'Dr. Fontaine', type:'Cardiology',   icon:'favorite',   bg:'var(--wm-danger-light)', color:'var(--wm-danger)' },
    { name:'Prescription – Amlodipine 10mg',   date:'Apr 10, 2025', doctor:'Dr. Fontaine', type:'Prescription', icon:'receipt_long',bg:'var(--wm-primary-light)',color:'var(--wm-primary)' },
    { name:'Chest X-Ray Imaging Report',       date:'Mar 3, 2025',  doctor:'Dr. Leblanc',  type:'Imaging',      icon:'radiology',  bg:'var(--wm-success-light)',color:'var(--wm-success)' },
    { name:'Annual Biology Panel Report',      date:'Jan 20, 2025', doctor:'Lab Central',  type:'Lab Report',   icon:'science',    bg:'var(--wm-teal-light)',   color:'var(--wm-teal)' },
  ];
}
