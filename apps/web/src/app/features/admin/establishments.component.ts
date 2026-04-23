import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'wm-establishments',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, MatIconModule, MatButtonModule],
  template: `
<div class="wm-page">
  <div class="wm-page-header">
    <div>
      <p class="wm-eyebrow">Administration</p>
      <h1 class="wm-page-title">Establishments</h1>
    </div>
    <button mat-raised-button color="primary"><mat-icon>add</mat-icon> Add Establishment</button>
  </div>

  <!-- Establishments Grid -->
  <div class="est-grid">
    <div class="est-card" *ngFor="let e of establishments" [class.est-active]="e.active">
      <div class="est-card-header" [style.background]="e.gradient">
        <div class="est-badge">
          <mat-icon>business</mat-icon>
        </div>
        <div class="est-status">
          <span class="badge" [class]="e.active ? 'badge-active' : 'badge-neutral'">
            <span class="badge-dot"></span>{{ e.active ? 'Active' : 'Inactive' }}
          </span>
        </div>
      </div>
      <div class="est-body">
        <div class="est-name">{{ e.name }}</div>
        <div class="est-type">{{ e.type }}</div>
        <div class="est-address">
          <mat-icon>location_on</mat-icon>{{ e.address }}
        </div>
        <div class="est-stats">
          <div class="es-item">
            <div class="es-val">{{ e.services }}</div>
            <div class="es-label">Services</div>
          </div>
          <div class="es-item">
            <div class="es-val">{{ e.doctors }}</div>
            <div class="es-label">Doctors</div>
          </div>
          <div class="es-item">
            <div class="es-val">{{ e.patients }}</div>
            <div class="es-label">Patients</div>
          </div>
          <div class="es-item">
            <div class="es-val">{{ e.beds }}</div>
            <div class="es-label">Beds</div>
          </div>
        </div>
        <div class="est-services-preview">
          <span class="chip" *ngFor="let s of e.serviceList.slice(0, 3)">{{ s }}</span>
          <span class="chip" *ngIf="e.serviceList.length > 3">+{{ e.serviceList.length - 3 }}</span>
        </div>
      </div>
      <div class="est-footer">
        <button mat-stroked-button style="flex:1;font-size:var(--fs-xs)!important"><mat-icon>edit</mat-icon> Manage</button>
        <button mat-stroked-button style="flex:1;font-size:var(--fs-xs)!important"><mat-icon>settings</mat-icon> Settings</button>
      </div>
    </div>
  </div>

  <!-- Services per establishment table -->
  <div class="wm-card" style="margin-top:24px">
    <div class="wm-card-header">
      <div>
        <div class="wm-section-title">Services Directory</div>
        <div style="font-size:var(--fs-xs);color:var(--wm-muted);margin-top:2px">All active medical services across establishments</div>
      </div>
      <button mat-raised-button color="primary"><mat-icon>add</mat-icon> Add Service</button>
    </div>
    <div class="wm-table-wrap" style="border:none;border-radius:0;box-shadow:none">
      <table class="wm-table">
        <thead><tr><th>Service</th><th>Specialty</th><th>Establishment</th><th>Doctors</th><th>Avg. Wait</th><th>Monthly Apts</th><th>Status</th><th></th></tr></thead>
        <tbody>
          <tr *ngFor="let s of services">
            <td>
              <div style="display:flex;align-items:center;gap:10px">
                <div class="svc-icon" [style.background]="s.bg"><mat-icon [style.color]="s.color">{{ s.icon }}</mat-icon></div>
                <span class="td-primary">{{ s.name }}</span>
              </div>
            </td>
            <td><span class="chip">{{ s.specialty }}</span></td>
            <td style="font-size:var(--fs-sm);color:var(--wm-muted)">{{ s.establishment }}</td>
            <td class="td-primary">{{ s.doctors }}</td>
            <td style="font-size:var(--fs-sm)">{{ s.wait }}</td>
            <td>
              <div style="display:flex;align-items:center;gap:8px">
                <div class="wm-progress" style="width:60px"><div class="wm-progress-fill" [style.width]="s.aptPct + '%'" style="background:var(--wm-primary)"></div></div>
                <span class="td-primary">{{ s.apts }}</span>
              </div>
            </td>
            <td><span class="badge badge-active">Active</span></td>
            <td><button mat-icon-button><mat-icon>more_vert</mat-icon></button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
  `,
  styles: [`
    .est-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; margin-bottom: 0; }
    .est-card {
      background: var(--wm-surface); border: 1px solid var(--wm-border-light); border-radius: var(--r-xl);
      overflow: hidden; box-shadow: var(--sh-card); transition: box-shadow var(--tr), transform var(--tr);
      &:hover { box-shadow: var(--sh-lg); transform: translateY(-2px); }
    }
    .est-card-header {
      padding: 28px 24px; display: flex; justify-content: space-between; align-items: flex-start;
    }
    .est-badge {
      width: 48px; height: 48px; border-radius: var(--r-xl); background: rgba(255,255,255,0.2);
      display: flex; align-items: center; justify-content: center;
      mat-icon { color: white; font-size: 24px; width: 24px; height: 24px; }
    }
    .est-body { padding: 20px 24px; }
    .est-name  { font-size: var(--fs-xl); font-weight: 800; color: var(--wm-text-strong); margin-bottom: 3px; }
    .est-type  { font-size: var(--fs-sm); color: var(--wm-muted); margin-bottom: 10px; }
    .est-address { display: flex; align-items: center; gap: 4px; font-size: var(--fs-xs); color: var(--wm-muted); margin-bottom: 16px; mat-icon { font-size: 14px; width: 14px; height: 14px; } }
    .est-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 14px; }
    .es-item { text-align: center; background: var(--wm-bg-soft); border-radius: var(--r-md); padding: 8px 4px; }
    .es-val   { font-size: var(--fs-lg); font-weight: 800; color: var(--wm-text-strong); }
    .es-label { font-size: 10px; color: var(--wm-muted); text-transform: uppercase; letter-spacing: 0.05em; }
    .est-services-preview { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 8px; }
    .est-footer { padding: 14px 24px; border-top: 1px solid var(--wm-border-light); display: flex; gap: 10px; }

    .svc-icon { width: 30px; height: 30px; border-radius: var(--r-md); display: flex; align-items: center; justify-content: center; flex-shrink: 0; mat-icon { font-size: 15px; width: 15px; height: 15px; } }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EstablishmentsComponent {
  readonly establishments = [
    {
      name: 'Polyclinique Saint-Louis', type: 'Multidisciplinary Clinic', address: '14 Rue de la Paix, Paris 75001',
      services: 8, doctors: 24, patients: 1248, beds: 80, active: true,
      gradient: 'linear-gradient(135deg, #003d7a 0%, #005cbb 100%)',
      serviceList: ['Cardiology', 'General Medicine', 'Radiology', 'Dermatology', 'Neurology', 'Orthopedics']
    },
    {
      name: 'Centre Médical Marbeuf', type: 'Specialist Center', address: '22 Av. Marbeuf, Paris 75008',
      services: 4, doctors: 10, patients: 520, beds: 20, active: true,
      gradient: 'linear-gradient(135deg, #0369a1 0%, #0284c7 100%)',
      serviceList: ['Oncology', 'Hematology', 'Internal Medicine', 'Nutrition']
    },
    {
      name: 'Clinique du Parc', type: 'Surgical Clinic', address: '8 Bd du Temple, Paris 75003',
      services: 5, doctors: 16, patients: 380, beds: 50, active: false,
      gradient: 'linear-gradient(135deg, #374151 0%, #6b7280 100%)',
      serviceList: ['Surgery', 'Anesthesiology', 'Orthopedics', 'Urology', 'Ophthalmology']
    },
  ];

  readonly services = [
    { name:'Cardiology',       specialty:'Cardiac Care',    icon:'favorite',      establishment:'Polyclinique Saint-Louis', doctors:3, wait:'3 days',  apts:142, aptPct:85, bg:'var(--wm-danger-light)',  color:'var(--wm-danger)' },
    { name:'General Medicine', specialty:'Primary Care',    icon:'local_hospital',establishment:'Polyclinique Saint-Louis', doctors:5, wait:'1 day',   apts:234, aptPct:100,bg:'var(--wm-primary-light)', color:'var(--wm-primary)' },
    { name:'Radiology',        specialty:'Imaging',         icon:'radiology',     establishment:'Polyclinique Saint-Louis', doctors:2, wait:'5 days',  apts:89,  aptPct:53, bg:'var(--wm-teal-light)',    color:'var(--wm-teal)' },
    { name:'Dermatology',      specialty:'Skin Care',       icon:'healing',       establishment:'Polyclinique Saint-Louis', doctors:2, wait:'8 days',  apts:76,  aptPct:45, bg:'var(--wm-warning-light)', color:'var(--wm-warning)' },
    { name:'Neurology',        specialty:'Neuroscience',    icon:'psychology',    establishment:'Polyclinique Saint-Louis', doctors:1, wait:'12 days', apts:54,  aptPct:32, bg:'var(--wm-violet-light)',  color:'var(--wm-violet)' },
    { name:'Oncology',         specialty:'Cancer Care',     icon:'biotech',       establishment:'Centre Médical Marbeuf',  doctors:3, wait:'7 days',  apts:68,  aptPct:40, bg:'var(--wm-danger-light)',  color:'var(--wm-danger)' },
  ];
}
