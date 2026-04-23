import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { TreatmentFormDto } from '../../core/models';
import { TreatmentApiService } from '../../core/services/treatment-api.service';

@Component({
  selector: 'wm-treatment-form',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  template: `
    <section class="form-page">
      <mat-card class="form-card">
        <h1>{{ isEditMode() ? 'Edition traitement' : 'Nouveau traitement' }}</h1>
        <p>Prescription et suivi therapeutique d'un patient depuis une consultation ou un plan de soin.</p>

        <form [formGroup]="form" (ngSubmit)="submit()">
          <div class="grid two-cols">
            <mat-form-field appearance="outline">
              <mat-label>Patient</mat-label>
              <input matInput formControlName="patientId">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Medecin prescripteur</mat-label>
              <input matInput formControlName="prescribedByDoctorId">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Consultation</mat-label>
              <input matInput formControlName="consultationId">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Nom du traitement</mat-label>
              <input matInput formControlName="name">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Type</mat-label>
              <mat-select formControlName="type">
                <mat-option value="MEDICATION">Medication</mat-option>
                <mat-option value="THERAPY">Therapy</mat-option>
                <mat-option value="FOLLOW_UP">Follow up</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Statut</mat-label>
              <mat-select formControlName="status">
                <mat-option value="ACTIVE">Active</mat-option>
                <mat-option value="PAUSED">Paused</mat-option>
                <mat-option value="COMPLETED">Completed</mat-option>
                <mat-option value="CANCELLED">Cancelled</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Dosage</mat-label>
              <input matInput formControlName="dosage">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Frequence</mat-label>
              <input matInput formControlName="frequency">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Date de debut</mat-label>
              <input matInput formControlName="startDate" type="date">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Date de fin</mat-label>
              <input matInput formControlName="endDate" type="date">
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Instructions</mat-label>
              <textarea matInput formControlName="instructions" rows="3"></textarea>
            </mat-form-field>
          </div>

          <p class="feedback success" *ngIf="successMessage()">{{ successMessage() }}</p>
          <p class="feedback error" *ngIf="errorMessage()">{{ errorMessage() }}</p>

          <div class="actions">
            <button mat-stroked-button type="button" (click)="reset()">Reinitialiser</button>
            <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid || isSubmitting()">
              {{ isSubmitting() ? 'Enregistrement...' : (isEditMode() ? 'Mettre a jour' : 'Creer le traitement') }}
            </button>
          </div>
        </form>
      </mat-card>
    </section>
  `,
  styles: [`
    .form-page {
      display: grid;
      place-items: center;
      padding: 1rem 0 2rem;
    }

    .form-card {
      width: min(100%, 980px);
      padding: 1rem;
      border-radius: 28px;
      border: 1px solid var(--wm-border);
      box-shadow: 0 24px 48px rgba(31, 57, 88, 0.12);
      background: rgba(255, 255, 255, 0.95);
    }

    form {
      display: grid;
      gap: 1rem;
    }

    .grid {
      display: grid;
      gap: 1rem;
    }

    .two-cols {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .full-width {
      grid-column: 1 / -1;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
    }

    .feedback {
      margin: 0;
      font-weight: 600;
    }

    .success {
      color: #0a7f48;
    }

    .error {
      color: #b3261e;
    }

    @media (max-width: 900px) {
      .two-cols {
        grid-template-columns: 1fr;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreatmentFormComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly treatmentApiService = inject(TreatmentApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly treatmentId = this.route.snapshot.paramMap.get('id');

  readonly isSubmitting = signal(false);
  readonly isEditMode = signal(!!this.treatmentId);
  readonly successMessage = signal('');
  readonly errorMessage = signal('');

  readonly form = this.formBuilder.nonNullable.group({
    patientId: ['', Validators.required],
    prescribedByDoctorId: ['', Validators.required],
    consultationId: [''],
    name: ['', Validators.required],
    type: ['MEDICATION' as TreatmentFormDto['type'], Validators.required],
    dosage: [''],
    frequency: [''],
    instructions: [''],
    startDate: ['', Validators.required],
    endDate: [''],
    status: ['ACTIVE' as TreatmentFormDto['status'], Validators.required]
  });

  constructor() {
    if (this.treatmentId) {
      this.treatmentApiService.getTreatmentById(this.treatmentId).subscribe({
        next: (treatment) => {
          this.form.patchValue({
            patientId: treatment.patientId,
            prescribedByDoctorId: treatment.prescribedByDoctorId,
            consultationId: treatment.consultationId ?? '',
            name: treatment.name,
            type: treatment.type,
            dosage: treatment.dosage ?? '',
            frequency: treatment.frequency ?? '',
            instructions: treatment.instructions ?? '',
            startDate: treatment.startDate,
            endDate: treatment.endDate ?? '',
            status: treatment.status
          });
        },
        error: () => this.errorMessage.set('Chargement du traitement impossible.')
      });
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.successMessage.set('');
    this.errorMessage.set('');

    const request$ = this.treatmentId
      ? this.treatmentApiService.updateTreatment(this.treatmentId, this.toPayload())
      : this.treatmentApiService.createTreatment(this.toPayload());

    request$
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: (treatment) => {
          this.successMessage.set(
            this.treatmentId
              ? `Traitement ${treatment.name} mis a jour avec succes.`
              : `Traitement ${treatment.name} cree avec succes.`
          );

          if (this.treatmentId) {
            void this.router.navigate(['/treatments', treatment.id]);
            return;
          }

          this.reset();
        },
        error: () => this.errorMessage.set('Enregistrement du traitement impossible. Verifiez l\'API backend.')
      });
  }

  reset(): void {
    this.form.reset({
      patientId: '',
      prescribedByDoctorId: '',
      consultationId: '',
      name: '',
      type: 'MEDICATION',
      dosage: '',
      frequency: '',
      instructions: '',
      startDate: '',
      endDate: '',
      status: 'ACTIVE'
    });
  }

  private toPayload(): TreatmentFormDto {
    const value = this.form.getRawValue();

    return {
      patientId: value.patientId,
      prescribedByDoctorId: value.prescribedByDoctorId,
      consultationId: value.consultationId || undefined,
      name: value.name,
      type: value.type,
      dosage: value.dosage || undefined,
      frequency: value.frequency || undefined,
      instructions: value.instructions || undefined,
      startDate: value.startDate,
      endDate: value.endDate || undefined,
      status: value.status
    };
  }
}
