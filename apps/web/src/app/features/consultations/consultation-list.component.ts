import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
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
import { ConsultationApiService } from '../../core/services/consultation-api.service';

@Component({
  selector: 'wm-consultation-list',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
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
    MatSelectModule
  ],
  template: `
    <section class="page" *ngIf="vm$ | async as vm">
      <header class="page-header">
        <div>
          <p class="eyebrow">Consultations</p>
          <h1>Activite clinique</h1>
          <p class="lead">Vue synthetique des consultations, diagnostics et statuts de prise en charge.</p>
        </div>
        <mat-chip>{{ vm.total }} consultations</mat-chip>
      </header>

      <form class="filters" [formGroup]="filtersForm">
        <mat-form-field appearance="outline">
          <mat-label>Patient</mat-label>
          <input matInput formControlName="patientId" placeholder="patient-001">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Medecin</mat-label>
          <input matInput formControlName="doctorId" placeholder="doctor-001">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Service</mat-label>
          <input matInput formControlName="serviceId" placeholder="service-001">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Statut</mat-label>
          <mat-select formControlName="status">
            <mat-option value="">Tous</mat-option>
            <mat-option value="DRAFT">Draft</mat-option>
            <mat-option value="IN_PROGRESS">In progress</mat-option>
            <mat-option value="COMPLETED">Completed</mat-option>
          </mat-select>
        </mat-form-field>

        <button mat-stroked-button type="button" (click)="resetFilters()">Reinitialiser</button>
      </form>

      <p class="feedback" *ngIf="vm.feedback">{{ vm.feedback }}</p>

      <section class="grid">
        <mat-card class="item-card" *ngFor="let consultation of vm.consultations">
          <mat-card-header>
            <mat-icon mat-card-avatar>medical_services</mat-icon>
            <mat-card-title>{{ consultation.status }}</mat-card-title>
            <mat-card-subtitle>{{ consultation.consultationDate | date:'medium' }}</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <p><strong>Patient :</strong> {{ consultation.patientId }}</p>
            <p><strong>Medecin :</strong> {{ consultation.doctorId }}</p>
            <p><strong>Service :</strong> {{ consultation.serviceId }}</p>
            <p><strong>Motif :</strong> {{ consultation.chiefComplaint || 'Non renseigne' }}</p>
            <p><strong>Diagnostic :</strong> {{ consultation.diagnosis || 'En attente' }}</p>
          </mat-card-content>

          <mat-card-actions>
            <a mat-button [routerLink]="['/consultations', consultation.id]">Voir la fiche</a>
            <a mat-flat-button color="primary" [routerLink]="['/consultations', consultation.id, 'edit']">Modifier</a>
          </mat-card-actions>
        </mat-card>
      </section>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }

    .page {
      display: grid;
      gap: 1.5rem;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      align-items: start;
    }

    .eyebrow {
      margin: 0 0 0.5rem;
      color: var(--wm-primary);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-size: 0.75rem;
    }

    h1 {
      margin: 0;
      font-size: clamp(1.8rem, 3vw, 2.6rem);
    }

    .lead,
    .feedback {
      margin: 0.5rem 0 0;
      color: var(--wm-muted);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1rem;
    }

    .filters {
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: 1rem;
      align-items: start;
    }

    .item-card {
      border-radius: 24px;
      border: 1px solid var(--wm-border);
      background: rgba(255, 255, 255, 0.94);
      box-shadow: 0 16px 32px rgba(31, 57, 88, 0.08);
    }

    @media (max-width: 960px) {
      .filters {
        grid-template-columns: 1fr 1fr;
      }
    }

    @media (max-width: 720px) {
      .filters {
        grid-template-columns: 1fr;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsultationListComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly consultationApiService = inject(ConsultationApiService);

  readonly filtersForm = this.formBuilder.nonNullable.group({
    patientId: [''],
    doctorId: [''],
    serviceId: [''],
    status: ['']
  });

  readonly vm$ = this.filtersForm.valueChanges.pipe(
    startWith(this.filtersForm.getRawValue()),
    debounceTime(150),
    switchMap((filters) =>
      this.consultationApiService.getConsultations({
        patientId: filters.patientId || undefined,
        doctorId: filters.doctorId || undefined,
        serviceId: filters.serviceId || undefined,
        status: (filters.status || undefined) as any
      }).pipe(
        map((consultations) => ({
          consultations,
          total: consultations.length,
          feedback: consultations.length ? '' : 'Aucune consultation retournee par l\'API.'
        })),
        catchError(() =>
          of({
            consultations: [],
            total: 0,
            feedback: 'API consultations indisponible pour le moment.'
          })
        )
      )
    )
  );

  resetFilters(): void {
    this.filtersForm.reset({
      patientId: '',
      doctorId: '',
      serviceId: '',
      status: ''
    });
  }
}
