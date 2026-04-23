import { NgFor, NgIf, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

type StatusFilter = 'ALL' | 'approved' | 'inprogress' | 'pending' | 'requested' | 'completed' | 'cancelled' | 'noshow';

@Component({
  selector: 'wm-appointment-list',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, RouterLink, MatIconModule, MatButtonModule, MatTooltipModule],
  template: `
<div class="wm-page">
  <div class="wm-page-header">
    <div>
      <p class="wm-eyebrow">Appointments</p>
      <h1 class="wm-page-title">All Appointments</h1>
    </div>
    <div class="page-header-actions">
      <button mat-stroked-button>
        <mat-icon>download</mat-icon> Export
      </button>
      <a routerLink="/appointments/new" mat-raised-button color="primary">
        <mat-icon>add</mat-icon> New Appointment
      </a>
    </div>
  </div>

  <!-- Filters -->
  <div class="filters-bar">
    <div class="wm-search-input">
      <mat-icon>search</mat-icon>
      <input type="text" placeholder="Search patient, doctor, service…" (input)="setSearch($event)" />
    </div>
    <div class="status-filters">
      <button *ngFor="let f of statusFilters" class="sf-btn"
        [class.active]="activeFilter() === f.key" (click)="setFilter(f.key)">
        <span class="badge-dot" [style.background]="f.color"></span>
        {{ f.label }}
        <span class="sf-count">{{ f.count }}</span>
      </button>
    </div>
    <div class="filter-right">
      <button mat-stroked-button class="filter-btn"><mat-icon>tune</mat-icon> Filters</button>
      <button mat-stroked-button class="filter-btn"><mat-icon>sort</mat-icon> Sort</button>
    </div>
  </div>

  <!-- KPI strip -->
  <div class="kpi-strip">
    <div class="ks-item" *ngFor="let k of kpiStrip">
      <div class="ks-val">{{ k.val }}</div>
      <div class="ks-label">{{ k.label }}</div>
      <div class="ks-bar" [style.background]="k.color"></div>
    </div>
  </div>

  <!-- Table -->
  <div class="wm-table-wrap">
    <table class="wm-table">
      <thead>
        <tr>
          <th>Patient</th>
          <th>Service / Doctor</th>
          <th>Date & Time</th>
          <th>Status</th>
          <th>Type</th>
          <th>Notes</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let a of filteredApts()">
          <td>
            <div class="patient-cell">
              <div class="avatar avatar-sm" [style.background]="a.avatarBg" [style.color]="a.avatarColor">{{ a.initials }}</div>
              <div>
                <div class="td-primary">{{ a.patient }}</div>
                <div class="td-mono">{{ a.patientRef }}</div>
              </div>
            </div>
          </td>
          <td>
            <div class="td-primary">{{ a.service }}</div>
            <div style="font-size:var(--fs-xs);color:var(--wm-muted)">{{ a.doctor }}</div>
          </td>
          <td>
            <div class="td-primary">{{ a.date }}</div>
            <div style="font-size:var(--fs-xs);color:var(--wm-muted)">{{ a.time }}</div>
          </td>
          <td>
            <span class="badge" [class]="'badge-' + a.statusClass">
              <span class="badge-dot"></span>{{ a.status }}
            </span>
          </td>
          <td><span class="chip">{{ a.type }}</span></td>
          <td>
            <span class="notes-preview" *ngIf="a.notes">{{ a.notes }}</span>
            <span style="color:var(--wm-muted-light);font-size:var(--fs-xs)" *ngIf="!a.notes">—</span>
          </td>
          <td>
            <div class="row-actions">
              <a [routerLink]="'/appointments/' + a.id" mat-icon-button matTooltip="View details">
                <mat-icon>visibility</mat-icon>
              </a>
              <a [routerLink]="'/appointments/' + a.id + '/edit'" mat-icon-button matTooltip="Edit">
                <mat-icon>edit</mat-icon>
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="wm-empty" *ngIf="filteredApts().length === 0">
      <mat-icon class="empty-icon">event_busy</mat-icon>
      <div class="empty-title">No appointments found</div>
      <div class="empty-body">Try adjusting your search or filters.</div>
    </div>
  </div>

  <div class="pagination">
    <span class="pg-info">Showing {{ filteredApts().length }} of {{ appointments.length }} appointments</span>
    <div class="pg-btns">
      <button mat-stroked-button disabled>← Previous</button>
      <button class="pg-num active">1</button>
      <button class="pg-num">2</button>
      <button class="pg-num">3</button>
      <button mat-stroked-button>Next →</button>
    </div>
  </div>
</div>
  `,
  styles: [`
    .page-header-actions { display: flex; gap: 10px; }
    .filters-bar { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; }
    .status-filters { display: flex; gap: 4px; flex-wrap: wrap; }
    .sf-btn {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 6px 12px; border-radius: var(--r-md);
      border: 1.5px solid var(--wm-border); background: var(--wm-surface);
      font-family: var(--wm-font); font-size: var(--fs-sm); font-weight: 500; color: var(--wm-muted);
      cursor: pointer; transition: all var(--tr);
      &:hover { border-color: var(--wm-primary); color: var(--wm-primary); }
      &.active { border-color: var(--wm-primary); background: var(--wm-primary-light); color: var(--wm-primary-strong); font-weight: 600; }
    }
    .sf-count {
      background: var(--wm-bg); color: var(--wm-muted); font-size: var(--fs-xs); font-weight: 700;
      padding: 0 5px; border-radius: var(--r-full); min-width: 18px; text-align: center;
    }
    .filter-right { display: flex; gap: 8px; margin-left: auto; }
    .filter-btn { font-size: var(--fs-sm) !important; }

    .kpi-strip {
      display: flex; background: var(--wm-surface); border: 1px solid var(--wm-border-light);
      border-radius: var(--r-xl); box-shadow: var(--sh-card); overflow: hidden; margin-bottom: 20px;
    }
    .ks-item { flex: 1; padding: 14px 20px; border-right: 1px solid var(--wm-border-light); position: relative; &:last-child { border-right: none; } }
    .ks-val { font-size: var(--fs-2xl); font-weight: 800; color: var(--wm-text-strong); letter-spacing: -0.02em; line-height: 1; }
    .ks-label { font-size: var(--fs-xs); color: var(--wm-muted); margin-top: 4px; font-weight: 500; }
    .ks-bar { position: absolute; bottom: 0; left: 0; right: 0; height: 3px; opacity: 0.7; }

    .patient-cell { display: flex; align-items: center; gap: 10px; }
    .notes-preview { font-size: var(--fs-xs); color: var(--wm-muted); max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: block; }
    .row-actions { display: flex; gap: 2px; }

    .pagination { display: flex; align-items: center; justify-content: space-between; padding: 16px 0; flex-wrap: wrap; gap: 12px; }
    .pg-info { font-size: var(--fs-sm); color: var(--wm-muted); }
    .pg-btns { display: flex; align-items: center; gap: 4px; }
    .pg-num {
      width: 32px; height: 32px; border: 1.5px solid var(--wm-border); background: var(--wm-surface);
      border-radius: var(--r-sm); font-size: var(--fs-sm); font-weight: 500; color: var(--wm-muted); cursor: pointer; transition: all var(--tr);
      &.active { background: var(--wm-primary); border-color: var(--wm-primary); color: white; }
      &:hover:not(.active) { border-color: var(--wm-primary); color: var(--wm-primary); }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppointmentListComponent {
  readonly search       = signal('');
  readonly activeFilter = signal<StatusFilter>('ALL' as StatusFilter);

  readonly statusFilters = [
    { key: 'ALL' as StatusFilter,       label: 'All',        color: 'var(--wm-muted)',        count: 10 },
    { key: 'approved' as StatusFilter,  label: 'Approved',   color: 'var(--wm-teal)',         count: 3 },
    { key: 'pending' as StatusFilter,   label: 'Pending',    color: 'var(--wm-warning-mid)',  count: 2 },
    { key: 'requested' as StatusFilter, label: 'Requested',  color: 'var(--wm-primary)',      count: 2 },
    { key: 'completed' as StatusFilter, label: 'Completed',  color: 'var(--wm-success-mid)',  count: 1 },
    { key: 'cancelled' as StatusFilter, label: 'Cancelled',  color: 'var(--wm-danger-mid)',   count: 1 },
    { key: 'noshow' as StatusFilter,    label: 'No-Show',    color: 'var(--wm-muted-light)',  count: 1 },
  ];

  readonly kpiStrip = [
    { val: '87', label: 'Total Today',   color: 'var(--wm-primary)' },
    { val: '52', label: 'Approved',      color: 'var(--wm-teal)' },
    { val: '14', label: 'Pending',       color: 'var(--wm-warning-mid)' },
    { val: '28', label: 'Completed',     color: 'var(--wm-success-mid)' },
    { val: '7',  label: 'Cancelled',     color: 'var(--wm-danger-mid)' },
    { val: '3',  label: 'No-Show',       color: 'var(--wm-muted-light)' },
  ];

  readonly appointments = [
    { id:'1',  patient:'Marie Dupont',       patientRef:'PAT-00124', initials:'MD', service:'Cardiology Consultation', doctor:'Dr. Éric Fontaine', date:'Apr 29, 2025', time:'10:30 AM', status:'Approved',    statusClass:'approved',  type:'Consultation', notes:'Priority — follow-up on ECG', avatarBg:'var(--wm-primary-light)', avatarColor:'var(--wm-primary)' },
    { id:'2',  patient:'Jean-Pierre Moreau', patientRef:'PAT-00089', initials:'JM', service:'General Check-up',        doctor:'Dr. Claire Martin', date:'Apr 29, 2025', time:'11:00 AM', status:'In Progress', statusClass:'inprogress',type:'Check-up',     notes:'',                           avatarBg:'var(--wm-teal-light)',    avatarColor:'var(--wm-teal)' },
    { id:'3',  patient:'Isabelle Tremblay',  patientRef:'PAT-00211', initials:'IT', service:'Dermatology Follow-up',   doctor:'Dr. Sophie Renard', date:'Apr 29, 2025', time:'14:00 PM', status:'Approved',    statusClass:'approved',  type:'Follow-up',    notes:'',                           avatarBg:'var(--wm-success-light)', avatarColor:'var(--wm-success)' },
    { id:'4',  patient:'Robert Lefevre',     patientRef:'PAT-00045', initials:'RL', service:'Radiology – Chest X-Ray',doctor:'Dr. Yann Leblanc',  date:'Apr 30, 2025', time:'09:15 AM', status:'Pending',     statusClass:'pending',   type:'Imaging',      notes:'Awaiting insurance pre-auth', avatarBg:'var(--wm-warning-light)', avatarColor:'var(--wm-warning)' },
    { id:'5',  patient:'Sylvie Beaumont',    patientRef:'PAT-00302', initials:'SB', service:'Neurology Consultation',  doctor:'Dr. Marc Delacroix',date:'May 2, 2025',  time:'10:00 AM', status:'Requested',   statusClass:'requested', type:'Consultation', notes:'New patient referral',        avatarBg:'var(--wm-violet-light)',  avatarColor:'var(--wm-violet)' },
    { id:'6',  patient:'Henri Marchand',     patientRef:'PAT-00178', initials:'HM', service:'Cardiology – Stress Test',doctor:'Dr. Éric Fontaine',date:'May 5, 2025',  time:'08:30 AM', status:'Approved',    statusClass:'approved',  type:'Procedure',    notes:'Fasting required',           avatarBg:'var(--wm-danger-light)',  avatarColor:'var(--wm-danger)' },
    { id:'7',  patient:'Claire Bernard',     patientRef:'PAT-00094', initials:'CB', service:'General Check-up',        doctor:'Dr. Claire Martin', date:'Apr 28, 2025', time:'16:00 PM', status:'Completed',   statusClass:'completed', type:'Check-up',     notes:'',                           avatarBg:'var(--wm-bg-soft)',        avatarColor:'var(--wm-muted)' },
    { id:'8',  patient:'Alain Rousseau',     patientRef:'PAT-00057', initials:'AR', service:'Cardiology Consultation', doctor:'Dr. Éric Fontaine',date:'Apr 25, 2025', time:'11:30 AM', status:'No-Show',     statusClass:'noshow',    type:'Consultation', notes:'2nd no-show event',          avatarBg:'var(--wm-bg-soft)',        avatarColor:'var(--wm-muted)' },
    { id:'9',  patient:'Nadia Leclerc',      patientRef:'PAT-00381', initials:'NL', service:'Dermatology',             doctor:'Dr. Sophie Renard', date:'Apr 24, 2025', time:'09:00 AM', status:'Cancelled',   statusClass:'cancelled', type:'Consultation', notes:'Cancelled by patient',       avatarBg:'var(--wm-danger-light)',  avatarColor:'var(--wm-danger)' },
    { id:'10', patient:'François Petit',     patientRef:'PAT-00266', initials:'FP', service:'General Medicine',        doctor:'Dr. Claire Martin', date:'May 7, 2025',  time:'15:30 PM', status:'Requested',   statusClass:'requested', type:'Consultation', notes:'',                           avatarBg:'var(--wm-primary-light)', avatarColor:'var(--wm-primary)' },
  ];

  readonly filteredApts = computed(() => {
    const q = this.search().toLowerCase();
    const f = this.activeFilter();
    return this.appointments.filter(a => {
      const matchFilter = (f as string) === 'ALL' || a.statusClass === f;
      const matchSearch = !q || a.patient.toLowerCase().includes(q) || a.service.toLowerCase().includes(q) || a.doctor.toLowerCase().includes(q);
      return matchFilter && matchSearch;
    });
  });

  setSearch(e: Event): void { this.search.set((e.target as HTMLInputElement).value); }
  setFilter(key: StatusFilter): void { this.activeFilter.set(key); }
}
