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
import { AppointmentFormDto } from '../../core/models';
import { AppointmentApiService } from '../../core/services/appointment-api.service';

@Component({
  selector: 'wm-appointment-form',
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
        <h1>{{ isEditMode() ? 'Edition rendez-vous' : 'Nouveau rendez-vous' }}</h1>
        <p>Planification ou mise a jour d'un rendez-vous patient par service avec statut initial et affectation medecin.</p>

        <form [formGroup]="form" (ngSubmit)="submit()">
          <div class="grid two-cols">
            <mat-form-field appearance="outline">
              <mat-label>Etablissement</mat-label>
              <input matInput formControlName="establishmentId">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Service</mat-label>
              <input matInput formControlName="serviceId">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Specialite</mat-label>
              <input matInput formControlName="specialtyId">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Patient</mat-label>
              <input matInput formControlName="patientId">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Medecin</mat-label>
              <input matInput formControlName="doctorId">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Demandeur</mat-label>
              <input matInput formControlName="requestedByUserId">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Date et heure</mat-label>
              <input matInput formControlName="scheduledAt" type="datetime-local">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Duree (minutes)</mat-label>
              <input matInput formControlName="durationMinutes" type="number" min="5">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Statut</mat-label>
              <mat-select formControlName="status">
                <mat-option value="REQUESTED">Requested</mat-option>
                <mat-option value="PENDING_APPROVAL">Pending approval</mat-option>
                <mat-option value="APPROVED">Approved</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Motif</mat-label>
              <textarea matInput formControlName="reason" rows="3"></textarea>
            </mat-form-field>
          </div>

          <p class="feedback success" *ngIf="successMessage()">{{ successMessage() }}</p>
          <p class="feedback error" *ngIf="errorMessage()">{{ errorMessage() }}</p>

          <div class="actions">
            <button mat-stroked-button type="button" (click)="reset()">Reinitialiser</button>
            <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid || isSubmitting()">
              {{ isSubmitting() ? 'Enregistrement...' : (isEditMode() ? 'Mettre a jour' : 'Creer le rendez-vous') }}
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
export class AppointmentFormComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly appointmentApiService = inject(AppointmentApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly appointmentId = this.route.snapshot.paramMap.get('id');

  readonly isSubmitting = signal(false);
  readonly isEditMode = signal(!!this.appointmentId);
  readonly successMessage = signal('');
  readonly errorMessage = signal('');

  readonly form = this.formBuilder.nonNullable.group({
    establishmentId: ['main-establishment', Validators.required],
    serviceId: ['', Validators.required],
    specialtyId: [''],
    patientId: ['', Validators.required],
    doctorId: [''],
    requestedByUserId: ['admin-001'],
    scheduledAt: ['', Validators.required],
    durationMinutes: [30, [Validators.required, Validators.min(5)]],
    status: ['REQUESTED' as AppointmentFormDto['status'], Validators.required],
    reason: ['']
  });

  constructor() {
    if (this.appointmentId) {
      this.appointmentApiService.getAppointmentById(this.appointmentId).subscribe({
        next: (appointment) => {
          this.form.patchValue({
            establishmentId: appointment.establishmentId,
            serviceId: appointment.serviceId,
            specialtyId: appointment.specialtyId ?? '',
            patientId: appointment.patientId,
            doctorId: appointment.doctorId ?? '',
            requestedByUserId: appointment.requestedByUserId ?? '',
            scheduledAt: appointment.scheduledAt,
            durationMinutes: appointment.durationMinutes,
            status: appointment.status,
            reason: appointment.reason ?? ''
          });
        },
        error: () => this.errorMessage.set('Chargement du rendez-vous impossible.')
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

    const request$ = this.appointmentId
      ? this.appointmentApiService.updateAppointment(this.appointmentId, this.toPayload())
      : this.appointmentApiService.requestAppointment(this.toPayload());

    request$
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: (appointment) => {
          this.successMessage.set(
            this.appointmentId
              ? `Rendez-vous ${appointment.status} mis a jour avec succes.`
              : `Rendez-vous ${appointment.status} cree avec succes.`
          );

          if (this.appointmentId) {
            void this.router.navigate(['/appointments', appointment.id]);
            return;
          }

          this.reset();
        },
        error: () => this.errorMessage.set('Enregistrement du rendez-vous impossible. Verifiez l\'API backend.')
      });
  }

  reset(): void {
    this.form.reset({
      establishmentId: 'main-establishment',
      serviceId: '',
      specialtyId: '',
      patientId: '',
      doctorId: '',
      requestedByUserId: 'admin-001',
      scheduledAt: '',
      durationMinutes: 30,
      status: 'REQUESTED',
      reason: ''
    });
  }

  private toPayload(): AppointmentFormDto {
    const value = this.form.getRawValue();

    return {
      establishmentId: value.establishmentId,
      serviceId: value.serviceId,
      specialtyId: value.specialtyId || undefined,
      patientId: value.patientId,
      doctorId: value.doctorId || undefined,
      scheduledAt: value.scheduledAt,
      durationMinutes: Number(value.durationMinutes),
      reason: value.reason || undefined,
      requestedByUserId: value.requestedByUserId || undefined,
      status: value.status
    };
  }
}
