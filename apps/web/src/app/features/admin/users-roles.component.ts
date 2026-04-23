import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'wm-users-roles',
  standalone: true,
  imports: [NgFor, NgIf, MatIconModule, MatButtonModule],
  template: `
<div class="wm-page">
  <div class="wm-page-header">
    <div>
      <p class="wm-eyebrow">Administration</p>
      <h1 class="wm-page-title">Users & Roles</h1>
    </div>
    <button mat-raised-button color="primary"><mat-icon>person_add</mat-icon> Add User</button>
  </div>

  <!-- Role Overview Cards -->
  <div class="wm-grid-4" style="margin-bottom:28px">
    <div class="role-card" *ngFor="let r of roles">
      <div class="rc-icon" [style.background]="r.bg"><mat-icon [style.color]="r.color">{{ r.icon }}</mat-icon></div>
      <div class="rc-val">{{ r.count }}</div>
      <div class="rc-label">{{ r.label }}</div>
      <div class="rc-bar" [style.background]="r.color"></div>
    </div>
  </div>

  <!-- Filters + Table -->
  <div class="wm-card">
    <div class="wm-card-header">
      <div>
        <div class="wm-section-title">All Users</div>
        <div style="font-size:var(--fs-xs);color:var(--wm-muted);margin-top:2px">Manage accounts, roles and access permissions</div>
      </div>
      <div style="display:flex;gap:10px;align-items:center">
        <div class="wm-search-input" style="min-width:220px">
          <mat-icon>search</mat-icon>
          <input type="text" placeholder="Search users…" (input)="setSearch($event)" />
        </div>
        <div class="wm-tabs">
          <button *ngFor="let f of roleFilters" class="wm-tab" [class.active]="activeFilter() === f.key" (click)="activeFilter.set(f.key)">{{ f.label }}</button>
        </div>
      </div>
    </div>
    <div class="wm-table-wrap" style="border:none;border-radius:0;box-shadow:none">
      <table class="wm-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Role</th>
            <th>Service / Department</th>
            <th>Establishment</th>
            <th>Last Login</th>
            <th>Status</th>
            <th>Permissions</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let u of filteredUsers()">
            <td>
              <div style="display:flex;align-items:center;gap:10px">
                <div class="avatar avatar-sm" [style.background]="u.avatarBg" [style.color]="u.avatarColor">{{ u.initials }}</div>
                <div>
                  <div class="td-primary">{{ u.name }}</div>
                  <div style="font-size:var(--fs-xs);color:var(--wm-muted)">{{ u.email }}</div>
                </div>
              </div>
            </td>
            <td><span class="badge" [class]="'badge-' + u.roleClass">{{ u.role }}</span></td>
            <td style="font-size:var(--fs-sm);color:var(--wm-muted)">{{ u.dept }}</td>
            <td style="font-size:var(--fs-sm);color:var(--wm-muted)">{{ u.establishment }}</td>
            <td style="font-size:var(--fs-sm)">{{ u.lastLogin }}</td>
            <td>
              <span class="badge" [class]="u.active ? 'badge-active' : 'badge-cancelled'">
                <span class="badge-dot"></span>{{ u.active ? 'Active' : 'Inactive' }}
              </span>
            </td>
            <td>
              <div style="display:flex;gap:3px;flex-wrap:wrap">
                <span class="perm-chip" *ngFor="let p of u.perms.slice(0, 2)">{{ p }}</span>
                <span class="perm-chip" *ngIf="u.perms.length > 2" style="background:var(--wm-bg-soft)">+{{ u.perms.length - 2 }}</span>
              </div>
            </td>
            <td>
              <div style="display:flex;gap:2px">
                <button mat-icon-button><mat-icon>edit</mat-icon></button>
                <button mat-icon-button><mat-icon>key</mat-icon></button>
                <button mat-icon-button [style.color]="u.active ? 'var(--wm-danger)' : 'var(--wm-success)'">
                  <mat-icon>{{ u.active ? 'block' : 'check_circle' }}</mat-icon>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
  `,
  styles: [`
    .role-card {
      background: var(--wm-surface); border: 1px solid var(--wm-border-light); border-radius: var(--r-xl);
      padding: 20px 24px; box-shadow: var(--sh-card); position: relative; overflow: hidden;
    }
    .rc-icon { width: 40px; height: 40px; border-radius: var(--r-lg); display: flex; align-items: center; justify-content: center; margin-bottom: 12px; mat-icon { font-size: 20px; width: 20px; height: 20px; } }
    .rc-val  { font-size: var(--fs-3xl); font-weight: 800; color: var(--wm-text-strong); letter-spacing: -0.03em; line-height: 1; }
    .rc-label{ font-size: var(--fs-sm); color: var(--wm-muted); margin-top: 4px; font-weight: 500; }
    .rc-bar  { position: absolute; bottom: 0; left: 0; right: 0; height: 3px; }

    .perm-chip {
      display: inline-flex; padding: 2px 7px; border-radius: var(--r-full);
      background: var(--wm-primary-light); color: var(--wm-primary-strong);
      font-size: 10px; font-weight: 600; border: 1px solid #c3d7f5;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersRolesComponent {
  readonly search       = signal('');
  readonly activeFilter = signal('ALL');

  readonly roleFilters = [
    { key: 'ALL',           label: 'All' },
    { key: 'ADMIN',         label: 'Admin' },
    { key: 'DOCTOR',        label: 'Doctors' },
    { key: 'MEDICAL_STAFF', label: 'Staff' },
    { key: 'PATIENT',       label: 'Patients' },
  ];

  readonly roles = [
    { icon: 'manage_accounts', label: 'Administrators',  count: 3,   bg: 'var(--wm-violet-light)',  color: 'var(--wm-violet)' },
    { icon: 'badge',           label: 'Doctors',         count: 24,  bg: 'var(--wm-primary-light)', color: 'var(--wm-primary)' },
    { icon: 'medical_services',label: 'Medical Staff',   count: 18,  bg: 'var(--wm-teal-light)',    color: 'var(--wm-teal)' },
    { icon: 'people',          label: 'Patients',        count: 1248,bg: 'var(--wm-success-light)', color: 'var(--wm-success)' },
  ];

  readonly users = [
    { name:'Claire Dupuis',       email:'c.dupuis@clinic.fr',       initials:'CD', role:'Admin',         roleClass:'admin',   dept:'Administration',   establishment:'Polyclinique Saint-Louis', lastLogin:'Today 09:14',    active:true,  perms:['All Access','Config','Billing'],           avatarBg:'var(--wm-violet-light)',  avatarColor:'var(--wm-violet)' },
    { name:'Dr. Éric Fontaine',   email:'e.fontaine@clinic.fr',     initials:'EF', role:'Doctor',        roleClass:'doctor',  dept:'Cardiology',        establishment:'Polyclinique Saint-Louis', lastLogin:'Today 08:30',    active:true,  perms:['Consultations','Prescriptions','Planning'], avatarBg:'var(--wm-teal-light)',    avatarColor:'var(--wm-teal)' },
    { name:'Dr. Claire Martin',   email:'c.martin@clinic.fr',       initials:'CM', role:'Doctor',        roleClass:'doctor',  dept:'General Medicine',  establishment:'Polyclinique Saint-Louis', lastLogin:'Today 10:02',    active:true,  perms:['Consultations','Prescriptions','Planning'], avatarBg:'var(--wm-primary-light)', avatarColor:'var(--wm-primary)' },
    { name:'Sophie Bernard',      email:'s.bernard@clinic.fr',      initials:'SB', role:'Medical Staff', roleClass:'staff',   dept:'Cardiology',        establishment:'Polyclinique Saint-Louis', lastLogin:'Yesterday',      active:true,  perms:['Vitals','Lab Requests','Scheduling'],       avatarBg:'var(--wm-success-light)', avatarColor:'var(--wm-success)' },
    { name:'Dr. Yann Leblanc',    email:'y.leblanc@clinic.fr',      initials:'YL', role:'Doctor',        roleClass:'doctor',  dept:'Radiology',         establishment:'Polyclinique Saint-Louis', lastLogin:'Apr 28, 2025',   active:true,  perms:['Consultations','Imaging','Planning'],       avatarBg:'var(--wm-warning-light)', avatarColor:'var(--wm-warning)' },
    { name:'Marie Dupont',        email:'marie.dupont@mail.fr',     initials:'MD', role:'Patient',       roleClass:'patient', dept:'—',                 establishment:'Polyclinique Saint-Louis', lastLogin:'Apr 22, 2025',   active:true,  perms:['View Records','Book Appointments'],         avatarBg:'var(--wm-primary-light)', avatarColor:'var(--wm-primary)' },
    { name:'Thomas Girard',       email:'t.girard@clinic.fr',       initials:'TG', role:'Medical Staff', roleClass:'staff',   dept:'General Medicine',  establishment:'Centre Médical Marbeuf',   lastLogin:'Never',          active:false, perms:['Vitals'],                                  avatarBg:'var(--wm-bg-soft)',        avatarColor:'var(--wm-muted)' },
  ];

  readonly filteredUsers = computed(() => {
    const q = this.search().toLowerCase();
    const f = this.activeFilter();
    return this.users.filter(u => {
      const matchFilter = f === 'ALL' || u.roleClass.toUpperCase() === f || (f === 'MEDICAL_STAFF' && u.roleClass === 'staff');
      const matchSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
      return matchFilter && matchSearch;
    });
  });

  setSearch(e: Event): void { this.search.set((e.target as HTMLInputElement).value); }
}
