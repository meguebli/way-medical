import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'wm-doctor-schedule',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, MatIconModule, MatButtonModule],
  template: `
<div class="wm-page">
  <div class="wm-page-header">
    <div>
      <p class="wm-eyebrow">My Schedule</p>
      <h1 class="wm-page-title">Agenda — Dr. Éric Fontaine</h1>
    </div>
    <div style="display:flex;gap:10px">
      <button mat-stroked-button><mat-icon>event_busy</mat-icon> Request Leave</button>
      <button mat-raised-button color="primary"><mat-icon>add</mat-icon> Add Availability</button>
    </div>
  </div>

  <!-- View controls -->
  <div class="schedule-controls">
    <div class="wm-tabs">
      <button *ngFor="let v of views; let i = index" class="wm-tab" [class.active]="viewMode() === v.key" (click)="viewMode.set(v.key)">{{ v.label }}</button>
    </div>
    <div class="week-nav">
      <button class="nav-btn" (click)="prevWeek()"><mat-icon>chevron_left</mat-icon></button>
      <span class="week-label">{{ currentWeekLabel }}</span>
      <button class="nav-btn" (click)="nextWeek()"><mat-icon>chevron_right</mat-icon></button>
    </div>
    <button mat-stroked-button (click)="goToday()">Today</button>
  </div>

  <!-- WEEK VIEW -->
  <div class="week-calendar" *ngIf="viewMode() === 'week'">
    <!-- Header -->
    <div class="wc-header">
      <div class="wc-time-col"></div>
      <div class="wc-day-head" *ngFor="let d of weekDays" [class.today]="d.today">
        <div class="wdh-day">{{ d.day }}</div>
        <div class="wdh-date" [class.today-badge]="d.today">{{ d.date }}</div>
      </div>
    </div>

    <!-- Grid -->
    <div class="wc-body">
      <div class="wc-row" *ngFor="let h of hours">
        <div class="wc-time">{{ h }}</div>
        <div class="wc-cell" *ngFor="let d of weekDays" [class.today]="d.today">
          <ng-container *ngFor="let evt of getEventsForSlot(d.dayKey, h)">
            <div class="cal-event" [style.background]="evt.bg" [style.border-left-color]="evt.color" [class.evt-short]="evt.short">
              <div class="evt-time">{{ evt.time }}</div>
              <div class="evt-title">{{ evt.title }}</div>
              <div class="evt-patient" *ngIf="!evt.short">{{ evt.patient }}</div>
            </div>
          </ng-container>
        </div>
      </div>
    </div>
  </div>

  <!-- LIST VIEW -->
  <div *ngIf="viewMode() === 'list'">
    <div class="day-group" *ngFor="let day of scheduleDays">
      <div class="dg-header">
        <div class="dg-date">{{ day.label }}</div>
        <div class="dg-count">{{ day.events.length }} appointments</div>
      </div>
      <div class="wm-card">
        <div class="list-event" *ngFor="let e of day.events" [class.le-done]="e.done" [class.le-active]="e.active">
          <div class="le-time">
            <div class="let-hour">{{ e.time }}</div>
            <div class="let-dur">{{ e.dur }}</div>
          </div>
          <div class="le-bar" [style.background]="e.color"></div>
          <div class="le-body">
            <div class="le-title">{{ e.title }}</div>
            <div class="le-patient">
              <div class="avatar avatar-sm" [style.background]="e.avatarBg" [style.color]="e.avatarColor">{{ e.initials }}</div>
              <span>{{ e.patient }}</span>
            </div>
          </div>
          <div class="le-tags">
            <span class="badge" [class]="'badge-' + e.statusClass"><span class="badge-dot"></span>{{ e.status }}</span>
            <span class="chip" *ngIf="e.tag">{{ e.tag }}</span>
          </div>
          <a [routerLink]="'/appointments/' + e.id" mat-icon-button><mat-icon>open_in_new</mat-icon></a>
        </div>
      </div>
    </div>
  </div>

  <!-- Leave Requests -->
  <div class="wm-card mt-6">
    <div class="wm-card-header">
      <div class="wm-section-title">Leave & Unavailability</div>
      <button mat-stroked-button><mat-icon>add</mat-icon> Request Leave</button>
    </div>
    <div class="wm-table-wrap" style="border:none;border-radius:0;box-shadow:none">
      <table class="wm-table">
        <thead><tr><th>Type</th><th>From</th><th>To</th><th>Duration</th><th>Reason</th><th>Status</th></tr></thead>
        <tbody>
          <tr *ngFor="let l of leaveRequests">
            <td><span class="chip">{{ l.type }}</span></td>
            <td class="td-primary">{{ l.from }}</td>
            <td class="td-primary">{{ l.to }}</td>
            <td>{{ l.duration }}</td>
            <td style="color:var(--wm-muted);font-size:var(--fs-sm)">{{ l.reason }}</td>
            <td>
              <span class="badge" [class]="'badge-' + l.statusClass">
                <span class="badge-dot"></span>{{ l.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
  `,
  styles: [`
    .schedule-controls { display: flex; align-items: center; gap: 16px; margin-bottom: 20px; flex-wrap: wrap; }
    .week-nav { display: flex; align-items: center; gap: 8px; }
    .nav-btn {
      width: 32px; height: 32px; border: 1.5px solid var(--wm-border); background: var(--wm-surface); border-radius: var(--r-md);
      display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all var(--tr);
      &:hover { border-color: var(--wm-primary); color: var(--wm-primary); }
      mat-icon { font-size: 18px; width: 18px; height: 18px; }
    }
    .week-label { font-size: var(--fs-sm); font-weight: 600; color: var(--wm-text); min-width: 200px; text-align: center; }

    /* Week Calendar */
    .week-calendar {
      background: var(--wm-surface); border: 1px solid var(--wm-border-light);
      border-radius: var(--r-xl); box-shadow: var(--sh-card); overflow: auto; margin-bottom: 24px;
    }
    .wc-header {
      display: grid; grid-template-columns: 60px repeat(5, 1fr);
      border-bottom: 2px solid var(--wm-border); position: sticky; top: 0; background: var(--wm-surface); z-index: 2;
    }
    .wc-time-col { border-right: 1px solid var(--wm-border-light); }
    .wc-day-head {
      padding: 12px 8px; text-align: center; border-right: 1px solid var(--wm-border-light);
      &:last-child { border-right: none; }
      &.today { background: var(--wm-primary-subtle); }
    }
    .wdh-day { font-size: var(--fs-xs); font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--wm-muted); }
    .wdh-date {
      font-size: var(--fs-xl); font-weight: 800; color: var(--wm-text); line-height: 1.2; margin-top: 2px;
      &.today-badge { color: white; background: var(--wm-primary); width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 4px auto 0; font-size: var(--fs-md); }
    }

    .wc-body { display: flex; flex-direction: column; min-height: 500px; }
    .wc-row { display: grid; grid-template-columns: 60px repeat(5, 1fr); border-bottom: 1px solid var(--wm-border-light); min-height: 60px; &:last-child { border-bottom: none; } }
    .wc-time { padding: 8px; font-size: var(--fs-xs); color: var(--wm-muted-light); font-weight: 500; border-right: 1px solid var(--wm-border-light); text-align: right; }
    .wc-cell { padding: 4px; border-right: 1px solid var(--wm-border-light); min-height: 60px; position: relative; &:last-child { border-right: none; } &.today { background: rgba(0,92,187,0.03); } }

    .cal-event {
      border-radius: var(--r-md); padding: 6px 8px; margin-bottom: 3px;
      border-left: 3px solid; cursor: pointer; transition: opacity var(--tr), box-shadow var(--tr);
      &:hover { box-shadow: var(--sh-md); }
    }
    .evt-time   { font-size: 10px; font-weight: 600; color: inherit; opacity: 0.7; }
    .evt-title  { font-size: var(--fs-xs); font-weight: 700; color: inherit; line-height: 1.3; }
    .evt-patient{ font-size: 10px; color: inherit; opacity: 0.75; margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .evt-short { padding: 3px 6px; .evt-title { font-size: 10px; } }

    /* List view */
    .day-group { margin-bottom: 20px; }
    .dg-header {
      display: flex; align-items: baseline; gap: 12px; margin-bottom: 10px;
    }
    .dg-date { font-size: var(--fs-md); font-weight: 700; color: var(--wm-text); }
    .dg-count { font-size: var(--fs-xs); color: var(--wm-muted); }

    .list-event {
      display: flex; align-items: center; gap: 14px;
      padding: 14px 24px; border-bottom: 1px solid var(--wm-border-light);
      transition: background var(--tr);
      &:last-child { border-bottom: none; }
      &:hover { background: var(--wm-primary-subtle); }
      &.le-done { opacity: 0.55; }
      &.le-active { background: var(--wm-primary-subtle); }
    }
    .le-time { min-width: 60px; text-align: right; }
    .let-hour { font-size: var(--fs-sm); font-weight: 700; color: var(--wm-text); }
    .let-dur  { font-size: var(--fs-xs); color: var(--wm-muted-light); }
    .le-bar { width: 4px; height: 42px; border-radius: 2px; flex-shrink: 0; }
    .le-body { flex: 1; }
    .le-title { font-size: var(--fs-sm); font-weight: 600; color: var(--wm-text); }
    .le-patient { display: flex; align-items: center; gap: 6px; margin-top: 4px; font-size: var(--fs-xs); color: var(--wm-muted); }
    .le-tags { display: flex; gap: 6px; flex-wrap: wrap; }

    .mt-6 { margin-top: 24px; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DoctorScheduleComponent {
  readonly viewMode = signal<'week' | 'list'>('week');

  readonly views = [
    { key: 'week' as const, label: 'Week View' },
    { key: 'list' as const, label: 'List View' },
  ];

  readonly currentWeekLabel = 'April 28 – May 2, 2025';

  readonly weekDays = [
    { day: 'Mon', date: '28', dayKey: 'mon', today: false },
    { day: 'Tue', date: '29', dayKey: 'tue', today: true },
    { day: 'Wed', date: '30', dayKey: 'wed', today: false },
    { day: 'Thu', date: '1',  dayKey: 'thu', today: false },
    { day: 'Fri', date: '2',  dayKey: 'fri', today: false },
  ];

  readonly hours = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'];

  readonly calEvents: Record<string, Record<string, any[]>> = {
    mon: {
      '09:00': [{ time:'09:00', title:'General Check-up', patient:'Claire Bernard', bg:'rgba(0,92,187,0.08)', color:'var(--wm-primary)', short:false }],
      '11:00': [{ time:'11:00', title:'ECG Follow-up', patient:'Jean Moreau', bg:'rgba(8,145,178,0.08)', color:'var(--wm-teal)', short:false }],
    },
    tue: {
      '08:00': [{ time:'08:30', title:'Annual Check-up', patient:'J.P. Moreau', bg:'rgba(21,128,61,0.08)', color:'var(--wm-success)', short:false }],
      '09:00': [{ time:'09:15', title:'Chest Pain', patient:'I. Tremblay', bg:'rgba(21,128,61,0.08)', color:'var(--wm-success)', short:false }],
      '10:00': [{ time:'10:30', title:'Cardiology Consult', patient:'Marie Dupont', bg:'rgba(0,92,187,0.1)', color:'var(--wm-primary)', short:false }],
      '11:00': [{ time:'11:30', title:'ECG Follow-up', patient:'R. Lefevre', bg:'rgba(0,92,187,0.08)', color:'var(--wm-primary)', short:true }],
      '14:00': [{ time:'14:00', title:'Stress Test Consult', patient:'S. Beaumont', bg:'rgba(109,40,217,0.07)', color:'var(--wm-violet)', short:false }],
    },
    wed: {
      '10:00': [{ time:'10:00', title:'Post-op Follow-up', patient:'H. Marchand', bg:'rgba(185,28,28,0.07)', color:'var(--wm-danger)', short:false }],
      '14:00': [{ time:'14:30', title:'New Patient', patient:'F. Petit', bg:'rgba(0,92,187,0.08)', color:'var(--wm-primary)', short:false }],
    },
    thu: {
      '09:00': [{ time:'09:00', title:'Annual Cardiology', patient:'A. Rousseau', bg:'rgba(21,128,61,0.08)', color:'var(--wm-success)', short:false }],
      '11:00': [{ time:'11:00', title:'Consultation', patient:'N. Leclerc', bg:'rgba(0,92,187,0.08)', color:'var(--wm-primary)', short:false }],
    },
    fri: {
      '08:00': [{ time:'08:00', title:'Team Meeting', patient:'', bg:'rgba(180,83,9,0.08)', color:'var(--wm-warning)', short:false }],
      '10:00': [{ time:'10:00', title:'Cardiology Consult', patient:'P. Dubois', bg:'rgba(0,92,187,0.08)', color:'var(--wm-primary)', short:false }],
    }
  };

  getEventsForSlot(dayKey: string, hour: string): any[] {
    return this.calEvents[dayKey]?.[hour] ?? [];
  }

  readonly scheduleDays = [
    {
      label: 'Today — Tuesday, April 29',
      events: [
        { id:'2', time:'08:30', dur:'30 min', title:'Annual Cardiology Check-up', patient:'Jean-Pierre Moreau', initials:'JM', status:'Completed', statusClass:'completed', tag:'', color:'var(--wm-success-mid)', avatarBg:'var(--wm-teal-light)', avatarColor:'var(--wm-teal)', done:true, active:false },
        { id:'3', time:'09:15', dur:'45 min', title:'Chest Pain Investigation', patient:'Isabelle Tremblay', initials:'IT', status:'Completed', statusClass:'completed', tag:'', color:'var(--wm-success-mid)', avatarBg:'var(--wm-success-light)', avatarColor:'var(--wm-success)', done:true, active:false },
        { id:'1', time:'10:30', dur:'30 min', title:'Cardiology Consultation', patient:'Marie Dupont', initials:'MD', status:'In Progress', statusClass:'inprogress', tag:'Priority', color:'var(--wm-primary)', avatarBg:'var(--wm-primary-light)', avatarColor:'var(--wm-primary)', done:false, active:true },
        { id:'4', time:'11:30', dur:'30 min', title:'ECG Follow-up', patient:'Robert Lefevre', initials:'RL', status:'Approved', statusClass:'approved', tag:'', color:'var(--wm-teal)', avatarBg:'var(--wm-warning-light)', avatarColor:'var(--wm-warning)', done:false, active:false },
        { id:'5', time:'14:00', dur:'60 min', title:'Stress Test Consultation', patient:'Sylvie Beaumont', initials:'SB', status:'Approved', statusClass:'approved', tag:'Lab', color:'var(--wm-teal)', avatarBg:'var(--wm-violet-light)', avatarColor:'var(--wm-violet)', done:false, active:false },
      ]
    },
    {
      label: 'Wednesday, April 30',
      events: [
        { id:'6', time:'10:00', dur:'30 min', title:'Post-op Cardiac Follow-up', patient:'Henri Marchand', initials:'HM', status:'Approved', statusClass:'approved', tag:'', color:'var(--wm-primary)', avatarBg:'var(--wm-danger-light)', avatarColor:'var(--wm-danger)', done:false, active:false },
        { id:'7', time:'14:30', dur:'30 min', title:'New Patient Consultation', patient:'François Petit', initials:'FP', status:'Pending', statusClass:'pending', tag:'New', color:'var(--wm-warning-mid)', avatarBg:'var(--wm-primary-light)', avatarColor:'var(--wm-primary)', done:false, active:false },
      ]
    }
  ];

  readonly leaveRequests = [
    { type: 'Annual Leave', from: 'Jun 2, 2025', to: 'Jun 6, 2025',   duration: '5 days',  reason: 'Vacation',            status: 'Approved', statusClass: 'approved' },
    { type: 'Conference',   from: 'Jul 14, 2025',to: 'Jul 16, 2025',  duration: '3 days',  reason: 'ESC Congress 2025',    status: 'Approved', statusClass: 'approved' },
    { type: 'Medical',      from: 'Aug 1, 2025', to: 'Aug 1, 2025',   duration: '1 day',   reason: 'Personal appointment', status: 'Pending',  statusClass: 'pending' },
  ];

  prevWeek(): void {}
  nextWeek(): void {}
  goToday(): void {}
}
