import { AsyncPipe, DatePipe, LowerCasePipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { catchError, debounceTime, map, of, startWith, switchMap } from 'rxjs';
import { TreatmentApiService } from '../../core/services/treatment-api.service';

@Component({
  selector: 'wm-treatment-list',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    LowerCasePipe,
    NgFor,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    TitleCasePipe
  ],
  template: `
<div class="wm-page">
  <div class="wm-page-header" *ngIf="vm$ | async as vm">
    <div>
      <p class="wm-eyebrow">Traitements</p>
      <h1 class="wm-page-title">Suivi thérapeutique</h1>
      <p style="color:var(--wm-muted);font-size:var(--fs-sm);margin-top:6px">Médicaments et traitements partagés, avec lecture rapide des statuts.</p>
    </div>
    <button mat-raised-button color="primary"><mat-icon>add</mat-icon> Nouveau</button>
  </div>

  <div *ngIf="vm$ | async as vm" style="display:flex;flex-direction:column;gap:24px">
    <!-- Filters -->
    <div class="wm-card">
      <div class="wm-card-header">
        <div class="wm-section-title">Filtres</div>
      </div>
      <form [formGroup]="filtersForm" style="display:grid;grid-template-columns:1fr 1fr auto;gap:16px;padding:20px 24px;align-items:end">
        <div>
          <label style="display:block;font-size:var(--fs-xs);font-weight:600;color:var(--wm-muted);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px">Patient</label>
          <input type="text" formControlName="patientId" placeholder="Rechercher..." style="width:100%;border:1.5px solid var(--wm-border);border-radius:var(--r-md);padding:10px 14px;font-family:var(--wm-font);font-size:var(--fs-sm);color:var(--wm-text);transition:border-color var(--tr);outline:none" />
        </div>
        <div>
          <label style="display:block;font-size:var(--fs-xs);font-weight:600;color:var(--wm-muted);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px">Statut</label>
          <select formControlName="status" style="width:100%;border:1.5px solid var(--wm-border);border-radius:var(--r-md);padding:10px 14px;font-family:var(--wm-font);font-size:var(--fs-sm);color:var(--wm-text);background:var(--wm-surface);transition:border-color var(--tr);outline:none;cursor:pointer">
            <option value="">Tous</option>
            <option value="ACTIVE">Actif</option>
            <option value="PAUSED">En pause</option>
            <option value="COMPLETED">Terminé</option>
            <option value="CANCELLED">Annulé</option>
          </select>
        </div>
        <button type="button" mat-stroked-button (click)="resetFilters()" style="height:fit-content"><mat-icon>refresh</mat-icon></button>
      </form>
    </div>

    <!-- Status KPI -->
    <div class="wm-grid-4" *ngIf="vm.treatments.length > 0">
      <div class="kpi-card">
        <div class="kpi-icon" style="background:var(--wm-success-light)"><mat-icon style="color:var(--wm-success)">check_circle</mat-icon></div>
        <div class="kpi-value">{{ vm.active }}</div>
        <div class="kpi-label">Actifs</div>
        <div class="kpi-accent-bar" style="background:var(--wm-success)"></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon" style="background:var(--wm-warning-light)"><mat-icon style="color:var(--wm-warning)">pause_circle</mat-icon></div>
        <div class="kpi-value">{{ vm.paused }}</div>
        <div class="kpi-label">En pause</div>
        <div class="kpi-accent-bar" style="background:var(--wm-warning)"></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon" style="background:var(--wm-primary-light)"><mat-icon style="color:var(--wm-primary)">done_all</mat-icon></div>
        <div class="kpi-value">{{ vm.completed }}</div>
        <div class="kpi-label">Terminés</div>
        <div class="kpi-accent-bar" style="background:var(--wm-primary)"></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon" style="background:var(--wm-danger-light)"><mat-icon style="color:var(--wm-danger)">cancel</mat-icon></div>
        <div class="kpi-value">{{ vm.cancelled }}</div>
        <div class="kpi-label">Annulés</div>
        <div class="kpi-accent-bar" style="background:var(--wm-danger)"></div>
      </div>
    </div>

    <!-- Treatments Grid -->
    <div *ngIf="vm.treatments.length > 0; else emptyState">
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:20px">
        <div class="wm-card" *ngFor="let t of vm.treatments" style="display:flex;flex-direction:column;padding:0;overflow:hidden">
          <div style="padding:20px 24px;border-bottom:1px solid var(--wm-border-light);display:flex;align-items:center;gap:12px">
            <div style="width:40px;height:40px;border-radius:var(--r-lg);background:var(--wm-teal-light);display:flex;align-items:center;justify-content:center"><mat-icon style="color:var(--wm-teal)">medication</mat-icon></div>
            <div style="flex:1">
              <div style="font-weight:600;color:var(--wm-text-strong);font-size:var(--fs-md)">{{ t.name }}</div>
              <div style="font-size:var(--fs-xs);color:var(--wm-muted);margin-top:2px">{{ t.type }}</div>
            </div>
            <span class="badge" [class]="'badge-' + (t.status | lowercase)">{{ t.status | titlecase }}</span>
          </div>
          <div style="padding:20px 24px;flex:1">
            <div style="display:grid;gap:10px;font-size:var(--fs-sm)">
              <div style="display:flex;justify-content:space-between;align-items:center">
                <span style="color:var(--wm-muted)">Patient</span>
                <span style="color:var(--wm-text-strong);font-weight:500">{{ t.patientId }}</span>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center">
                <span style="color:var(--wm-muted)">Posologie</span>
                <span style="color:var(--wm-text-strong);font-weight:500">{{ t.dosage || '—' }}</span>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center">
                <span style="color:var(--wm-muted)">Fréquence</span>
                <span style="color:var(--wm-text-strong);font-weight:500">{{ t.frequency || '—' }}</span>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center">
                <span style="color:var(--wm-muted)">Début</span>
                <span style="color:var(--wm-text-strong);font-weight:500">{{ t.startDate | date:'short' }}</span>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center" *ngIf="t.endDate">
                <span style="color:var(--wm-muted)">Fin</span>
                <span style="color:var(--wm-text-strong);font-weight:500">{{ t.endDate | date:'short' }}</span>
              </div>
            </div>
          </div>
          <div style="padding:14px 24px;border-top:1px solid var(--wm-border-light);display:flex;gap:8px">
            <a mat-stroked-button style="flex:1;font-size:var(--fs-xs)!important" [routerLink]="['/treatments', t.id]"><mat-icon>visibility</mat-icon> Voir</a>
            <a mat-raised-button color="primary" style="flex:1;font-size:var(--fs-xs)!important" [routerLink]="['/treatments', t.id, 'edit']"><mat-icon>edit</mat-icon> Modifier</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <ng-template #emptyState>
      <div class="wm-empty">
        <mat-icon class="empty-icon">inbox</mat-icon>
        <div class="empty-title">{{ vm.feedback }}</div>
        <div class="empty-body">Aucun traitement ne correspond à vos critères de recherche.</div>
      </div>
    </ng-template>
  </div>
</div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreatmentListComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly treatmentApiService = inject(TreatmentApiService);

  readonly filtersForm = this.formBuilder.nonNullable.group({
    patientId: [''],
    status: ['']
  });

  readonly vm$ = this.filtersForm.valueChanges.pipe(
    startWith(this.filtersForm.getRawValue()),
    debounceTime(150),
    switchMap((filters) =>
      this.treatmentApiService.getTreatments(
        filters.patientId || undefined,
        (filters.status || undefined) as any
      ).pipe(
        map((treatments) => {
          const allTreatments = treatments.length === 0 && !filters.status
            ? []
            : treatments;
          return {
            treatments: allTreatments,
            total: allTreatments.length,
            active: allTreatments.filter(t => t.status === 'ACTIVE').length,
            paused: allTreatments.filter(t => t.status === 'PAUSED').length,
            completed: allTreatments.filter(t => t.status === 'COMPLETED').length,
            cancelled: allTreatments.filter(t => t.status === 'CANCELLED').length,
            feedback: allTreatments.length ? '' : 'Aucun traitement retourné par l\'API.'
          };
        }),
        catchError(() =>
          of({
            treatments: [],
            total: 0,
            active: 0,
            paused: 0,
            completed: 0,
            cancelled: 0,
            feedback: 'API traitements indisponible pour le moment.'
          })
        )
      )
    )
  );

  resetFilters(): void {
    this.filtersForm.reset({
      patientId: '',
      status: ''
    });
  }
}
