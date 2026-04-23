import { NgFor, NgIf, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { finalize, filter } from 'rxjs';
import { AuthTokenService } from '../../core/services/auth-token.service';
import { AuthApiService } from '../../core/services/auth-api.service';

interface NavItem {
  label: string;
  icon: string;
  link: string;
  badge?: number;
  exact?: boolean;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const NAV_PATIENT: NavGroup[] = [
  {
    label: 'My Health',
    items: [
      { label: 'Dashboard',       icon: 'home',            link: '/',                exact: true },
      { label: 'Appointments',    icon: 'calendar_month',  link: '/appointments' },
      { label: 'Book Appointment',icon: 'add_circle_outline', link: '/appointments/new' },
    ]
  },
  {
    label: 'Medical',
    items: [
      { label: 'Medical Record',  icon: 'folder_shared',   link: '/medical-record' },
      { label: 'Consultations',   icon: 'stethoscope',     link: '/consultations' },
      { label: 'Treatments',      icon: 'medication',      link: '/treatments' },
      { label: 'Prescriptions',   icon: 'receipt_long',    link: '/prescriptions' },
      { label: 'Lab Results',     icon: 'science',         link: '/lab-results' },
    ]
  }
];

const NAV_DOCTOR: NavGroup[] = [
  {
    label: 'Clinical',
    items: [
      { label: 'Dashboard',       icon: 'home',             link: '/',               exact: true },
      { label: 'My Schedule',     icon: 'calendar_month',   link: '/schedule' },
      { label: 'Patients',        icon: 'people',           link: '/patients' },
      { label: 'Appointments',    icon: 'event',            link: '/appointments' },
      { label: 'Consultations',   icon: 'medical_information', link: '/consultations' },
    ]
  },
  {
    label: 'Clinical Tools',
    items: [
      { label: 'Medical Acts',    icon: 'healing',          link: '/medical-acts' },
      { label: 'Prescriptions',   icon: 'receipt_long',     link: '/prescriptions' },
      { label: 'Planning',        icon: 'event_note',       link: '/planning' },
      { label: 'My Services',     icon: 'medical_services', link: '/services' },
    ]
  }
];

const NAV_ADMIN: NavGroup[] = [
  {
    label: 'Operations',
    items: [
      { label: 'Dashboard',       icon: 'home',             link: '/',               exact: true },
      { label: 'Appointments',    icon: 'event',            link: '/appointments' },
      { label: 'Global Planning', icon: 'calendar_month',   link: '/planning' },
    ]
  },
  {
    label: 'Management',
    items: [
      { label: 'Establishments',  icon: 'business',         link: '/admin/establishments' },
      { label: 'Services',        icon: 'medical_services', link: '/services' },
      { label: 'Doctors & Staff', icon: 'badge',            link: '/patients' },
      { label: 'Users & Roles',   icon: 'manage_accounts',  link: '/admin/users' },
    ]
  },
  {
    label: 'Finance & Reports',
    items: [
      { label: 'Billing',         icon: 'receipt',          link: '/billing' },
      { label: 'Activity Monitor',icon: 'analytics',        link: '/admin/activity' },
    ]
  }
];

const NAV_STAFF: NavGroup[] = [
  {
    label: 'Clinical',
    items: [
      { label: 'Dashboard',       icon: 'home',             link: '/',               exact: true },
      { label: 'Appointments',    icon: 'event',            link: '/appointments' },
      { label: 'Patients',        icon: 'people',           link: '/patients' },
      { label: 'Consultations',   icon: 'medical_information', link: '/consultations' },
    ]
  },
  {
    label: 'Tools',
    items: [
      { label: 'Services',        icon: 'medical_services', link: '/services' },
      { label: 'Planning',        icon: 'event_note',       link: '/planning' },
    ]
  }
];

@Component({
  selector: 'wm-main-layout',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, RouterOutlet, RouterLink, RouterLinkActive, MatIconModule, MatButtonModule, MatTooltipModule],
  template: `
<div class="layout" [class.collapsed]="collapsed()">

  <!-- ══ SIDEBAR ══════════════════════════════════════════════════════ -->
  <aside class="sidebar">

    <!-- Brand -->
    <div class="sidebar-brand">
      <div class="brand-mark">
        <mat-icon>health_and_safety</mat-icon>
      </div>
      <div class="brand-text" *ngIf="!collapsed()">
        <span class="brand-name">WAY Medical</span>
        <span class="brand-sub">Healthcare Platform</span>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="sidebar-nav">
      <ng-container *ngFor="let group of navGroups()">
        <div class="nav-group-label" *ngIf="!collapsed()">{{ group.label }}</div>
        <a
          *ngFor="let item of group.items"
          class="nav-item"
          [routerLink]="item.link"
          [routerLinkActiveOptions]="{ exact: !!item.exact }"
          routerLinkActive="active"
          [matTooltip]="collapsed() ? item.label : ''"
          matTooltipPosition="right">
          <mat-icon class="nav-icon">{{ item.icon }}</mat-icon>
          <span class="nav-label" *ngIf="!collapsed()">{{ item.label }}</span>
          <span class="nav-badge" *ngIf="item.badge && !collapsed()">{{ item.badge }}</span>
        </a>
        <div class="nav-sep" *ngIf="!collapsed()"></div>
      </ng-container>
    </nav>

    <!-- User / Logout -->
    <div class="sidebar-footer">
      <div class="sidebar-user" *ngIf="!collapsed()">
        <div class="user-ava">{{ initials() }}</div>
        <div class="user-meta">
          <div class="user-name">{{ userName() }}</div>
          <div class="user-role-tag">{{ roleLabel() }}</div>
        </div>
        <button class="logout-btn" (click)="logout()" matTooltip="Sign out">
          <mat-icon>logout</mat-icon>
        </button>
      </div>
      <button *ngIf="collapsed()" class="logout-btn-solo" (click)="logout()" matTooltip="Sign out" matTooltipPosition="right">
        <mat-icon>logout</mat-icon>
      </button>
    </div>
  </aside>

  <!-- ══ MAIN AREA ═════════════════════════════════════════════════════ -->
  <div class="main-area">

    <!-- Top Bar -->
    <header class="topbar">
      <button class="collapse-btn" (click)="toggleCollapse()" [matTooltip]="collapsed() ? 'Expand menu' : 'Collapse menu'">
        <mat-icon>{{ collapsed() ? 'menu_open' : 'menu' }}</mat-icon>
      </button>

      <div class="topbar-search">
        <mat-icon>search</mat-icon>
        <input type="text" placeholder="Search patients, appointments, services…" />
      </div>

      <div class="topbar-actions">
        <button class="topbar-icon-btn" matTooltip="Notifications">
          <mat-icon>notifications</mat-icon>
          <span class="notif-dot"></span>
        </button>
        <button class="topbar-icon-btn" matTooltip="Help">
          <mat-icon>help_outline</mat-icon>
        </button>
        <div class="topbar-profile">
          <div class="tp-ava">{{ initials() }}</div>
          <div class="tp-info">
            <span class="tp-name">{{ userName() }}</span>
            <span class="tp-role">{{ roleLabel() }}</span>
          </div>
          <mat-icon class="tp-chevron">expand_more</mat-icon>
        </div>
      </div>
    </header>

    <!-- Content -->
    <main class="page-content">
      <router-outlet></router-outlet>
    </main>
  </div>

</div>
  `,
  styles: [`
    /* ── Layout Shell ─────────────────────────────────── */
    .layout {
      display: flex;
      height: 100vh;
      overflow: hidden;
      background: var(--wm-bg);
    }

    /* ── Sidebar ──────────────────────────────────────── */
    .sidebar {
      width: var(--wm-sidebar-width);
      min-width: var(--wm-sidebar-width);
      background: var(--wm-sidebar-bg);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transition: width 260ms cubic-bezier(0.4,0,0.2,1),
                  min-width 260ms cubic-bezier(0.4,0,0.2,1);
      z-index: 20;
      box-shadow: 4px 0 24px rgba(0,0,0,0.18);
    }

    .layout.collapsed .sidebar {
      width: 64px;
      min-width: 64px;
    }

    /* Brand */
    .sidebar-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 20px 16px 18px;
      border-bottom: 1px solid var(--wm-sidebar-border);
      min-height: 72px;
      flex-shrink: 0;
    }

    .brand-mark {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: var(--wm-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      mat-icon {
        color: white;
        font-size: 20px;
        width: 20px;
        height: 20px;
      }
    }

    .brand-text {
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .brand-name {
      font-size: 15px;
      font-weight: 700;
      color: white;
      white-space: nowrap;
      letter-spacing: -0.01em;
    }

    .brand-sub {
      font-size: 10px;
      font-weight: 500;
      color: var(--wm-sidebar-text);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      white-space: nowrap;
    }

    /* Nav */
    .sidebar-nav {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 12px 8px;
      display: flex;
      flex-direction: column;
      gap: 2px;

      &::-webkit-scrollbar { width: 4px; }
      &::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); }
    }

    .nav-group-label {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: rgba(143, 163, 188, 0.55);
      padding: 12px 10px 4px;
      white-space: nowrap;
    }

    .nav-sep {
      height: 1px;
      background: var(--wm-sidebar-border);
      margin: 8px 6px;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 9px 10px;
      border-radius: 8px;
      text-decoration: none;
      color: var(--wm-sidebar-text);
      font-size: 13.5px;
      font-weight: 500;
      transition: background 150ms, color 150ms;
      white-space: nowrap;
      overflow: hidden;
      min-height: 38px;

      &:hover {
        background: var(--wm-sidebar-hover);
        color: var(--wm-sidebar-text-hi);
      }

      &.active {
        background: var(--wm-sidebar-active);
        color: var(--wm-sidebar-active-t);
        font-weight: 600;

        .nav-icon { color: white; }
      }
    }

    .nav-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
      flex-shrink: 0;
      color: var(--wm-sidebar-text);
      transition: color 150ms;
    }

    .nav-label {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .nav-badge {
      background: var(--wm-primary);
      color: white;
      font-size: 10px;
      font-weight: 700;
      padding: 1px 6px;
      border-radius: 9999px;
      min-width: 18px;
      text-align: center;
      flex-shrink: 0;
    }

    /* Sidebar Footer / User */
    .sidebar-footer {
      padding: 12px 8px;
      border-top: 1px solid var(--wm-sidebar-border);
      flex-shrink: 0;
    }

    .sidebar-user {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 6px;
      border-radius: 10px;
      transition: background 150ms;
      &:hover { background: var(--wm-sidebar-hover); }
    }

    .user-ava {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: var(--wm-primary);
      color: white;
      font-size: 12px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .user-meta {
      flex: 1;
      overflow: hidden;
    }

    .user-name {
      font-size: 12.5px;
      font-weight: 600;
      color: var(--wm-sidebar-text-hi);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .user-role-tag {
      font-size: 10px;
      font-weight: 500;
      color: var(--wm-sidebar-text);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .logout-btn {
      border: none;
      background: none;
      padding: 5px;
      cursor: pointer;
      border-radius: 6px;
      color: var(--wm-sidebar-text);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 150ms, background 150ms;
      flex-shrink: 0;
      &:hover { color: #f87171; background: rgba(248,113,113,0.1); }
      mat-icon { font-size: 16px; width: 16px; height: 16px; }
    }

    .logout-btn-solo {
      border: none;
      background: none;
      padding: 8px;
      cursor: pointer;
      border-radius: 8px;
      color: var(--wm-sidebar-text);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      transition: color 150ms, background 150ms;
      &:hover { color: #f87171; background: rgba(248,113,113,0.1); }
      mat-icon { font-size: 18px; width: 18px; height: 18px; }
    }

    /* ── Top Bar ──────────────────────────────────────── */
    .topbar {
      height: var(--wm-topbar-h);
      min-height: var(--wm-topbar-h);
      background: var(--wm-surface);
      border-bottom: 1px solid var(--wm-border-light);
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 24px;
      box-shadow: 0 1px 4px rgba(15,31,53,0.06);
      z-index: 10;
      flex-shrink: 0;
    }

    .collapse-btn {
      border: none;
      background: none;
      cursor: pointer;
      width: 36px;
      height: 36px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--wm-muted);
      transition: background 150ms, color 150ms;
      flex-shrink: 0;
      &:hover { background: var(--wm-bg); color: var(--wm-text); }
      mat-icon { font-size: 20px; width: 20px; height: 20px; }
    }

    .topbar-search {
      flex: 1;
      max-width: 420px;
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--wm-bg);
      border: 1.5px solid var(--wm-border);
      border-radius: 10px;
      padding: 7px 14px;
      transition: border-color 150ms, box-shadow 150ms;

      &:focus-within {
        border-color: var(--wm-primary);
        box-shadow: 0 0 0 3px rgba(0,92,187,0.1);
        background: var(--wm-surface);
      }

      mat-icon {
        color: var(--wm-muted-light);
        font-size: 17px;
        width: 17px;
        height: 17px;
        flex-shrink: 0;
      }

      input {
        border: none;
        outline: none;
        background: transparent;
        font-family: var(--wm-font);
        font-size: 13.5px;
        color: var(--wm-text);
        width: 100%;
        &::placeholder { color: var(--wm-placeholder); }
      }
    }

    .topbar-actions {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-left: auto;
    }

    .topbar-icon-btn {
      position: relative;
      border: none;
      background: none;
      cursor: pointer;
      width: 36px;
      height: 36px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--wm-muted);
      transition: background 150ms, color 150ms;
      &:hover { background: var(--wm-bg); color: var(--wm-text); }
      mat-icon { font-size: 20px; width: 20px; height: 20px; }
    }

    .notif-dot {
      position: absolute;
      top: 6px;
      right: 6px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--wm-danger-mid);
      border: 2px solid var(--wm-surface);
    }

    .topbar-profile {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 5px 12px 5px 6px;
      border-radius: 10px;
      cursor: pointer;
      border: 1.5px solid transparent;
      transition: background 150ms, border-color 150ms;
      margin-left: 4px;

      &:hover {
        background: var(--wm-bg);
        border-color: var(--wm-border);
      }
    }

    .tp-ava {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: var(--wm-primary);
      color: white;
      font-size: 11px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .tp-info {
      display: flex;
      flex-direction: column;
    }

    .tp-name {
      font-size: 13px;
      font-weight: 600;
      color: var(--wm-text);
      line-height: 1.2;
    }

    .tp-role {
      font-size: 10.5px;
      color: var(--wm-muted);
      line-height: 1.2;
    }

    .tp-chevron {
      font-size: 16px;
      width: 16px;
      height: 16px;
      color: var(--wm-muted-light);
    }

    /* ── Main Content Area ────────────────────────────── */
    .main-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .page-content {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent {
  private readonly authTokenService = inject(AuthTokenService);
  private readonly authApiService   = inject(AuthApiService);
  private readonly router           = inject(Router);

  readonly collapsed = signal(false);

  private readonly tokenPayload = computed(() => {
    const token = this.authTokenService.getToken();
    if (!token) return null;
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch { return null; }
  });

  readonly userRole = computed<string>(() => {
    const p = this.tokenPayload();
    if (!p) return 'PATIENT';
    return (p['roles']?.[0] ?? p['role'] ?? 'PATIENT').toUpperCase();
  });

  readonly userName = computed<string>(() => {
    const p = this.tokenPayload();
    if (!p) return 'User';
    return p['name'] ?? p['firstName'] ?? p['sub'] ?? 'User';
  });

  readonly initials = computed<string>(() => {
    return this.userName()
      .split(' ')
      .filter(Boolean)
      .map((w: string) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'U';
  });

  readonly roleLabel = computed<string>(() => {
    const map: Record<string, string> = {
      ADMIN: 'Administrator', DOCTOR: 'Physician',
      MEDICAL_STAFF: 'Medical Staff', LAB_TECHNICIAN: 'Lab Tech',
      PATIENT: 'Patient'
    };
    return map[this.userRole()] ?? this.userRole();
  });

  readonly navGroups = computed<NavGroup[]>(() => {
    const role = this.userRole();
    if (role === 'ADMIN')         return NAV_ADMIN;
    if (role === 'DOCTOR')        return NAV_DOCTOR;
    if (role === 'MEDICAL_STAFF') return NAV_STAFF;
    if (role === 'LAB_TECHNICIAN')return NAV_STAFF;
    return NAV_PATIENT;
  });

  toggleCollapse(): void { this.collapsed.update(v => !v); }

  logout(): void {
    this.authApiService.logout()
      .pipe(finalize(() => void this.router.navigate(['/login'])))
      .subscribe({ error: () => this.authApiService.clearSession() });
  }
}
