import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'wm-patient-list',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, MatIconModule, MatButtonModule, MatTooltipModule],
  template: `
<div class="wm-page">
  <div class="wm-page-header">
    <div>
      <p class="wm-eyebrow">Patients</p>
      <h1 class="wm-page-title">Patient Directory</h1>
    </div>
    <div style="display:flex;gap:10px">
      <button mat-stroked-button><mat-icon>download</mat-icon> Export</button>
      <a routerLink="/patients/new" mat-raised-button color="primary"><mat-icon>person_add</mat-icon> Add Patient</a>
    </div>
  </div>

  <!-- View Toggle + Search + Filters -->
  <div class="toolbar">
    <div class="wm-search-input" style="flex:1;max-width:380px">
      <mat-icon>search</mat-icon>
      <input type="text" placeholder="Search by name, ID, phone, email…" (input)="setSearch($event)" />
    </div>
    <div class="wm-tabs">
      <button class="wm-tab" [class.active]="viewMode() === 'table'" (click)="viewMode.set('table')">
        <mat-icon>table_rows</mat-icon> Table
      </button>
      <button class="wm-tab" [class.active]="viewMode() === 'cards'" (click)="viewMode.set('cards')">
        <mat-icon>grid_view</mat-icon> Cards
      </button>
    </div>
    <button mat-stroked-button><mat-icon>tune</mat-icon> Filters</button>
  </div>

  <!-- Stats row -->
  <div class="stats-row">
    <div class="stat-item" *ngFor="let s of stats">
      <div class="stat-val" [style.color]="s.color">{{ s.val }}</div>
      <div class="stat-label">{{ s.label }}</div>
    </div>
  </div>

  <!-- TABLE VIEW -->
  <div class="wm-table-wrap" *ngIf="viewMode() === 'table'">
    <table class="wm-table">
      <thead>
        <tr>
          <th>Patient</th>
          <th>Date of Birth</th>
          <th>Contact</th>
          <th>Last Visit</th>
          <th>Active Treatments</th>
          <th>Insurance</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let p of filteredPatients()">
          <td>
            <div style="display:flex;align-items:center;gap:12px">
              <div class="avatar avatar-sm" [style.background]="p.avatarBg" [style.color]="p.avatarColor">{{ p.initials }}</div>
              <div>
                <div class="td-primary">{{ p.name }}</div>
                <div class="td-mono">{{ p.ref }}</div>
              </div>
            </div>
          </td>
          <td>
            <div class="td-primary">{{ p.dob }}</div>
            <div style="font-size:var(--fs-xs);color:var(--wm-muted)">{{ p.age }} years · {{ p.gender }}</div>
          </td>
          <td>
            <div style="font-size:var(--fs-sm);color:var(--wm-text)">{{ p.phone }}</div>
            <div style="font-size:var(--fs-xs);color:var(--wm-muted)">{{ p.email }}</div>
          </td>
          <td>
            <div class="td-primary">{{ p.lastVisit }}</div>
            <div style="font-size:var(--fs-xs);color:var(--wm-muted)">{{ p.lastDoctor }}</div>
          </td>
          <td>
            <span *ngIf="p.treatments > 0" class="badge badge-active">{{ p.treatments }} active</span>
            <span *ngIf="p.treatments === 0" style="color:var(--wm-muted-light);font-size:var(--fs-xs)">None</span>
          </td>
          <td>
            <span class="chip">{{ p.insurance }}</span>
          </td>
          <td>
            <div style="display:flex;gap:2px">
              <a [routerLink]="'/patients/' + p.id" mat-icon-button matTooltip="View profile">
                <mat-icon>visibility</mat-icon>
              </a>
              <a [routerLink]="'/appointments/new'" mat-icon-button matTooltip="Book appointment">
                <mat-icon>event_available</mat-icon>
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="wm-empty" *ngIf="filteredPatients().length === 0">
      <mat-icon class="empty-icon">people_outline</mat-icon>
      <div class="empty-title">No patients found</div>
      <div class="empty-body">Adjust your search query to find the patient you're looking for.</div>
    </div>
  </div>

  <!-- CARDS VIEW -->
  <div class="patients-cards-grid" *ngIf="viewMode() === 'cards'">
    <div class="patient-card" *ngFor="let p of filteredPatients()">
      <div class="pc-top">
        <div class="avatar avatar-lg" [style.background]="p.avatarBg" [style.color]="p.avatarColor">{{ p.initials }}</div>
        <div class="pc-info">
          <div class="pc-name">{{ p.name }}</div>
          <div class="pc-ref">{{ p.ref }}</div>
          <div class="pc-meta">{{ p.age }} y/o · {{ p.gender }} · {{ p.bloodType }}</div>
        </div>
      </div>
      <div class="pc-divider"></div>
      <div class="pc-details">
        <div class="pcd-item"><mat-icon>phone</mat-icon>{{ p.phone }}</div>
        <div class="pcd-item"><mat-icon>calendar_today</mat-icon>Last: {{ p.lastVisit }}</div>
        <div class="pcd-item" *ngIf="p.treatments > 0"><mat-icon>medication</mat-icon>{{ p.treatments }} treatment(s)</div>
      </div>
      <div class="pc-tags">
        <span class="chip">{{ p.insurance }}</span>
        <span *ngIf="p.allergies" class="badge badge-danger">{{ p.allergies }}</span>
      </div>
      <div class="pc-actions">
        <a [routerLink]="'/patients/' + p.id" mat-stroked-button style="flex:1;font-size:var(--fs-xs)!important">View</a>
        <a routerLink="/appointments/new" mat-raised-button color="primary" style="flex:1;font-size:var(--fs-xs)!important">Book</a>
      </div>
    </div>
  </div>

  <div class="pagination">
    <span class="pg-info">{{ filteredPatients().length }} patients</span>
    <div class="pg-btns">
      <button mat-stroked-button disabled>← Prev</button>
      <button class="pg-num active">1</button>
      <button class="pg-num">2</button>
      <button class="pg-num">3</button>
      <button mat-stroked-button>Next →</button>
    </div>
  </div>
</div>
  `,
  styles: [`
    .toolbar { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; }
    .stats-row {
      display: flex; gap: 0; background: var(--wm-surface); border: 1px solid var(--wm-border-light);
      border-radius: var(--r-xl); box-shadow: var(--sh-card); margin-bottom: 20px; overflow: hidden;
    }
    .stat-item { flex: 1; padding: 14px 20px; border-right: 1px solid var(--wm-border-light); &:last-child { border-right: none; } }
    .stat-val   { font-size: var(--fs-2xl); font-weight: 800; letter-spacing: -0.02em; line-height: 1; }
    .stat-label { font-size: var(--fs-xs); color: var(--wm-muted); margin-top: 4px; font-weight: 500; }

    .patients-cards-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; margin-bottom: 20px;
    }
    .patient-card {
      background: var(--wm-surface); border: 1px solid var(--wm-border-light); border-radius: var(--r-xl);
      padding: 20px; box-shadow: var(--sh-card); transition: box-shadow var(--tr), transform var(--tr);
      &:hover { box-shadow: var(--sh-md); transform: translateY(-2px); }
    }
    .pc-top { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
    .pc-info {}
    .pc-name { font-size: var(--fs-md); font-weight: 700; color: var(--wm-text-strong); }
    .pc-ref  { font-size: var(--fs-xs); color: var(--wm-muted-light); font-family: var(--wm-font-mono); margin: 2px 0; }
    .pc-meta { font-size: var(--fs-xs); color: var(--wm-muted); }
    .pc-divider { height: 1px; background: var(--wm-border-light); margin: 0 0 12px; }
    .pc-details { display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px; }
    .pcd-item {
      display: flex; align-items: center; gap: 6px; font-size: var(--fs-sm); color: var(--wm-muted);
      mat-icon { font-size: 14px; width: 14px; height: 14px; color: var(--wm-muted-light); }
    }
    .pc-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 14px; }
    .pc-actions { display: flex; gap: 8px; }

    .pagination { display: flex; align-items: center; justify-content: space-between; padding: 16px 0; flex-wrap: wrap; gap: 12px; }
    .pg-info { font-size: var(--fs-sm); color: var(--wm-muted); }
    .pg-btns { display: flex; align-items: center; gap: 4px; }
    .pg-num {
      width: 32px; height: 32px; border: 1.5px solid var(--wm-border); background: var(--wm-surface);
      border-radius: var(--r-sm); font-size: var(--fs-sm); font-weight: 500; color: var(--wm-muted); cursor: pointer; transition: all var(--tr);
      &.active { background: var(--wm-primary); border-color: var(--wm-primary); color: white; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientListComponent {
  readonly search   = signal('');
  readonly viewMode = signal<'table' | 'cards'>('table');

  readonly stats = [
    { val: '1,248', label: 'Total Patients',   color: 'var(--wm-primary)' },
    { val: '87',    label: 'New This Month',    color: 'var(--wm-teal)' },
    { val: '342',   label: 'Active Treatments', color: 'var(--wm-success)' },
    { val: '23',    label: 'Critical Cases',    color: 'var(--wm-danger)' },
    { val: '8',     label: 'Pending Admission', color: 'var(--wm-warning)' },
  ];

  readonly patients = [
    { id:'1',  name:'Marie Dupont',          ref:'PAT-00124', initials:'MD', dob:'14/03/1978', age:47, gender:'F', bloodType:'A+', phone:'+33 6 12 34 56 78', email:'marie.dupont@mail.fr',      lastVisit:'Apr 10, 2025', lastDoctor:'Dr. Fontaine',   treatments:2, insurance:'CPAM',        allergies:'Penicillin', avatarBg:'var(--wm-primary-light)', avatarColor:'var(--wm-primary)' },
    { id:'2',  name:'Jean-Pierre Moreau',    ref:'PAT-00089', initials:'JM', dob:'22/07/1965', age:59, gender:'M', bloodType:'O+', phone:'+33 6 23 45 67 89', email:'jp.moreau@gmail.com',        lastVisit:'Apr 29, 2025', lastDoctor:'Dr. Martin',     treatments:1, insurance:'Mutuelle',    allergies:'',          avatarBg:'var(--wm-teal-light)',    avatarColor:'var(--wm-teal)' },
    { id:'3',  name:'Isabelle Tremblay',     ref:'PAT-00211', initials:'IT', dob:'05/11/1990', age:34, gender:'F', bloodType:'B+', phone:'+33 6 34 56 78 90', email:'isabelle.t@outlook.fr',      lastVisit:'Apr 29, 2025', lastDoctor:'Dr. Renard',     treatments:0, insurance:'CPAM',        allergies:'',          avatarBg:'var(--wm-success-light)', avatarColor:'var(--wm-success)' },
    { id:'4',  name:'Robert Lefevre',        ref:'PAT-00045', initials:'RL', dob:'18/02/1958', age:67, gender:'M', bloodType:'AB-',phone:'+33 6 45 67 89 01', email:'r.lefevre@wanadoo.fr',       lastVisit:'Mar 15, 2025', lastDoctor:'Dr. Leblanc',    treatments:3, insurance:'CPAM',        allergies:'Aspirin',   avatarBg:'var(--wm-warning-light)', avatarColor:'var(--wm-warning)' },
    { id:'5',  name:'Sylvie Beaumont',       ref:'PAT-00302', initials:'SB', dob:'30/09/1982', age:42, gender:'F', bloodType:'A-', phone:'+33 6 56 78 90 12', email:'sylvie.b@free.fr',           lastVisit:'Feb 20, 2025', lastDoctor:'Dr. Delacroix',  treatments:1, insurance:'Mutuelle',    allergies:'',          avatarBg:'var(--wm-violet-light)',  avatarColor:'var(--wm-violet)' },
    { id:'6',  name:'Henri Marchand',        ref:'PAT-00178', initials:'HM', dob:'14/06/1972', age:52, gender:'M', bloodType:'O-', phone:'+33 6 67 89 01 23', email:'h.marchand@gmail.com',       lastVisit:'Jan 30, 2025', lastDoctor:'Dr. Fontaine',   treatments:2, insurance:'CMU',         allergies:'',          avatarBg:'var(--wm-danger-light)',  avatarColor:'var(--wm-danger)' },
    { id:'7',  name:'Claire Bernard',        ref:'PAT-00094', initials:'CB', dob:'28/04/1995', age:30, gender:'F', bloodType:'B-', phone:'+33 6 78 90 12 34', email:'c.bernard@mail.fr',          lastVisit:'Apr 28, 2025', lastDoctor:'Dr. Martin',     treatments:0, insurance:'CPAM',        allergies:'',          avatarBg:'var(--wm-bg-soft)',        avatarColor:'var(--wm-muted)' },
    { id:'8',  name:'Alain Rousseau',        ref:'PAT-00057', initials:'AR', dob:'12/12/1970', age:54, gender:'M', bloodType:'A+', phone:'+33 6 89 01 23 45', email:'a.rousseau@sfr.fr',          lastVisit:'Apr 25, 2025', lastDoctor:'Dr. Fontaine',   treatments:1, insurance:'Mutuelle',    allergies:'',          avatarBg:'var(--wm-bg-soft)',        avatarColor:'var(--wm-muted)' },
  ];

  readonly filteredPatients = computed(() => {
    const q = this.search().toLowerCase();
    return !q ? this.patients : this.patients.filter(p =>
      p.name.toLowerCase().includes(q) || p.ref.toLowerCase().includes(q) || p.phone.includes(q)
    );
  });

  setSearch(e: Event): void { this.search.set((e.target as HTMLInputElement).value); }
}
