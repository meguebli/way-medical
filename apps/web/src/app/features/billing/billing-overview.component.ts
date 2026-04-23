import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'wm-billing-overview',
  standalone: true,
  imports: [NgFor, NgIf, CurrencyPipe, RouterLink, MatIconModule, MatButtonModule],
  template: `
<div class="wm-page">
  <div class="wm-page-header">
    <div>
      <p class="wm-eyebrow">Finance</p>
      <h1 class="wm-page-title">Billing Overview</h1>
    </div>
    <div style="display:flex;gap:10px">
      <button mat-stroked-button><mat-icon>download</mat-icon> Export</button>
      <button mat-raised-button color="primary"><mat-icon>receipt_long</mat-icon> New Invoice</button>
    </div>
  </div>

  <!-- Revenue KPIs -->
  <div class="wm-grid-4 kpi-row">
    <div class="kpi-card" *ngFor="let k of kpis">
      <div class="kpi-icon" [style.background]="k.bg">
        <mat-icon [style.color]="k.color">{{ k.icon }}</mat-icon>
      </div>
      <div class="kpi-value">{{ k.value }}</div>
      <div class="kpi-label">{{ k.label }}</div>
      <div class="kpi-change" [class]="k.changeClass">
        <mat-icon>{{ k.changeIcon }}</mat-icon>{{ k.change }}
      </div>
      <div class="kpi-accent-bar" [style.background]="k.color"></div>
    </div>
  </div>

  <!-- Main Grid -->
  <div class="billing-grid">

    <!-- Revenue Chart -->
    <div class="wm-card revenue-chart-card">
      <div class="wm-card-header">
        <div>
          <div class="wm-section-title">Monthly Revenue</div>
          <div style="font-size:var(--fs-xs);color:var(--wm-muted);margin-top:2px">2025 — All services</div>
        </div>
        <div class="wm-tabs">
          <button class="wm-tab active">Monthly</button>
          <button class="wm-tab">Quarterly</button>
          <button class="wm-tab">Yearly</button>
        </div>
      </div>
      <div class="wm-card-body">
        <div class="bar-chart-full">
          <div class="bcf-group" *ngFor="let d of monthlyRevenue">
            <div class="bcf-bars">
              <div class="bcf-bar" [style.height]="d.pct + '%'" [style.background]="d.color" [title]="'€' + d.amount"></div>
            </div>
            <div class="bcf-label">{{ d.month }}</div>
            <div class="bcf-val">{{ d.amount | currency:'EUR':'symbol':'1.0-0' }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Breakdown Donut -->
    <div class="wm-card">
      <div class="wm-card-header">
        <div class="wm-section-title">Revenue by Service</div>
      </div>
      <div class="wm-card-body">
        <div class="donut-chart">
          <svg viewBox="0 0 100 100" class="donut-svg">
            <circle cx="50" cy="50" r="35" fill="none" stroke="#e4ecf5" stroke-width="14"/>
            <circle cx="50" cy="50" r="35" fill="none" stroke="var(--wm-primary)" stroke-width="14" stroke-dasharray="88 132" stroke-dashoffset="0" stroke-linecap="round" transform="rotate(-90 50 50)"/>
            <circle cx="50" cy="50" r="35" fill="none" stroke="var(--wm-teal)" stroke-width="14" stroke-dasharray="50 170" stroke-dashoffset="-88" stroke-linecap="round" transform="rotate(-90 50 50)"/>
            <circle cx="50" cy="50" r="35" fill="none" stroke="var(--wm-success-mid)" stroke-width="14" stroke-dasharray="30 190" stroke-dashoffset="-138" stroke-linecap="round" transform="rotate(-90 50 50)"/>
            <circle cx="50" cy="50" r="35" fill="none" stroke="var(--wm-warning-mid)" stroke-width="14" stroke-dasharray="12 208" stroke-dashoffset="-168" stroke-linecap="round" transform="rotate(-90 50 50)"/>
            <text x="50" y="46" text-anchor="middle" font-size="10" font-weight="800" fill="var(--wm-text-strong)">€48.7k</text>
            <text x="50" y="58" text-anchor="middle" font-size="5" fill="var(--wm-muted)">Total</text>
          </svg>
        </div>
        <div class="service-legend">
          <div class="sl-item" *ngFor="let s of serviceRevenue">
            <div class="sl-dot" [style.background]="s.color"></div>
            <div class="sl-name">{{ s.name }}</div>
            <div class="sl-val">{{ s.amount | currency:'EUR':'symbol':'1.0-0' }}</div>
            <div class="sl-pct" [style.color]="s.color">{{ s.pct }}%</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Invoices Table -->
  <div class="wm-card" style="margin-top:24px">
    <div class="wm-card-header">
      <div>
        <div class="wm-section-title">Recent Invoices</div>
        <div style="font-size:var(--fs-xs);color:var(--wm-muted);margin-top:2px">Last 30 days</div>
      </div>
      <div style="display:flex;gap:10px;align-items:center">
        <div class="wm-search-input" style="min-width:200px">
          <mat-icon>search</mat-icon>
          <input type="text" placeholder="Search invoices…" (input)="setSearch($event)" />
        </div>
        <div class="wm-tabs" style="width:auto">
          <button *ngFor="let f of invoiceFilters" class="wm-tab" [class.active]="activeFilter() === f.key" (click)="activeFilter.set(f.key)">{{ f.label }}</button>
        </div>
      </div>
    </div>
    <div class="wm-table-wrap" style="border:none;border-radius:0;box-shadow:none">
      <table class="wm-table">
        <thead>
          <tr>
            <th>Invoice #</th>
            <th>Patient</th>
            <th>Service</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Coverage</th>
            <th>Balance Due</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let inv of filteredInvoices()">
            <td><span class="td-mono">{{ inv.ref }}</span></td>
            <td>
              <div style="display:flex;align-items:center;gap:8px">
                <div class="avatar avatar-sm" [style.background]="inv.avatarBg" [style.color]="inv.avatarColor">{{ inv.initials }}</div>
                <span class="td-primary">{{ inv.patient }}</span>
              </div>
            </td>
            <td style="color:var(--wm-muted);font-size:var(--fs-sm)">{{ inv.service }}</td>
            <td style="font-size:var(--fs-sm)">{{ inv.date }}</td>
            <td class="td-primary">{{ inv.amount | currency:'EUR':'symbol':'1.0-0' }}</td>
            <td>
              <div style="font-size:var(--fs-xs);color:var(--wm-muted)">{{ inv.insurance }}</div>
              <div style="font-size:var(--fs-xs);color:var(--wm-success);font-weight:600">-{{ inv.covered | currency:'EUR':'symbol':'1.0-0' }}</div>
            </td>
            <td>
              <span [style.font-weight]="inv.balance > 0 ? '700' : '400'"
                [style.color]="inv.balance > 0 ? 'var(--wm-danger)' : 'var(--wm-success)'">
                {{ inv.balance | currency:'EUR':'symbol':'1.0-0' }}
              </span>
            </td>
            <td>
              <span class="badge" [class]="'badge-' + inv.statusClass">
                <span class="badge-dot"></span>{{ inv.status }}
              </span>
            </td>
            <td>
              <div style="display:flex;gap:2px">
                <button mat-icon-button><mat-icon>visibility</mat-icon></button>
                <button mat-icon-button><mat-icon>download</mat-icon></button>
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
    .kpi-row { margin-bottom: 28px; }
    .billing-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; }

    /* Bar chart */
    .bar-chart-full { display: flex; align-items: flex-end; gap: 8px; height: 160px; }
    .bcf-group { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; height: 100%; }
    .bcf-bars { flex: 1; display: flex; align-items: flex-end; width: 100%; }
    .bcf-bar { width: 100%; border-radius: 6px 6px 0 0; min-height: 4px; transition: height 600ms cubic-bezier(0.4,0,0.2,1); }
    .bcf-label { font-size: var(--fs-xs); color: var(--wm-muted-light); font-weight: 500; }
    .bcf-val   { font-size: 9px; color: var(--wm-muted); }

    /* Donut */
    .donut-chart { display: flex; justify-content: center; margin-bottom: 16px; }
    .donut-svg { width: 150px; height: 150px; }
    .service-legend { display: flex; flex-direction: column; gap: 10px; }
    .sl-item { display: flex; align-items: center; gap: 8px; }
    .sl-dot   { width: 10px; height: 10px; border-radius: 3px; flex-shrink: 0; }
    .sl-name  { flex: 1; font-size: var(--fs-sm); color: var(--wm-muted); }
    .sl-val   { font-size: var(--fs-sm); font-weight: 600; color: var(--wm-text); }
    .sl-pct   { font-size: var(--fs-xs); font-weight: 700; min-width: 32px; text-align: right; }

    @media (max-width: 1100px) { .billing-grid { grid-template-columns: 1fr; } }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillingOverviewComponent {
  readonly search       = signal('');
  readonly activeFilter = signal<string>('ALL');

  readonly invoiceFilters = [
    { key: 'ALL',     label: 'All' },
    { key: 'PAID',    label: 'Paid' },
    { key: 'PENDING', label: 'Pending' },
    { key: 'OVERDUE', label: 'Overdue' },
  ];

  readonly kpis = [
    { icon: 'payments',       label: 'Monthly Revenue',   value: '€48,750', bg: 'var(--wm-success-light)', color: 'var(--wm-success)',  change: '+12.4%', changeClass: 'up',   changeIcon: 'trending_up' },
    { icon: 'pending_actions',label: 'Pending Invoices',  value: '23',      bg: 'var(--wm-warning-light)', color: 'var(--wm-warning)',  change: '3 overdue', changeClass: 'down', changeIcon: 'trending_up' },
    { icon: 'check_circle',   label: 'Paid This Month',   value: '€41,200', bg: 'var(--wm-primary-light)', color: 'var(--wm-primary)',  change: '+9.8%',  changeClass: 'up',   changeIcon: 'trending_up' },
    { icon: 'warning',        label: 'Overdue Balance',   value: '€1,240',  bg: 'var(--wm-danger-light)',  color: 'var(--wm-danger)',   change: '3 invoices', changeClass: 'down', changeIcon: 'trending_up' },
  ];

  readonly monthlyRevenue = [
    { month: 'Jan', amount: 38200, pct: 59, color: 'var(--wm-primary)' },
    { month: 'Feb', amount: 41500, pct: 64, color: 'var(--wm-primary)' },
    { month: 'Mar', amount: 43800, pct: 68, color: 'var(--wm-primary)' },
    { month: 'Apr', amount: 48750, pct: 75, color: 'var(--wm-primary)' },
    { month: 'May', amount: 0,     pct: 5,  color: 'var(--wm-border)' },
    { month: 'Jun', amount: 0,     pct: 5,  color: 'var(--wm-border)' },
  ];

  readonly serviceRevenue = [
    { name: 'Consultations', amount: 24300, pct: 50, color: 'var(--wm-primary)' },
    { name: 'Procedures',    amount: 14800, pct: 30, color: 'var(--wm-teal)' },
    { name: 'Lab / Imaging', amount:  9650, pct: 20, color: 'var(--wm-success-mid)' },
  ];

  readonly invoices = [
    { ref:'INV-2025-0489', patient:'Marie Dupont',       initials:'MD', service:'Cardiology',      date:'Apr 10, 2025', amount:320, covered:224, balance:96,  status:'Pending', statusClass:'pending',   avatarBg:'var(--wm-primary-light)', avatarColor:'var(--wm-primary)', insurance:'CPAM 70%' },
    { ref:'INV-2025-0488', patient:'Jean-Pierre Moreau', initials:'JM', service:'General Medicine', date:'Apr 9, 2025',  amount:75,  covered:52,  balance:0,   status:'Paid',    statusClass:'completed',  avatarBg:'var(--wm-teal-light)',    avatarColor:'var(--wm-teal)',    insurance:'CPAM+Mut' },
    { ref:'INV-2025-0487', patient:'Robert Lefevre',     initials:'RL', service:'Radiology',        date:'Apr 8, 2025',  amount:120, covered:84,  balance:36,  status:'Pending', statusClass:'pending',   avatarBg:'var(--wm-warning-light)', avatarColor:'var(--wm-warning)', insurance:'CPAM 70%' },
    { ref:'INV-2025-0486', patient:'Nadia Leclerc',      initials:'NL', service:'Dermatology',      date:'Mar 28, 2025', amount:90,  covered:0,   balance:90,  status:'Overdue', statusClass:'cancelled',  avatarBg:'var(--wm-danger-light)',  avatarColor:'var(--wm-danger)',  insurance:'None' },
    { ref:'INV-2025-0485', patient:'Isabelle Tremblay',  initials:'IT', service:'Cardiology',       date:'Mar 22, 2025', amount:240, covered:168, balance:0,   status:'Paid',    statusClass:'completed',  avatarBg:'var(--wm-success-light)', avatarColor:'var(--wm-success)', insurance:'CPAM 70%' },
    { ref:'INV-2025-0484', patient:'Sylvie Beaumont',    initials:'SB', service:'Neurology',        date:'Mar 15, 2025', amount:180, covered:126, balance:54,  status:'Pending', statusClass:'pending',   avatarBg:'var(--wm-violet-light)',  avatarColor:'var(--wm-violet)',  insurance:'CPAM 70%' },
    { ref:'INV-2025-0483', patient:'Henri Marchand',     initials:'HM', service:'Cardiology',       date:'Mar 5, 2025',  amount:560, covered:392, balance:0,   status:'Paid',    statusClass:'completed',  avatarBg:'var(--wm-danger-light)',  avatarColor:'var(--wm-danger)',  insurance:'CPAM 70%' },
    { ref:'INV-2025-0482', patient:'Alain Rousseau',     initials:'AR', service:'General Medicine', date:'Feb 28, 2025', amount:75,  covered:52,  balance:0,   status:'Paid',    statusClass:'completed',  avatarBg:'var(--wm-bg-soft)',        avatarColor:'var(--wm-muted)',   insurance:'CPAM 70%' },
  ];

  readonly filteredInvoices = computed(() => {
    const q = this.search().toLowerCase();
    const f = this.activeFilter();
    return this.invoices.filter(inv => {
      const matchFilter = f === 'ALL'
        || (f === 'PAID'    && inv.statusClass === 'completed')
        || (f === 'PENDING' && inv.statusClass === 'pending')
        || (f === 'OVERDUE' && inv.statusClass === 'cancelled');
      const matchSearch = !q || inv.patient.toLowerCase().includes(q) || inv.ref.toLowerCase().includes(q);
      return matchFilter && matchSearch;
    });
  });

  setSearch(e: Event): void { this.search.set((e.target as HTMLInputElement).value); }
}
