import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'wm-consultation-detail',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, MatIconModule, MatButtonModule],
  template: `
<div class="wm-page">
  <div class="breadcrumb">
    <a routerLink="/consultations">Consultations</a>
    <mat-icon>chevron_right</mat-icon>
    <span>CON-2025-0156</span>
  </div>

  <!-- Header -->
  <div class="consult-detail-header">
    <div>
      <p class="wm-eyebrow">Consultation Record</p>
      <h1 class="wm-page-title">Cardiology Consultation</h1>
      <div class="cdh-meta">
        <span class="badge badge-completed"><span class="badge-dot"></span>Completed</span>
        <span class="cdh-info"><mat-icon>event</mat-icon>April 10, 2025 · 09:00 – 09:45 AM</span>
        <span class="cdh-info"><mat-icon>person</mat-icon>Dr. Éric Fontaine</span>
        <span class="cdh-info"><mat-icon>medical_services</mat-icon>Cardiology</span>
      </div>
    </div>
    <div style="display:flex;gap:10px">
      <button mat-stroked-button><mat-icon>print</mat-icon> Print</button>
      <button mat-stroked-button><mat-icon>share</mat-icon> Share</button>
      <button mat-raised-button color="primary"><mat-icon>receipt_long</mat-icon> Generate Summary</button>
    </div>
  </div>

  <!-- Patient Banner -->
  <div class="patient-mini-banner">
    <div class="avatar avatar-md" style="background:var(--wm-primary-light);color:var(--wm-primary)">MD</div>
    <div style="flex:1">
      <div style="font-weight:700;color:var(--wm-text)">Marie Dupont</div>
      <div style="font-size:var(--fs-xs);color:var(--wm-muted)">PAT-00124 · Female · 47 y/o · A+ · Penicillin allergy</div>
    </div>
    <a routerLink="/patients/1" class="see-all">Patient record <mat-icon>arrow_forward</mat-icon></a>
  </div>

  <!-- Tabs -->
  <div class="wm-tabs" style="margin-bottom:24px">
    <button *ngFor="let t of tabs; let i = index" class="wm-tab" [class.active]="activeTab() === i" (click)="activeTab.set(i)">{{ t }}</button>
  </div>

  <!-- TAB 0: Clinical Summary -->
  <div *ngIf="activeTab() === 0">
    <div class="summary-grid">

      <!-- Vital Signs -->
      <div class="wm-card">
        <div class="wm-card-header">
          <div class="wm-section-title">Vital Signs</div>
          <span style="font-size:var(--fs-xs);color:var(--wm-muted)">Recorded at 09:02 AM</span>
        </div>
        <div class="vitals-grid">
          <div class="vital-item" *ngFor="let v of vitals">
            <div class="vi-icon" [style.background]="v.bg">
              <mat-icon [style.color]="v.color">{{ v.icon }}</mat-icon>
            </div>
            <div class="vi-val" [style.color]="v.flagged ? 'var(--wm-warning)' : 'var(--wm-text-strong)'">{{ v.value }}</div>
            <div class="vi-unit">{{ v.unit }}</div>
            <div class="vi-label">{{ v.label }}</div>
            <div class="vi-flag" *ngIf="v.flagged">
              <mat-icon style="font-size:12px;width:12px;height:12px;color:var(--wm-warning)">warning</mat-icon>
              <span>{{ v.flagText }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Diagnosis -->
      <div class="wm-card">
        <div class="wm-card-header"><div class="wm-section-title">Diagnosis</div></div>
        <div class="wm-card-body">
          <div class="diagnosis-list">
            <div class="diag-item" *ngFor="let d of diagnoses" [class.primary]="d.primary">
              <div class="diag-badge" [class.prim]="d.primary">{{ d.primary ? 'Primary' : 'Secondary' }}</div>
              <div class="diag-code">{{ d.code }}</div>
              <div class="diag-label">{{ d.label }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Clinical Notes -->
      <div class="wm-card" style="grid-column:span 2">
        <div class="wm-card-header"><div class="wm-section-title">Clinical Notes</div></div>
        <div class="clinical-notes">
          <div class="cn-section" *ngFor="let s of clinicalNotes">
            <div class="cn-title">{{ s.title }}</div>
            <div class="cn-body">{{ s.body }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- TAB 1: Medical Acts -->
  <div *ngIf="activeTab() === 1">
    <div class="wm-table-wrap">
      <table class="wm-table">
        <thead><tr><th>Code</th><th>Act Description</th><th>Type</th><th>Fee</th><th>Performed By</th></tr></thead>
        <tbody>
          <tr *ngFor="let a of medicalActs">
            <td><span class="td-mono">{{ a.code }}</span></td>
            <td class="td-primary">{{ a.name }}</td>
            <td><span class="chip">{{ a.type }}</span></td>
            <td class="td-primary">€{{ a.fee }}</td>
            <td>{{ a.by }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" style="text-align:right;font-weight:700;padding:14px 16px;color:var(--wm-muted)">Total</td>
            <td style="font-weight:800;font-size:var(--fs-lg);color:var(--wm-primary);padding:14px 16px">€{{ totalFees }}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>

  <!-- TAB 2: Prescriptions -->
  <div *ngIf="activeTab() === 2">
    <div class="rx-cards">
      <div class="rx-card" *ngFor="let rx of prescriptions">
        <div class="rxc-header">
          <mat-icon class="rx-icon">medication</mat-icon>
          <div class="rxc-name">{{ rx.name }}</div>
          <span class="badge badge-active">Active</span>
        </div>
        <div class="rxc-body">
          <div class="rxc-row"><span>Dose</span><strong>{{ rx.dose }}</strong></div>
          <div class="rxc-row"><span>Frequency</span><strong>{{ rx.freq }}</strong></div>
          <div class="rxc-row"><span>Duration</span><strong>{{ rx.duration }}</strong></div>
          <div class="rxc-row"><span>Instructions</span><strong>{{ rx.instructions }}</strong></div>
        </div>
      </div>
    </div>
  </div>

  <!-- TAB 3: Lab & Imaging -->
  <div *ngIf="activeTab() === 3">
    <div class="wm-grid-2">
      <div class="wm-card">
        <div class="wm-card-header"><div class="wm-section-title">Lab Analysis</div></div>
        <div class="lab-results">
          <div class="lr-item" *ngFor="let l of labResults">
            <div class="lr-test">{{ l.test }}</div>
            <div class="lr-val" [class.abnormal]="l.abnormal">{{ l.value }} <span>{{ l.unit }}</span></div>
            <div class="lr-ref">Ref: {{ l.ref }}</div>
            <span *ngIf="l.abnormal" class="badge badge-warning">Abnormal</span>
            <span *ngIf="!l.abnormal" class="badge badge-success">Normal</span>
          </div>
        </div>
      </div>
      <div class="wm-card">
        <div class="wm-card-header"><div class="wm-section-title">Imaging Results</div></div>
        <div class="wm-empty" style="padding:32px">
          <mat-icon class="empty-icon">radiology</mat-icon>
          <div class="empty-title">No imaging requested</div>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
  styles: [`
    .breadcrumb { display: flex; align-items: center; gap: 4px; font-size: var(--fs-sm); color: var(--wm-muted); margin-bottom: 20px; a { color: var(--wm-primary); text-decoration: none; } mat-icon { font-size: 16px; width: 16px; height: 16px; } }

    .consult-detail-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 20px; }
    .cdh-meta { display: flex; align-items: center; gap: 12px; margin-top: 10px; flex-wrap: wrap; }
    .cdh-info { display: inline-flex; align-items: center; gap: 4px; font-size: var(--fs-sm); color: var(--wm-muted); mat-icon { font-size: 15px; width: 15px; height: 15px; } }

    .patient-mini-banner {
      display: flex; align-items: center; gap: 14px;
      background: var(--wm-surface); border: 1px solid var(--wm-border-light); border-radius: var(--r-xl);
      padding: 14px 20px; margin-bottom: 24px; box-shadow: var(--sh-card);
    }
    .see-all { display: inline-flex; align-items: center; gap: 3px; font-size: var(--fs-sm); font-weight: 600; color: var(--wm-primary); text-decoration: none; mat-icon { font-size: 14px; width: 14px; height: 14px; } }

    /* Summary grid */
    .summary-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

    /* Vitals */
    .vitals-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; padding: 20px 24px; }
    .vital-item { background: var(--wm-bg-soft); border: 1px solid var(--wm-border-light); border-radius: var(--r-lg); padding: 14px; }
    .vi-icon { width: 32px; height: 32px; border-radius: var(--r-md); display: flex; align-items: center; justify-content: center; margin-bottom: 10px; mat-icon { font-size: 16px; width: 16px; height: 16px; } }
    .vi-val  { font-size: var(--fs-xl); font-weight: 800; line-height: 1; letter-spacing: -0.02em; }
    .vi-unit { font-size: var(--fs-xs); color: var(--wm-muted); }
    .vi-label{ font-size: var(--fs-xs); color: var(--wm-muted); margin-top: 4px; }
    .vi-flag { display: flex; align-items: center; gap: 3px; font-size: 10px; color: var(--wm-warning); margin-top: 4px; font-weight: 600; }

    /* Diagnosis */
    .diagnosis-list { display: flex; flex-direction: column; gap: 12px; }
    .diag-item { display: flex; align-items: center; gap: 12px; }
    .diag-badge {
      font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em;
      padding: 2px 8px; border-radius: var(--r-full); background: var(--wm-bg-soft); color: var(--wm-muted); border: 1px solid var(--wm-border); white-space: nowrap;
      &.prim { background: var(--wm-primary-light); color: var(--wm-primary); border-color: var(--wm-primary); }
    }
    .diag-code  { font-family: var(--wm-font-mono); font-size: var(--fs-sm); font-weight: 700; color: var(--wm-primary); min-width: 60px; }
    .diag-label { font-size: var(--fs-sm); color: var(--wm-text); }

    /* Clinical notes */
    .clinical-notes { padding: 20px 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .cn-title { font-size: var(--fs-xs); font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; color: var(--wm-primary); margin-bottom: 8px; padding-bottom: 6px; border-bottom: 1px solid var(--wm-primary-light); }
    .cn-body  { font-size: var(--fs-sm); color: var(--wm-text-secondary); line-height: 1.7; }

    /* Prescriptions */
    .rx-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
    .rx-card { background: var(--wm-surface); border: 1px solid var(--wm-border-light); border-radius: var(--r-xl); overflow: hidden; box-shadow: var(--sh-card); }
    .rxc-header { display: flex; align-items: center; gap: 10px; padding: 16px 20px; background: var(--wm-primary-subtle); border-bottom: 1px solid var(--wm-primary-light); }
    .rx-icon { font-size: 20px; width: 20px; height: 20px; color: var(--wm-primary); }
    .rxc-name { flex: 1; font-size: var(--fs-md); font-weight: 700; color: var(--wm-primary-strong); }
    .rxc-body { padding: 16px 20px; display: flex; flex-direction: column; gap: 8px; }
    .rxc-row { display: flex; justify-content: space-between; font-size: var(--fs-sm); color: var(--wm-muted); strong { color: var(--wm-text); } }

    /* Lab results */
    .lab-results { padding: 8px 0; }
    .lr-item {
      display: flex; align-items: center; gap: 12px; padding: 12px 24px;
      border-bottom: 1px solid var(--wm-border-light); &:last-child { border-bottom: none; }
    }
    .lr-test { flex: 1; font-size: var(--fs-sm); font-weight: 600; color: var(--wm-text); }
    .lr-val {
      font-size: var(--fs-md); font-weight: 800; color: var(--wm-text-strong); min-width: 80px; text-align: right;
      span { font-size: var(--fs-xs); font-weight: 400; color: var(--wm-muted); }
      &.abnormal { color: var(--wm-warning); }
    }
    .lr-ref { font-size: var(--fs-xs); color: var(--wm-muted-light); min-width: 100px; text-align: right; }

    @media (max-width: 1100px) { .summary-grid { grid-template-columns: 1fr; } .clinical-notes { grid-template-columns: 1fr; } }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsultationDetailComponent {
  readonly activeTab = signal(0);
  readonly tabs = ['Clinical Summary', 'Medical Acts', 'Prescriptions', 'Lab & Imaging'];

  readonly vitals = [
    { icon: 'thermostat',      label: 'Temperature',   value: '37.1', unit: '°C',   bg: 'var(--wm-teal-light)',    color: 'var(--wm-teal)',    flagged: false, flagText: '' },
    { icon: 'compress',        label: 'Blood Pressure',value: '148/92',unit: 'mmHg', bg: 'var(--wm-warning-light)', color: 'var(--wm-warning)', flagged: true,  flagText: 'Elevated' },
    { icon: 'favorite',        label: 'Heart Rate',    value: '82',   unit: 'bpm',  bg: 'var(--wm-danger-light)',  color: 'var(--wm-danger)',  flagged: false, flagText: '' },
    { icon: 'monitor_weight',  label: 'Weight',        value: '74.2', unit: 'kg',   bg: 'var(--wm-success-light)', color: 'var(--wm-success)', flagged: false, flagText: '' },
    { icon: 'height',          label: 'Height',        value: '168',  unit: 'cm',   bg: 'var(--wm-primary-light)', color: 'var(--wm-primary)', flagged: false, flagText: '' },
    { icon: 'air',             label: 'SpO₂',          value: '98',   unit: '%',    bg: 'var(--wm-violet-light)',  color: 'var(--wm-violet)',  flagged: false, flagText: '' },
  ];

  readonly diagnoses = [
    { code: 'I10',    label: 'Essential (primary) hypertension',            primary: true },
    { code: 'E78.5',  label: 'Hyperlipidaemia, unspecified',                primary: false },
    { code: 'R00.0',  label: 'Tachycardia, unspecified',                    primary: false },
  ];

  readonly clinicalNotes = [
    { title: 'Chief Complaint',              body: 'Patient reports recurring chest tightness during physical exertion, present for approximately 2 weeks. No syncope. Mild dyspnoea on effort.' },
    { title: 'Physical Examination',         body: 'BP: 148/92 mmHg — elevated. HR: 82 bpm. Auscultation: regular rhythm, no murmurs. No oedema. Good peripheral perfusion.' },
    { title: 'History of Present Illness',   body: 'Patient has history of hypertension managed with Amlodipine 5mg. Last ECG in October showed minor ST changes. Reports current episodes are more frequent than previously. No fever, no cough.' },
    { title: 'Treatment Plan',               body: 'Increase Amlodipine to 10mg OD. Add Atorvastatin 20mg for cholesterol management. ECG performed today — results pending. Follow-up in 3 months or sooner if symptoms worsen. Lifestyle: salt restriction, moderate exercise.' },
  ];

  readonly medicalActs = [
    { code: 'C', name: 'General Consultation', type: 'Consultation', fee: 25, by: 'Dr. Éric Fontaine' },
    { code: 'ECG12', name: '12-Lead ECG', type: 'Procedure', fee: 40, by: 'Nurse Sophie Bernard' },
    { code: 'BIO-LIP', name: 'Lipid Panel Request', type: 'Lab Request', fee: 0, by: 'Dr. Éric Fontaine' },
  ];

  get totalFees(): number { return this.medicalActs.reduce((s, a) => s + a.fee, 0); }

  readonly prescriptions = [
    { name: 'Amlodipine 10mg',   dose: '1 tablet',  freq: 'Every morning',  duration: '90 days', instructions: 'Take with water, same time each day' },
    { name: 'Atorvastatin 20mg', dose: '1 tablet',  freq: 'Every evening',  duration: '90 days', instructions: 'Avoid grapefruit juice' },
  ];

  readonly labResults = [
    { test: 'Total Cholesterol', value: '5.8',  unit: 'mmol/L', ref: '< 5.0',       abnormal: true },
    { test: 'LDL Cholesterol',   value: '3.9',  unit: 'mmol/L', ref: '< 3.0',       abnormal: true },
    { test: 'HDL Cholesterol',   value: '1.2',  unit: 'mmol/L', ref: '> 1.0',       abnormal: false },
    { test: 'Triglycerides',     value: '1.4',  unit: 'mmol/L', ref: '< 1.7',       abnormal: false },
    { test: 'Glucose (fasting)', value: '5.1',  unit: 'mmol/L', ref: '3.9 – 5.5',   abnormal: false },
    { test: 'Haemoglobin',       value: '13.8', unit: 'g/dL',   ref: '12.0 – 16.0', abnormal: false },
  ];
}
