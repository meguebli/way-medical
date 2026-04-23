import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'wm-consultation-form',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, RouterLink, MatIconModule, MatButtonModule],
  template: `
<div class="wm-page">
  <div class="breadcrumb">
    <a routerLink="/consultations">Consultations</a>
    <mat-icon>chevron_right</mat-icon>
    <span>New Consultation</span>
  </div>

  <!-- Patient Header Banner -->
  <div class="consult-banner">
    <div class="cb-patient">
      <div class="avatar avatar-lg" style="background:var(--wm-primary-light);color:var(--wm-primary)">MD</div>
      <div class="cbp-info">
        <div class="cbp-name">Marie Dupont</div>
        <div class="cbp-meta">PAT-00124 · Female · 47 y/o · A+</div>
        <div class="cbp-flags">
          <span class="badge badge-danger" style="font-size:11px">⚠ Penicillin allergy</span>
          <span class="chip">Hypertension</span>
          <span class="chip">Hypercholesterolaemia</span>
        </div>
      </div>
    </div>
    <div class="cb-apt">
      <div class="cba-label">Linked Appointment</div>
      <div class="cba-val">APT-2025-0489 · Cardiology · Apr 29 at 10:30</div>
    </div>
    <div class="cb-status">
      <span class="badge badge-inprogress"><span class="badge-dot"></span>In Progress</span>
    </div>
  </div>

  <!-- Form Layout -->
  <div class="consult-form-layout">

    <!-- Left: Main Form -->
    <div class="form-main">

      <!-- Section 1: Preliminary Measures -->
      <div class="wm-card">
        <div class="wm-card-header">
          <div>
            <div class="wm-section-title">Preliminary Measures</div>
            <div style="font-size:var(--fs-xs);color:var(--wm-muted);margin-top:2px">Record vital signs at start of consultation</div>
          </div>
          <span class="badge badge-inprogress"><span class="badge-dot"></span>Required</span>
        </div>
        <div class="measures-grid">
          <div class="measure-input" *ngFor="let m of measures">
            <div class="mi-icon" [style.background]="m.bg">
              <mat-icon [style.color]="m.color">{{ m.icon }}</mat-icon>
            </div>
            <div class="mi-body">
              <label class="mi-label">{{ m.label }}</label>
              <div class="mi-input-wrap">
                <input type="number" class="mi-input" [placeholder]="m.placeholder" [(ngModel)]="m.value" />
                <span class="mi-unit">{{ m.unit }}</span>
              </div>
              <div class="mi-ref">Ref: {{ m.reference }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section 2: Consultation Notes -->
      <div class="wm-card mt-5">
        <div class="wm-card-header">
          <div class="wm-section-title">Clinical Notes</div>
        </div>
        <div class="notes-form">
          <div class="wm-form-section">
            <div class="wm-form-section-title">Chief Complaint</div>
            <textarea class="form-textarea" rows="2" placeholder="Patient's main complaint in their own words…"></textarea>
          </div>
          <div class="wm-form-section">
            <div class="wm-form-section-title">History of Present Illness</div>
            <textarea class="form-textarea" rows="4" placeholder="Detailed description of the current illness, onset, duration, severity, associated symptoms…"></textarea>
          </div>
          <div class="wm-form-section">
            <div class="wm-form-section-title">Physical Examination</div>
            <textarea class="form-textarea" rows="4" placeholder="Findings from the physical exam — auscultation, palpation, inspection…"></textarea>
          </div>
          <div class="wm-form-section">
            <div class="wm-form-section-title">Assessment / Diagnosis</div>
            <div class="diagnosis-input">
              <div class="wm-search-input">
                <mat-icon>search</mat-icon>
                <input type="text" placeholder="Search ICD-10 code or diagnosis…" />
              </div>
              <div class="diagnosis-tags">
                <div class="dtag" *ngFor="let d of diagnoses">
                  <span class="dtag-code">{{ d.code }}</span>
                  <span class="dtag-label">{{ d.label }}</span>
                  <button class="dtag-remove"><mat-icon>close</mat-icon></button>
                </div>
              </div>
            </div>
          </div>
          <div class="wm-form-section">
            <div class="wm-form-section-title">Treatment Plan</div>
            <textarea class="form-textarea" rows="3" placeholder="Planned interventions, follow-up instructions, lifestyle recommendations…"></textarea>
          </div>
        </div>
      </div>

      <!-- Section 3: Medical Acts -->
      <div class="wm-card mt-5">
        <div class="wm-card-header">
          <div class="wm-section-title">Medical Acts</div>
          <button mat-stroked-button (click)="addAct()"><mat-icon>add</mat-icon> Add Act</button>
        </div>
        <div class="acts-list">
          <div class="act-item" *ngFor="let a of medicalActs; let i = index">
            <div class="act-icon" [style.background]="a.bg">
              <mat-icon [style.color]="a.color">{{ a.icon }}</mat-icon>
            </div>
            <div class="act-body">
              <div class="act-code">{{ a.code }}</div>
              <div class="act-name">{{ a.name }}</div>
            </div>
            <span class="chip">{{ a.type }}</span>
            <span class="act-fee">€{{ a.fee }}</span>
            <button mat-icon-button (click)="removeAct(i)"><mat-icon>delete_outline</mat-icon></button>
          </div>
        </div>
        <div class="acts-total">
          <span>Total Fees</span>
          <span class="at-val">€{{ totalFees }}</span>
        </div>
      </div>
    </div>

    <!-- Right: Requests & Prescriptions -->
    <div class="form-side">

      <!-- Prescriptions -->
      <div class="wm-card">
        <div class="wm-card-header">
          <div class="wm-section-title">Prescriptions</div>
          <button mat-stroked-button (click)="addPrescription()"><mat-icon>add</mat-icon></button>
        </div>
        <div class="rx-list">
          <div class="rx-item" *ngFor="let rx of prescriptions; let i = index">
            <div class="rx-icon"><mat-icon>medication</mat-icon></div>
            <div class="rx-body">
              <div class="rx-name">{{ rx.name }}</div>
              <div class="rx-dose">{{ rx.dose }} · {{ rx.freq }}</div>
              <div class="rx-dur">{{ rx.duration }}</div>
            </div>
            <button mat-icon-button (click)="removePrescription(i)"><mat-icon>delete_outline</mat-icon></button>
          </div>
        </div>
        <div class="rx-add-form" *ngIf="showRxForm()">
          <input class="small-input" placeholder="Medication name" />
          <div class="small-row">
            <input class="small-input" placeholder="Dose (e.g. 10mg)" />
            <input class="small-input" placeholder="Frequency" />
          </div>
          <input class="small-input" placeholder="Duration (e.g. 30 days)" />
          <div style="display:flex;gap:8px;margin-top:8px">
            <button mat-raised-button color="primary" style="flex:1;font-size:var(--fs-xs)!important" (click)="saveRx()">Add</button>
            <button mat-stroked-button style="font-size:var(--fs-xs)!important" (click)="showRxForm.set(false)">Cancel</button>
          </div>
        </div>
        <div class="wm-empty" *ngIf="prescriptions.length === 0 && !showRxForm()" style="padding:24px">
          <mat-icon class="empty-icon">receipt_long</mat-icon>
          <div class="empty-title">No prescriptions yet</div>
        </div>
      </div>

      <!-- Lab Analysis Requests -->
      <div class="wm-card mt-5">
        <div class="wm-card-header">
          <div class="wm-section-title">Lab Analysis</div>
          <button mat-stroked-button><mat-icon>add</mat-icon></button>
        </div>
        <div class="lab-list">
          <div class="lab-item" *ngFor="let l of labRequests">
            <mat-icon class="lab-icon">science</mat-icon>
            <div class="lab-body">
              <div class="lab-name">{{ l.name }}</div>
              <div class="lab-note">{{ l.note }}</div>
            </div>
            <span class="badge badge-pending">Requested</span>
          </div>
        </div>
      </div>

      <!-- Imaging Requests -->
      <div class="wm-card mt-5">
        <div class="wm-card-header">
          <div class="wm-section-title">Imaging</div>
          <button mat-stroked-button><mat-icon>add</mat-icon></button>
        </div>
        <div class="lab-list">
          <div class="lab-item" *ngFor="let img of imagingRequests">
            <mat-icon class="lab-icon">radiology</mat-icon>
            <div class="lab-body">
              <div class="lab-name">{{ img.name }}</div>
              <div class="lab-note">{{ img.note }}</div>
            </div>
            <span class="badge badge-pending">Requested</span>
          </div>
        </div>
        <div class="wm-empty" *ngIf="imagingRequests.length === 0" style="padding:20px">
          <mat-icon class="empty-icon">radiology</mat-icon>
          <div class="empty-title">No imaging requested</div>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="form-actions mt-5">
        <button mat-stroked-button class="action-btn">
          <mat-icon>save</mat-icon> Save Draft
        </button>
        <button mat-raised-button color="primary" class="action-btn">
          <mat-icon>check_circle</mat-icon> Complete Consultation
        </button>
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

    /* Banner */
    .consult-banner {
      background: linear-gradient(135deg, #0f1f35 0%, #1a3a5c 100%);
      border-radius: var(--r-xl); padding: 20px 24px; display: flex; align-items: center;
      gap: 24px; margin-bottom: 24px; box-shadow: var(--sh-lg);
    }
    .cb-patient { display: flex; align-items: center; gap: 16px; flex: 1; }
    .cbp-name { font-size: var(--fs-xl); font-weight: 700; color: white; }
    .cbp-meta { font-size: var(--fs-sm); color: rgba(255,255,255,0.6); margin: 3px 0 8px; }
    .cbp-flags { display: flex; gap: 6px; flex-wrap: wrap; }
    .cb-apt { border-left: 1px solid rgba(255,255,255,0.1); padding-left: 24px; }
    .cba-label { font-size: var(--fs-xs); text-transform: uppercase; letter-spacing: 0.08em; color: rgba(255,255,255,0.4); margin-bottom: 4px; }
    .cba-val { font-size: var(--fs-sm); color: rgba(255,255,255,0.85); font-weight: 500; }
    .cb-status {}

    /* Layout */
    .consult-form-layout { display: grid; grid-template-columns: 1fr 320px; gap: 24px; align-items: start; }
    .form-main, .form-side { display: flex; flex-direction: column; }
    .mt-5 { margin-top: 20px; }

    /* Measures */
    .measures-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; padding: 20px 24px;
    }
    .measure-input {
      display: flex; align-items: flex-start; gap: 12px;
      background: var(--wm-bg-soft); border: 1px solid var(--wm-border-light); border-radius: var(--r-lg); padding: 14px;
      transition: border-color var(--tr), box-shadow var(--tr);
      &:focus-within { border-color: var(--wm-primary); box-shadow: 0 0 0 3px rgba(0,92,187,0.1); }
    }
    .mi-icon {
      width: 36px; height: 36px; border-radius: var(--r-md);
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      mat-icon { font-size: 18px; width: 18px; height: 18px; }
    }
    .mi-body { flex: 1; }
    .mi-label { font-size: var(--fs-xs); font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--wm-muted); display: block; margin-bottom: 6px; }
    .mi-input-wrap { display: flex; align-items: center; gap: 6px; }
    .mi-input {
      width: 100%; border: none; outline: none; background: transparent; font-family: var(--wm-font);
      font-size: var(--fs-xl); font-weight: 700; color: var(--wm-text-strong);
      &::placeholder { color: var(--wm-border-strong); font-weight: 400; font-size: var(--fs-lg); }
    }
    .mi-unit { font-size: var(--fs-xs); color: var(--wm-muted); white-space: nowrap; font-weight: 500; }
    .mi-ref { font-size: 10px; color: var(--wm-muted-light); margin-top: 4px; }

    /* Notes form */
    .notes-form { padding: 20px 24px; display: flex; flex-direction: column; gap: 0; }
    .form-textarea {
      width: 100%; padding: 10px 14px; border: 1.5px solid var(--wm-border); border-radius: var(--r-md);
      font-family: var(--wm-font); font-size: var(--fs-sm); color: var(--wm-text); background: var(--wm-bg-soft);
      resize: vertical; outline: none; transition: border-color var(--tr), box-shadow var(--tr);
      &:focus { border-color: var(--wm-primary); box-shadow: 0 0 0 3px rgba(0,92,187,0.1); background: white; }
      &::placeholder { color: var(--wm-placeholder); }
    }
    .diagnosis-input { display: flex; flex-direction: column; gap: 10px; }
    .diagnosis-tags { display: flex; flex-wrap: wrap; gap: 6px; }
    .dtag {
      display: inline-flex; align-items: center; gap: 6px;
      background: var(--wm-primary-light); border: 1.5px solid var(--wm-primary); border-radius: var(--r-md);
      padding: 4px 8px;
    }
    .dtag-code { font-size: var(--fs-xs); font-weight: 700; color: var(--wm-primary-strong); font-family: var(--wm-font-mono); }
    .dtag-label { font-size: var(--fs-sm); color: var(--wm-primary-strong); }
    .dtag-remove { border: none; background: none; cursor: pointer; padding: 0; display: flex; color: var(--wm-primary); mat-icon { font-size: 14px; width: 14px; height: 14px; } }

    /* Acts */
    .acts-list { padding: 8px 0; }
    .act-item {
      display: flex; align-items: center; gap: 12px; padding: 12px 24px;
      border-bottom: 1px solid var(--wm-border-light); &:last-child { border-bottom: none; }
    }
    .act-icon { width: 34px; height: 34px; border-radius: var(--r-md); display: flex; align-items: center; justify-content: center; flex-shrink: 0; mat-icon { font-size: 16px; width: 16px; height: 16px; } }
    .act-body { flex: 1; }
    .act-code  { font-size: var(--fs-xs); font-family: var(--wm-font-mono); color: var(--wm-muted-light); }
    .act-name  { font-size: var(--fs-sm); font-weight: 600; color: var(--wm-text); }
    .act-fee   { font-size: var(--fs-md); font-weight: 700; color: var(--wm-text); }
    .acts-total {
      display: flex; justify-content: space-between; align-items: center;
      padding: 14px 24px; background: var(--wm-bg-soft); border-top: 1px solid var(--wm-border-light);
      font-weight: 600; font-size: var(--fs-sm); color: var(--wm-muted);
    }
    .at-val { font-size: var(--fs-xl); font-weight: 800; color: var(--wm-primary); }

    /* Prescriptions */
    .rx-list { padding: 8px 0; }
    .rx-item {
      display: flex; align-items: center; gap: 12px; padding: 12px 24px;
      border-bottom: 1px solid var(--wm-border-light); &:last-child { border-bottom: none; }
    }
    .rx-icon {
      width: 34px; height: 34px; border-radius: var(--r-md);
      background: var(--wm-primary-light); display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      mat-icon { font-size: 16px; width: 16px; height: 16px; color: var(--wm-primary); }
    }
    .rx-body { flex: 1; }
    .rx-name { font-size: var(--fs-sm); font-weight: 600; color: var(--wm-text); }
    .rx-dose { font-size: var(--fs-xs); color: var(--wm-muted); }
    .rx-dur  { font-size: var(--fs-xs); color: var(--wm-success); font-weight: 500; }

    .rx-add-form { padding: 14px 24px; background: var(--wm-bg-soft); border-top: 1px solid var(--wm-border-light); display: flex; flex-direction: column; gap: 8px; }
    .small-input {
      width: 100%; padding: 7px 10px; border: 1.5px solid var(--wm-border); border-radius: var(--r-md);
      font-family: var(--wm-font); font-size: var(--fs-sm); color: var(--wm-text); outline: none; background: var(--wm-surface);
      &:focus { border-color: var(--wm-primary); }
    }
    .small-row { display: flex; gap: 8px; }

    /* Lab */
    .lab-list { padding: 8px 0; }
    .lab-item {
      display: flex; align-items: center; gap: 12px; padding: 10px 24px;
      border-bottom: 1px solid var(--wm-border-light); &:last-child { border-bottom: none; }
    }
    .lab-icon { font-size: 18px; width: 18px; height: 18px; color: var(--wm-teal); flex-shrink: 0; }
    .lab-body { flex: 1; }
    .lab-name { font-size: var(--fs-sm); font-weight: 600; color: var(--wm-text); }
    .lab-note { font-size: var(--fs-xs); color: var(--wm-muted); }

    /* Actions */
    .form-actions { display: flex; flex-direction: column; gap: 10px; }
    .action-btn { width: 100% !important; font-size: var(--fs-sm) !important; }

    @media (max-width: 1100px) {
      .consult-form-layout { grid-template-columns: 1fr; }
      .measures-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 600px) {
      .measures-grid { grid-template-columns: 1fr; }
      .consult-banner { flex-direction: column; align-items: flex-start; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsultationFormComponent {
  readonly showRxForm = signal(false);

  measures = [
    { label: 'Temperature',    icon: 'thermostat',     unit: '°C',    placeholder: '36.5',   reference: '36.1 – 37.2°C',  value: '',  bg: 'var(--wm-teal-light)',    color: 'var(--wm-teal)' },
    { label: 'Blood Pressure', icon: 'compress',       unit: 'mmHg',  placeholder: '120/80', reference: '<130/80 mmHg',   value: '',  bg: 'var(--wm-warning-light)', color: 'var(--wm-warning)' },
    { label: 'Heart Rate',     icon: 'favorite',       unit: 'bpm',   placeholder: '72',     reference: '60 – 100 bpm',   value: '',  bg: 'var(--wm-danger-light)',  color: 'var(--wm-danger)' },
    { label: 'Weight',         icon: 'monitor_weight', unit: 'kg',    placeholder: '70.0',   reference: 'BMI reference',  value: '',  bg: 'var(--wm-success-light)', color: 'var(--wm-success)' },
    { label: 'Height',         icon: 'height',         unit: 'cm',    placeholder: '170',    reference: 'Adult norms',    value: '',  bg: 'var(--wm-primary-light)', color: 'var(--wm-primary)' },
    { label: 'SpO₂',           icon: 'air',            unit: '%',     placeholder: '98',     reference: '95 – 100%',      value: '',  bg: 'var(--wm-violet-light)',  color: 'var(--wm-violet)' },
  ];

  diagnoses = [
    { code: 'I10', label: 'Essential (primary) hypertension' },
    { code: 'I48.91', label: 'Unspecified atrial fibrillation' },
  ];

  medicalActs = [
    { code: 'C', name: 'General Consultation', type: 'Consultation', fee: 25,  icon: 'stethoscope', bg: 'var(--wm-primary-light)', color: 'var(--wm-primary)' },
    { code: 'ECG12', name: '12-Lead ECG',       type: 'Procedure',   fee: 40,  icon: 'monitor_heart',bg:'var(--wm-danger-light)',  color: 'var(--wm-danger)' },
  ];

  prescriptions = [
    { name: 'Amlodipine 10mg', dose: '1 tablet', freq: 'Every morning', duration: '90 days' },
    { name: 'Atorvastatin 20mg', dose: '1 tablet', freq: 'Every evening', duration: '90 days' },
  ];

  labRequests = [
    { name: 'Complete Blood Count (CBC)', note: 'Fasting required · Central Lab' },
    { name: 'Lipid Panel', note: 'Follow up cholesterol levels' },
  ];

  imagingRequests: any[] = [];

  get totalFees(): number { return this.medicalActs.reduce((s, a) => s + a.fee, 0); }

  addAct(): void { this.medicalActs.push({ code: 'NEW', name: 'New Act', type: 'Other', fee: 0, icon: 'healing', bg: 'var(--wm-bg-soft)', color: 'var(--wm-muted)' }); }
  removeAct(i: number): void { this.medicalActs.splice(i, 1); }
  addPrescription(): void { this.showRxForm.set(true); }
  removePrescription(i: number): void { this.prescriptions.splice(i, 1); }
  saveRx(): void { this.prescriptions.push({ name: 'New Medication', dose: '1 tablet', freq: 'Daily', duration: '30 days' }); this.showRxForm.set(false); }
}
