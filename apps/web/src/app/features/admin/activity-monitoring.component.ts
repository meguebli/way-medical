import { NgFor, NgIf, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'wm-activity-monitoring',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, RouterLink, MatIconModule, MatButtonModule],
  template: `
<div class="wm-page">
  <div class="wm-page-header">
    <div>
      <p class="wm-eyebrow">Administration</p>
      <h1 class="wm-page-title">Activity Monitor</h1>
    </div>
    <div style="display:flex;gap:10px;align-items:center">
      <div class="live-indicator">
        <span class="live-dot"></span>Live
      </div>
      <button mat-stroked-button><mat-icon>download</mat-icon> Export Logs</button>
    </div>
  </div>

  <!-- Real-time KPIs -->
  <div class="wm-grid-4 kpi-row">
    <div class="kpi-card" *ngFor="let k of kpis">
      <div class="kpi-icon" [style.background]="k.bg"><mat-icon [style.color]="k.color">{{ k.icon }}</mat-icon></div>
      <div class="kpi-value">{{ k.value }}</div>
      <div class="kpi-label">{{ k.label }}</div>
      <div class="kpi-accent-bar" [style.background]="k.color"></div>
    </div>
  </div>

  <!-- Main Grid -->
  <div class="monitor-grid">

    <!-- Event Log -->
    <div class="wm-card events-card">
      <div class="wm-card-header">
        <div>
          <div class="wm-section-title">Event Log</div>
          <div style="font-size:var(--fs-xs);color:var(--wm-muted);margin-top:2px">All platform events · Real-time</div>
        </div>
        <div style="display:flex;gap:8px">
          <div class="wm-search-input" style="min-width:180px">
            <mat-icon>search</mat-icon>
            <input type="text" placeholder="Filter events…" />
          </div>
          <button mat-stroked-button><mat-icon>tune</mat-icon></button>
        </div>
      </div>
      <div class="event-log">
        <div class="el-item" *ngFor="let e of events" [class]="'el-' + e.severity">
          <div class="el-severity">
            <mat-icon [style.color]="e.iconColor">{{ e.icon }}</mat-icon>
          </div>
          <div class="el-body">
            <div class="el-title">{{ e.title }}</div>
            <div class="el-meta">{{ e.meta }}</div>
          </div>
          <div class="el-right">
            <span class="badge" [class]="'badge-' + e.badgeClass">{{ e.category }}</span>
            <div class="el-time">{{ e.time }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Panel -->
    <div class="monitor-right">

      <!-- System Health -->
      <div class="wm-card">
        <div class="wm-card-header">
          <div class="wm-section-title">System Health</div>
          <span class="badge badge-active"><span class="badge-dot"></span>All systems OK</span>
        </div>
        <div class="health-list">
          <div class="hl-item" *ngFor="let h of healthChecks">
            <div class="hl-name">{{ h.name }}</div>
            <div class="hl-right">
              <div class="wm-progress" style="width:80px"><div class="wm-progress-fill" [style.width]="h.val + '%'" [style.background]="h.color"></div></div>
              <span class="hl-val" [style.color]="h.color">{{ h.val }}%</span>
              <span class="hl-status" [style.color]="h.statusColor">{{ h.status }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Active Sessions -->
      <div class="wm-card mt-5">
        <div class="wm-card-header">
          <div class="wm-section-title">Active Sessions</div>
          <span class="badge badge-info">{{ activeSessions.length }} online</span>
        </div>
        <div class="sessions-list">
          <div class="session-item" *ngFor="let s of activeSessions">
            <div class="avatar avatar-sm" [style.background]="s.avatarBg" [style.color]="s.avatarColor">{{ s.initials }}</div>
            <div class="si-body">
              <div class="si-name">{{ s.name }}</div>
              <div class="si-meta">{{ s.role }} · {{ s.device }}</div>
            </div>
            <div class="si-duration">{{ s.duration }}</div>
          </div>
        </div>
      </div>

      <!-- Error Summary -->
      <div class="wm-card mt-5">
        <div class="wm-card-header">
          <div class="wm-section-title">Alerts</div>
          <span class="badge badge-warning">{{ alerts.length }} active</span>
        </div>
        <div class="alerts-compact">
          <div class="ac-item wm-alert" [class]="'alert-' + a.type" *ngFor="let a of alerts" style="margin:0;border-radius:0;border-left:none;border-right:none;border-top:none">
            <mat-icon>{{ a.icon }}</mat-icon>
            <div style="flex:1">
              <div style="font-weight:600;font-size:var(--fs-sm)">{{ a.title }}</div>
              <div style="font-size:var(--fs-xs);opacity:0.8">{{ a.time }}</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- Usage Stats -->
  <div class="wm-grid-2 mt-6">
    <div class="wm-card">
      <div class="wm-card-header"><div class="wm-section-title">Appointments by Hour (Today)</div></div>
      <div class="wm-card-body">
        <div class="hour-chart">
          <div class="hc-bar" *ngFor="let h of hourlyData">
            <div class="hcb-fill" [style.height]="h.pct + '%'" [style.background]="h.pct > 80 ? 'var(--wm-danger-mid)' : h.pct > 50 ? 'var(--wm-primary)' : 'var(--wm-teal)'"></div>
            <div class="hcb-label">{{ h.hour }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="wm-card">
      <div class="wm-card-header"><div class="wm-section-title">Top Actions This Month</div></div>
      <div class="top-actions">
        <div class="ta-item" *ngFor="let a of topActions">
          <div class="ta-icon" [style.background]="a.bg"><mat-icon [style.color]="a.color">{{ a.icon }}</mat-icon></div>
          <div class="ta-body">
            <div class="ta-name">{{ a.name }}</div>
            <div class="wm-progress" style="margin-top:4px"><div class="wm-progress-fill" [style.width]="a.pct + '%'" [style.background]="a.color"></div></div>
          </div>
          <div class="ta-count">{{ a.count }}</div>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
  styles: [`
    .live-indicator {
      display: flex; align-items: center; gap: 8px;
      background: var(--wm-success-light); color: var(--wm-success);
      font-size: var(--fs-xs); font-weight: 700; padding: 6px 12px; border-radius: var(--r-full);
      border: 1px solid var(--wm-success-border);
    }
    .live-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--wm-success-mid); animation: pulse-dot 1.4s infinite; }

    .kpi-row { margin-bottom: 28px; }
    .mt-5 { margin-top: 20px; }
    .mt-6 { margin-top: 24px; }

    .monitor-grid { display: grid; grid-template-columns: 1fr 320px; gap: 24px; margin-bottom: 24px; }
    .monitor-right { display: flex; flex-direction: column; }

    /* Event log */
    .events-card {}
    .event-log { max-height: 600px; overflow-y: auto; }
    .el-item {
      display: flex; align-items: flex-start; gap: 12px; padding: 12px 24px;
      border-bottom: 1px solid var(--wm-border-light); transition: background var(--tr);
      &:last-child { border-bottom: none; }
      &:hover { background: var(--wm-primary-subtle); }
      &.el-error   { border-left: 3px solid var(--wm-danger); }
      &.el-warning { border-left: 3px solid var(--wm-warning-mid); }
      &.el-info    { border-left: 3px solid transparent; }
    }
    .el-severity { flex-shrink: 0; padding-top: 2px; mat-icon { font-size: 18px; width: 18px; height: 18px; } }
    .el-body { flex: 1; }
    .el-title { font-size: var(--fs-sm); font-weight: 600; color: var(--wm-text); }
    .el-meta  { font-size: var(--fs-xs); color: var(--wm-muted); margin-top: 2px; }
    .el-right { text-align: right; flex-shrink: 0; }
    .el-time  { font-size: var(--fs-xs); color: var(--wm-muted-light); margin-top: 4px; }

    /* Health */
    .health-list { padding: 8px 0; }
    .hl-item {
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
      padding: 10px 24px; border-bottom: 1px solid var(--wm-border-light); &:last-child { border-bottom: none; }
    }
    .hl-name  { font-size: var(--fs-sm); font-weight: 500; color: var(--wm-text); }
    .hl-right { display: flex; align-items: center; gap: 8px; }
    .hl-val   { font-size: var(--fs-xs); font-weight: 700; min-width: 36px; text-align: right; }
    .hl-status{ font-size: var(--fs-xs); font-weight: 600; }

    /* Sessions */
    .sessions-list { padding: 8px 0; }
    .session-item {
      display: flex; align-items: center; gap: 10px; padding: 10px 24px;
      border-bottom: 1px solid var(--wm-border-light); &:last-child { border-bottom: none; }
    }
    .si-body { flex: 1; }
    .si-name  { font-size: var(--fs-sm); font-weight: 600; color: var(--wm-text); }
    .si-meta  { font-size: var(--fs-xs); color: var(--wm-muted); }
    .si-duration { font-size: var(--fs-xs); color: var(--wm-success); font-weight: 600; }

    /* Alerts compact */
    .alerts-compact { border-top: 1px solid var(--wm-border-light); }
    .ac-item { padding: 12px 24px !important; }

    /* Hour chart */
    .hour-chart { display: flex; align-items: flex-end; gap: 4px; height: 100px; }
    .hc-bar { flex: 1; display: flex; flex-direction: column; align-items: center; height: 100%; }
    .hcb-fill { width: 100%; border-radius: 4px 4px 0 0; min-height: 3px; transition: height 600ms; }
    .hcb-label { font-size: 10px; color: var(--wm-muted-light); margin-top: 4px; }

    /* Top actions */
    .top-actions { padding: 16px 24px; display: flex; flex-direction: column; gap: 12px; }
    .ta-item { display: flex; align-items: center; gap: 12px; }
    .ta-icon { width: 32px; height: 32px; border-radius: var(--r-md); display: flex; align-items: center; justify-content: center; flex-shrink: 0; mat-icon { font-size: 15px; width: 15px; height: 15px; } }
    .ta-body { flex: 1; }
    .ta-name  { font-size: var(--fs-sm); font-weight: 500; color: var(--wm-text); margin-bottom: 2px; }
    .ta-count { font-size: var(--fs-md); font-weight: 800; color: var(--wm-text-strong); min-width: 40px; text-align: right; }

    @media (max-width: 1100px) { .monitor-grid { grid-template-columns: 1fr; } }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityMonitoringComponent {
  readonly kpis = [
    { icon: 'people',       label: 'Active Users Now',      value: '12',  bg: 'var(--wm-success-light)', color: 'var(--wm-success)' },
    { icon: 'event',        label: 'Events Today',          value: '1,847',bg:'var(--wm-primary-light)', color: 'var(--wm-primary)' },
    { icon: 'error_outline',label: 'Errors (24h)',          value: '2',   bg: 'var(--wm-danger-light)',  color: 'var(--wm-danger)' },
    { icon: 'speed',        label: 'Avg Response Time',     value: '142ms',bg:'var(--wm-teal-light)',    color: 'var(--wm-teal)' },
  ];

  readonly events = [
    { title:'Appointment APT-2025-0489 approved',           meta:'Dr. Fontaine approved Marie Dupont · Cardiology',    category:'Appointment', badgeClass:'approved', icon:'event_available', iconColor:'var(--wm-teal)',    severity:'info',    time:'2 min ago' },
    { title:'New patient registration: Henri Marchand',     meta:'PAT-00178 created by admin@clinic.fr',               category:'Patient',     badgeClass:'info',     icon:'person_add',      iconColor:'var(--wm-primary)', severity:'info',    time:'14 min ago' },
    { title:'Failed login attempt detected',                meta:'IP 192.168.1.44 — 3 failed attempts in 5 minutes',   category:'Security',    badgeClass:'danger',   icon:'lock',            iconColor:'var(--wm-danger)',  severity:'error',   time:'22 min ago' },
    { title:'Invoice INV-2025-0489 paid €320',              meta:'By Marie Dupont via online portal',                  category:'Billing',     badgeClass:'success',  icon:'payments',        iconColor:'var(--wm-success)', severity:'info',    time:'31 min ago' },
    { title:'Appointment cancelled: Sylvie Beaumont',       meta:'14:00 slot cancelled — reason: personal',            category:'Appointment', badgeClass:'cancelled', icon:'event_busy',     iconColor:'var(--wm-danger)',  severity:'info',    time:'45 min ago' },
    { title:'Lab results uploaded: Isabelle Tremblay',      meta:'CBC + Lipid panel — uploaded by lab@central.fr',     category:'Lab',         badgeClass:'info',     icon:'science',         iconColor:'var(--wm-teal)',    severity:'info',    time:'1h 10m ago' },
    { title:'Database backup completed',                    meta:'Full backup 4.2 GB — duration 3m 14s',               category:'System',      badgeClass:'success',  icon:'backup',          iconColor:'var(--wm-success)', severity:'info',    time:'2h ago' },
    { title:'High memory usage on App Server 2',            meta:'Memory at 87% — threshold exceeded',                 category:'System',      badgeClass:'warning',  icon:'warning',         iconColor:'var(--wm-warning)', severity:'warning', time:'2h 30m ago' },
    { title:'Dr. Leblanc logged in',                        meta:'Radiology department · Web browser',                 category:'Auth',        badgeClass:'neutral',  icon:'login',           iconColor:'var(--wm-muted)',   severity:'info',    time:'3h ago' },
    { title:'Consultation CON-2025-0156 completed',         meta:'Marie Dupont · Cardiology · Dr. Fontaine',           category:'Consultation',badgeClass:'completed', icon:'check_circle',   iconColor:'var(--wm-success)', severity:'info',    time:'3h 30m ago' },
  ];

  readonly healthChecks = [
    { name: 'API Server',         val: 99, color: 'var(--wm-success)',   status: 'Healthy',  statusColor: 'var(--wm-success)' },
    { name: 'Database',           val: 98, color: 'var(--wm-success)',   status: 'Healthy',  statusColor: 'var(--wm-success)' },
    { name: 'File Storage',       val: 94, color: 'var(--wm-success)',   status: 'Healthy',  statusColor: 'var(--wm-success)' },
    { name: 'App Server 1',       val: 76, color: 'var(--wm-primary)',   status: 'Normal',   statusColor: 'var(--wm-primary)' },
    { name: 'App Server 2',       val: 87, color: 'var(--wm-warning-mid)',status: 'High',   statusColor: 'var(--wm-warning)' },
    { name: 'Email Service',      val: 100,color: 'var(--wm-success)',   status: 'Healthy',  statusColor: 'var(--wm-success)' },
  ];

  readonly activeSessions = [
    { name:'Dr. Éric Fontaine', initials:'EF', role:'Doctor',  device:'Web · Chrome', duration:'Active 1h 20m', avatarBg:'var(--wm-teal-light)',   avatarColor:'var(--wm-teal)' },
    { name:'Claire Dupuis',     initials:'CD', role:'Admin',   device:'Web · Safari', duration:'Active 45m',    avatarBg:'var(--wm-violet-light)',  avatarColor:'var(--wm-violet)' },
    { name:'Dr. Claire Martin', initials:'CM', role:'Doctor',  device:'Web · Chrome', duration:'Active 2h 10m', avatarBg:'var(--wm-primary-light)', avatarColor:'var(--wm-primary)' },
    { name:'Sophie Bernard',    initials:'SB', role:'Staff',   device:'Tablet · iOS', duration:'Active 30m',    avatarBg:'var(--wm-success-light)', avatarColor:'var(--wm-success)' },
    { name:'Marie Dupont',      initials:'MD', role:'Patient', device:'Mobile · Android',duration:'Active 5m', avatarBg:'var(--wm-primary-light)', avatarColor:'var(--wm-primary)' },
  ];

  readonly alerts = [
    { type:'warning', icon:'warning',      title:'High memory on App Server 2',  time:'2h 30m ago' },
    { type:'danger',  icon:'lock',         title:'Failed login attempts (3)',     time:'22 min ago' },
    { type:'info',    icon:'backup_table', title:'Scheduled backup due tonight',  time:'In 4h' },
  ];

  readonly hourlyData = [
    { hour:'7h',  pct:10 }, { hour:'8h',  pct:35 }, { hour:'9h',  pct:72 },
    { hour:'10h', pct:88 }, { hour:'11h', pct:65 }, { hour:'12h', pct:42 },
    { hour:'13h', pct:28 }, { hour:'14h', pct:70 }, { hour:'15h', pct:55 },
    { hour:'16h', pct:48 }, { hour:'17h', pct:22 }, { hour:'18h', pct:8 },
  ];

  readonly topActions = [
    { name:'Appointment Created',   count:342, pct:100, icon:'event',        bg:'var(--wm-primary-light)', color:'var(--wm-primary)' },
    { name:'Consultation Completed',count:287, pct:84,  icon:'stethoscope',  bg:'var(--wm-teal-light)',    color:'var(--wm-teal)' },
    { name:'Patient Registered',    count:187, pct:55,  icon:'person_add',   bg:'var(--wm-success-light)', color:'var(--wm-success)' },
    { name:'Invoice Generated',     count:156, pct:46,  icon:'receipt',      bg:'var(--wm-warning-light)', color:'var(--wm-warning)' },
    { name:'Lab Results Uploaded',  count:98,  pct:29,  icon:'science',      bg:'var(--wm-teal-light)',    color:'var(--wm-teal)' },
  ];
}
