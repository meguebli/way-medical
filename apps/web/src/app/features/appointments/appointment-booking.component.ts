import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'wm-appointment-booking',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, MatIconModule, MatButtonModule],
  template: `
<div class="wm-page">
  <div class="breadcrumb">
    <a routerLink="/appointments">Appointments</a>
    <mat-icon>chevron_right</mat-icon>
    <span>Book Appointment</span>
  </div>

  <div class="booking-layout">
    <!-- ── Step Wizard Header ──────────────────────────────────── -->
    <div class="booking-stepper">
      <div class="step-track">
        <div class="step-item" *ngFor="let s of steps; let i = index"
          [class.active]="currentStep() === i"
          [class.done]="currentStep() > i">
          <div class="step-circle">
            <mat-icon *ngIf="currentStep() > i">check</mat-icon>
            <span *ngIf="currentStep() <= i">{{ i + 1 }}</span>
          </div>
          <div class="step-info">
            <div class="step-label">{{ s.label }}</div>
            <div class="step-sub">{{ s.sub }}</div>
          </div>
        </div>
        <div class="step-connector" *ngFor="let _ of [1,2,3]" [class.done]="currentStep() > 0"></div>
      </div>
    </div>

    <div class="booking-body">
      <!-- ── Step 0: Choose Service ─────────────────────────── -->
      <div *ngIf="currentStep() === 0" class="step-content">
        <h2 class="step-title">Select a Medical Service</h2>
        <p class="step-desc">Choose the service that matches your medical need. Each service has specialist doctors available.</p>

        <div class="wm-search-input" style="margin-bottom:20px;max-width:400px">
          <mat-icon>search</mat-icon>
          <input type="text" placeholder="Search services or specialties…" />
        </div>

        <div class="services-grid">
          <div class="service-card" *ngFor="let s of services"
            [class.selected]="selectedService()?.id === s.id"
            (click)="selectService(s)">
            <div class="sc-icon" [style.background]="s.bg">
              <mat-icon [style.color]="s.color">{{ s.icon }}</mat-icon>
            </div>
            <div class="sc-body">
              <div class="sc-name">{{ s.name }}</div>
              <div class="sc-spec">{{ s.specialty }}</div>
              <div class="sc-avail">
                <mat-icon>people</mat-icon>{{ s.doctors }} doctors available
              </div>
            </div>
            <mat-icon class="sc-check" *ngIf="selectedService()?.id === s.id">check_circle</mat-icon>
          </div>
        </div>
      </div>

      <!-- ── Step 1: Choose Doctor ──────────────────────────── -->
      <div *ngIf="currentStep() === 1" class="step-content">
        <h2 class="step-title">Choose Your Doctor</h2>
        <p class="step-desc">Select a doctor from the <strong>{{ selectedService()?.name }}</strong> service.</p>

        <div class="doctors-grid">
          <div class="doctor-card-sel" *ngFor="let d of doctors"
            [class.selected]="selectedDoctor()?.id === d.id"
            (click)="selectDoctor(d)">
            <div class="avatar avatar-lg" [style.background]="d.avatarBg" [style.color]="d.avatarColor">{{ d.initials }}</div>
            <div class="dcs-body">
              <div class="dcs-name">{{ d.name }}</div>
              <div class="dcs-spec">{{ d.specialty }}</div>
              <div class="dcs-rating">
                <mat-icon *ngFor="let _ of [1,2,3,4,5]" class="star">star</mat-icon>
                <span>{{ d.rating }} · {{ d.reviews }} reviews</span>
              </div>
              <div class="dcs-next">Next available: {{ d.nextSlot }}</div>
            </div>
            <mat-icon class="sc-check" *ngIf="selectedDoctor()?.id === d.id">check_circle</mat-icon>
          </div>
        </div>
      </div>

      <!-- ── Step 2: Choose Date & Time ─────────────────────── -->
      <div *ngIf="currentStep() === 2" class="step-content">
        <h2 class="step-title">Select Date & Time</h2>
        <p class="step-desc">Available slots for <strong>{{ selectedDoctor()?.name }}</strong></p>

        <div class="calendar-slots-layout">
          <!-- Mini Calendar -->
          <div class="mini-calendar">
            <div class="mc-header">
              <button class="mc-nav"><mat-icon>chevron_left</mat-icon></button>
              <span class="mc-month">April 2025</span>
              <button class="mc-nav"><mat-icon>chevron_right</mat-icon></button>
            </div>
            <div class="mc-weekdays">
              <span *ngFor="let d of ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']">{{ d }}</span>
            </div>
            <div class="mc-days">
              <div *ngFor="let d of calDays" class="mc-day"
                [class.empty]="!d"
                [class.available]="d?.available"
                [class.selected]="d?.date === selectedDate()"
                [class.today]="d?.today"
                [class.past]="d?.past"
                (click)="d && d.available && selectDate(d.date)">
                {{ d?.num }}
              </div>
            </div>
          </div>

          <!-- Time Slots -->
          <div class="time-slots" *ngIf="selectedDate()">
            <div class="ts-header">Available times on <strong>{{ selectedDate() }}</strong></div>
            <div class="ts-grid">
              <button *ngFor="let t of timeSlots" class="ts-slot"
                [class.selected]="selectedTime() === t.time"
                [class.unavailable]="!t.available"
                [disabled]="!t.available"
                (click)="selectTime(t.time)">
                {{ t.time }}
              </button>
            </div>
          </div>
          <div class="time-slots empty-slots" *ngIf="!selectedDate()">
            <mat-icon class="empty-icon">calendar_month</mat-icon>
            <div class="empty-title">Select a date</div>
            <div class="empty-body">Click a highlighted date on the calendar to see available time slots.</div>
          </div>
        </div>
      </div>

      <!-- ── Step 3: Confirm ─────────────────────────────────── -->
      <div *ngIf="currentStep() === 3" class="step-content">
        <h2 class="step-title">Confirm Your Appointment</h2>
        <p class="step-desc">Please review your appointment details before confirming.</p>

        <div class="confirm-card">
          <div class="confirm-section">
            <div class="cs-title">Service</div>
            <div class="cs-value">
              <div class="sc-icon sm" [style.background]="selectedService()?.bg">
                <mat-icon [style.color]="selectedService()?.color">{{ selectedService()?.icon }}</mat-icon>
              </div>
              <div>
                <div style="font-weight:600;color:var(--wm-text)">{{ selectedService()?.name }}</div>
                <div style="font-size:var(--fs-xs);color:var(--wm-muted)">{{ selectedService()?.specialty }}</div>
              </div>
            </div>
          </div>
          <div class="confirm-section">
            <div class="cs-title">Doctor</div>
            <div class="cs-value">
              <div class="avatar avatar-sm" [style.background]="selectedDoctor()?.avatarBg" [style.color]="selectedDoctor()?.avatarColor">{{ selectedDoctor()?.initials }}</div>
              <div>
                <div style="font-weight:600;color:var(--wm-text)">{{ selectedDoctor()?.name }}</div>
                <div style="font-size:var(--fs-xs);color:var(--wm-muted)">{{ selectedDoctor()?.specialty }}</div>
              </div>
            </div>
          </div>
          <div class="confirm-section">
            <div class="cs-title">Date & Time</div>
            <div class="cs-value">
              <div class="ci-icon" style="background:var(--wm-primary-light)">
                <mat-icon style="color:var(--wm-primary)">event</mat-icon>
              </div>
              <div>
                <div style="font-weight:600;color:var(--wm-text)">{{ selectedDate() }}</div>
                <div style="font-size:var(--fs-xs);color:var(--wm-muted)">{{ selectedTime() }}</div>
              </div>
            </div>
          </div>
          <div class="confirm-reason">
            <div class="cs-title" style="margin-bottom:10px">Reason for Visit <span style="color:var(--wm-muted-light)">(optional)</span></div>
            <textarea class="reason-input" rows="3" placeholder="Briefly describe your symptoms or reason for this appointment…"></textarea>
          </div>
        </div>

        <div class="wm-alert alert-info" style="margin-top:16px">
          <mat-icon>info</mat-icon>
          <div>
            Your appointment request will be reviewed and approved by the doctor's team.
            You will receive a confirmation by email within 24 hours.
          </div>
        </div>
      </div>

      <!-- ── Navigation ─────────────────────────────────────── -->
      <div class="booking-nav">
        <button mat-stroked-button (click)="prevStep()" [disabled]="currentStep() === 0">
          <mat-icon>arrow_back</mat-icon> Back
        </button>
        <div style="flex:1"></div>
        <button mat-raised-button color="primary" (click)="nextStep()"
          *ngIf="currentStep() < 3"
          [disabled]="!canProceed()">
          Continue <mat-icon>arrow_forward</mat-icon>
        </button>
        <button mat-raised-button color="primary" (click)="confirmBooking()"
          *ngIf="currentStep() === 3">
          <mat-icon>check</mat-icon> Confirm Booking
        </button>
      </div>
    </div>
  </div>
</div>
  `,
  styles: [`
    .breadcrumb {
      display: flex; align-items: center; gap: 4px;
      font-size: var(--fs-sm); color: var(--wm-muted); margin-bottom: 20px;
      a { color: var(--wm-primary); text-decoration: none; }
      mat-icon { font-size: 16px; width: 16px; height: 16px; }
    }

    .booking-layout { display: flex; flex-direction: column; gap: 0; }

    /* Stepper */
    .booking-stepper {
      background: var(--wm-surface); border: 1px solid var(--wm-border-light);
      border-radius: var(--r-xl) var(--r-xl) 0 0; padding: 24px 32px;
      border-bottom: none; box-shadow: var(--sh-card);
    }
    .step-track {
      display: flex; align-items: center; gap: 0;
    }
    .step-item {
      display: flex; align-items: center; gap: 12px;
      opacity: 0.4; transition: opacity var(--tr);
      &.active, &.done { opacity: 1; }
    }
    .step-circle {
      width: 36px; height: 36px; border-radius: 50%; border: 2px solid var(--wm-border);
      display: flex; align-items: center; justify-content: center;
      font-size: var(--fs-sm); font-weight: 700; color: var(--wm-muted);
      background: var(--wm-bg-soft); flex-shrink: 0; transition: all var(--tr);
      mat-icon { font-size: 16px; width: 16px; height: 16px; }
      .step-item.active & { border-color: var(--wm-primary); background: var(--wm-primary); color: white; }
      .step-item.done &  { border-color: var(--wm-success); background: var(--wm-success); color: white; }
    }
    .step-info {}
    .step-label { font-size: var(--fs-sm); font-weight: 600; color: var(--wm-text); }
    .step-sub   { font-size: var(--fs-xs); color: var(--wm-muted); }
    .step-connector { flex: 1; height: 2px; background: var(--wm-border-light); margin: 0 12px; min-width: 32px; }

    /* Content area */
    .booking-body {
      background: var(--wm-surface); border: 1px solid var(--wm-border-light);
      border-radius: 0 0 var(--r-xl) var(--r-xl); padding: 32px;
      box-shadow: var(--sh-md);
    }
    .step-title { font-size: var(--fs-2xl); font-weight: 700; color: var(--wm-text-strong); margin: 0 0 6px; }
    .step-desc  { font-size: var(--fs-sm); color: var(--wm-muted); margin: 0 0 24px; }

    /* Services grid */
    .services-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 14px;
    }
    .service-card {
      display: flex; flex-direction: column; align-items: center; gap: 12px;
      padding: 20px 16px; border-radius: var(--r-xl); border: 2px solid var(--wm-border);
      background: var(--wm-surface); cursor: pointer; text-align: center;
      transition: all var(--tr); position: relative;
      &:hover { border-color: var(--wm-primary); box-shadow: var(--sh-md); transform: translateY(-2px); }
      &.selected { border-color: var(--wm-primary); background: var(--wm-primary-subtle); box-shadow: var(--sh-md); }
    }
    .sc-icon {
      width: 52px; height: 52px; border-radius: var(--r-xl);
      display: flex; align-items: center; justify-content: center;
      mat-icon { font-size: 24px; width: 24px; height: 24px; }
      &.sm { width: 32px; height: 32px; border-radius: var(--r-md); mat-icon { font-size: 16px; width: 16px; height: 16px; } }
    }
    .sc-name  { font-size: var(--fs-md);  font-weight: 700; color: var(--wm-text); }
    .sc-spec  { font-size: var(--fs-xs);  color: var(--wm-muted); margin: 3px 0; }
    .sc-avail { display: inline-flex; align-items: center; gap: 4px; font-size: var(--fs-xs); color: var(--wm-teal); font-weight: 500; mat-icon { font-size: 13px; width: 13px; height: 13px; } }
    .sc-check { position: absolute; top: 10px; right: 10px; color: var(--wm-primary); font-size: 20px; width: 20px; height: 20px; }

    /* Doctors grid */
    .doctors-grid { display: flex; flex-direction: column; gap: 12px; }
    .doctor-card-sel {
      display: flex; align-items: center; gap: 16px;
      padding: 16px 20px; border-radius: var(--r-xl); border: 2px solid var(--wm-border);
      background: var(--wm-surface); cursor: pointer; transition: all var(--tr); position: relative;
      &:hover { border-color: var(--wm-primary); box-shadow: var(--sh-md); }
      &.selected { border-color: var(--wm-primary); background: var(--wm-primary-subtle); }
    }
    .dcs-body { flex: 1; }
    .dcs-name  { font-size: var(--fs-md);  font-weight: 700; color: var(--wm-text); }
    .dcs-spec  { font-size: var(--fs-sm);  color: var(--wm-teal); font-weight: 500; margin: 2px 0 6px; }
    .dcs-rating {
      display: flex; align-items: center; gap: 2px;
      .star { font-size: 14px; width: 14px; height: 14px; color: #f59e0b; }
      span { font-size: var(--fs-xs); color: var(--wm-muted); margin-left: 6px; }
    }
    .dcs-next { font-size: var(--fs-xs); color: var(--wm-success); font-weight: 600; margin-top: 6px; }

    /* Calendar */
    .calendar-slots-layout { display: grid; grid-template-columns: 280px 1fr; gap: 24px; }
    .mini-calendar { background: var(--wm-bg-soft); border: 1px solid var(--wm-border-light); border-radius: var(--r-xl); padding: 16px; }
    .mc-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
    .mc-nav {
      border: none; background: none; cursor: pointer; width: 28px; height: 28px;
      border-radius: var(--r-md); display: flex; align-items: center; justify-content: center;
      color: var(--wm-muted); transition: background var(--tr);
      &:hover { background: var(--wm-surface); }
      mat-icon { font-size: 18px; width: 18px; height: 18px; }
    }
    .mc-month { font-size: var(--fs-sm); font-weight: 700; color: var(--wm-text); }
    .mc-weekdays { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; margin-bottom: 6px; span { text-align: center; font-size: 10px; font-weight: 700; color: var(--wm-muted-light); text-transform: uppercase; padding: 4px 0; } }
    .mc-days { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; }
    .mc-day {
      aspect-ratio: 1; display: flex; align-items: center; justify-content: center;
      border-radius: var(--r-sm); font-size: var(--fs-xs); font-weight: 500; color: var(--wm-muted);
      transition: all var(--tr);
      &.available { color: var(--wm-text); font-weight: 600; cursor: pointer; &:hover { background: var(--wm-primary-light); color: var(--wm-primary); } }
      &.selected { background: var(--wm-primary) !important; color: white !important; }
      &.today { border: 1.5px solid var(--wm-primary); color: var(--wm-primary); }
      &.past { opacity: 0.3; pointer-events: none; }
      &.empty { pointer-events: none; }
    }

    .time-slots { background: var(--wm-bg-soft); border: 1px solid var(--wm-border-light); border-radius: var(--r-xl); padding: 20px; }
    .ts-header { font-size: var(--fs-sm); color: var(--wm-muted); margin-bottom: 14px; }
    .ts-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)); gap: 8px; }
    .ts-slot {
      padding: 10px 8px; border-radius: var(--r-md); border: 1.5px solid var(--wm-border);
      background: var(--wm-surface); font-family: var(--wm-font); font-size: var(--fs-sm); font-weight: 600; color: var(--wm-text);
      cursor: pointer; transition: all var(--tr); text-align: center;
      &:hover:not([disabled]) { border-color: var(--wm-primary); color: var(--wm-primary); }
      &.selected { background: var(--wm-primary); border-color: var(--wm-primary); color: white; }
      &.unavailable { opacity: 0.3; cursor: not-allowed; text-decoration: line-through; }
    }
    .empty-slots { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 200px; }
    .empty-icon { font-size: 36px !important; width: 36px !important; height: 36px !important; color: var(--wm-border-strong) !important; margin-bottom: 12px; }
    .empty-title { font-size: var(--fs-md); font-weight: 600; color: var(--wm-text-secondary); }
    .empty-body  { font-size: var(--fs-sm); color: var(--wm-muted); text-align: center; margin-top: 6px; }

    /* Confirm */
    .confirm-card {
      background: var(--wm-bg-soft); border: 1px solid var(--wm-border-light);
      border-radius: var(--r-xl); overflow: hidden; margin-bottom: 20px;
    }
    .confirm-section {
      padding: 16px 24px; border-bottom: 1px solid var(--wm-border-light);
      &:last-child { border-bottom: none; }
    }
    .confirm-reason { padding: 16px 24px; }
    .cs-title { font-size: var(--fs-xs); font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--wm-muted); margin-bottom: 10px; }
    .cs-value { display: flex; align-items: center; gap: 12px; }
    .ci-icon { width: 32px; height: 32px; border-radius: var(--r-md); display: flex; align-items: center; justify-content: center; mat-icon { font-size: 16px; width: 16px; height: 16px; } }
    .reason-input {
      width: 100%; padding: 10px 14px; border: 1.5px solid var(--wm-border); border-radius: var(--r-md);
      font-family: var(--wm-font); font-size: var(--fs-sm); color: var(--wm-text); background: var(--wm-surface);
      resize: vertical; outline: none; transition: border-color var(--tr);
      &:focus { border-color: var(--wm-primary); box-shadow: 0 0 0 3px rgba(0,92,187,0.1); }
    }

    /* Nav */
    .booking-nav { display: flex; align-items: center; gap: 12px; margin-top: 28px; padding-top: 24px; border-top: 1px solid var(--wm-border-light); }

    @media (max-width: 900px) {
      .calendar-slots-layout { grid-template-columns: 1fr; }
      .booking-body { padding: 20px; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppointmentBookingComponent {
  readonly currentStep = signal(0);
  readonly selectedService = signal<any>(null);
  readonly selectedDoctor  = signal<any>(null);
  readonly selectedDate    = signal<string>('');
  readonly selectedTime    = signal<string>('');

  readonly steps = [
    { label: 'Service',    sub: 'Choose specialty' },
    { label: 'Doctor',     sub: 'Select physician' },
    { label: 'Date & Time',sub: 'Pick a slot' },
    { label: 'Confirm',    sub: 'Review & book' },
  ];

  readonly services = [
    { id:1, name:'Cardiology',        specialty:'Cardiac Care',    icon:'favorite',        doctors:3, bg:'var(--wm-danger-light)',   color:'var(--wm-danger)' },
    { id:2, name:'General Medicine',  specialty:'Primary Care',    icon:'local_hospital',  doctors:5, bg:'var(--wm-primary-light)',  color:'var(--wm-primary)' },
    { id:3, name:'Dermatology',       specialty:'Skin Care',       icon:'healing',         doctors:2, bg:'var(--wm-warning-light)',  color:'var(--wm-warning)' },
    { id:4, name:'Radiology',         specialty:'Medical Imaging', icon:'radiology',       doctors:2, bg:'var(--wm-teal-light)',     color:'var(--wm-teal)' },
    { id:5, name:'Neurology',         specialty:'Neuroscience',    icon:'psychology',      doctors:1, bg:'var(--wm-violet-light)',   color:'var(--wm-violet)' },
    { id:6, name:'Orthopedics',       specialty:'Bone & Joint',    icon:'accessibility',   doctors:2, bg:'var(--wm-success-light)',  color:'var(--wm-success)' },
  ];

  readonly doctors = [
    { id:1, name:'Dr. Éric Fontaine',  specialty:'Cardiologist',        initials:'EF', rating:'4.9', reviews:142, nextSlot:'Today, 10:30 AM', avatarBg:'var(--wm-teal-light)',   avatarColor:'var(--wm-teal-dark)' },
    { id:2, name:'Dr. Claire Martin',  specialty:'General Practitioner', initials:'CM', rating:'4.8', reviews:289, nextSlot:'Tomorrow, 9:00 AM',avatarBg:'var(--wm-primary-light)',avatarColor:'var(--wm-primary)' },
    { id:3, name:'Dr. Sophie Renard',  specialty:'Cardiologist',         initials:'SR', rating:'4.7', reviews:98,  nextSlot:'Apr 30, 11:15 AM', avatarBg:'var(--wm-success-light)',avatarColor:'var(--wm-success)' },
  ];

  readonly calDays = [
    null, null,
    { num:1,  date:'Apr 1',  available:false, past:true,  today:false },
    { num:2,  date:'Apr 2',  available:false, past:true,  today:false },
    { num:3,  date:'Apr 3',  available:false, past:true,  today:false },
    { num:4,  date:'Apr 4',  available:false, past:true,  today:false },
    { num:5,  date:'Apr 5',  available:false, past:true,  today:false },
    ...Array.from({length:20}, (_,i) => ({ num: i+6, date:`Apr ${i+6}`, available: [8,10,14,17,21,24,28,29].includes(i+6), past: i+6 < 22, today: i+6 === 22 })),
    { num:27, date:'Apr 27', available:false, past:false, today:false },
    { num:28, date:'Apr 28', available:true,  past:false, today:false },
    { num:29, date:'Apr 29', available:true,  past:false, today:false },
    { num:30, date:'Apr 30', available:true,  past:false, today:false },
  ];

  readonly timeSlots = [
    { time:'08:00', available:false }, { time:'08:30', available:false }, { time:'09:00', available:true },
    { time:'09:30', available:true  }, { time:'10:00', available:false }, { time:'10:30', available:true },
    { time:'11:00', available:true  }, { time:'11:30', available:false }, { time:'14:00', available:true },
    { time:'14:30', available:true  }, { time:'15:00', available:false }, { time:'15:30', available:true },
    { time:'16:00', available:true  }, { time:'16:30', available:false },
  ];

  canProceed(): boolean {
    if (this.currentStep() === 0) return !!this.selectedService();
    if (this.currentStep() === 1) return !!this.selectedDoctor();
    if (this.currentStep() === 2) return !!this.selectedDate() && !!this.selectedTime();
    return true;
  }

  selectService(s: any): void { this.selectedService.set(s); }
  selectDoctor(d: any): void  { this.selectedDoctor.set(d); }
  selectDate(d: string): void { this.selectedDate.set(d); this.selectedTime.set(''); }
  selectTime(t: string): void { this.selectedTime.set(t); }

  nextStep(): void { if (this.currentStep() < 3) this.currentStep.update(v => v + 1); }
  prevStep(): void { if (this.currentStep() > 0) this.currentStep.update(v => v - 1); }
  confirmBooking(): void { console.log('Booking confirmed'); }
}
