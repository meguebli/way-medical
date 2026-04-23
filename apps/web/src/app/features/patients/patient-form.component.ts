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
import { PatientFormDto } from '../../core/models';
import { PatientApiService } from '../../core/services/patient-api.service';

@Component({
  selector: 'wm-patient-form',
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
        <h1>{{ isEditMode() ? 'Edition patient' : 'Nouveau patient' }}</h1>
        <p>Creation ou mise a jour d'un dossier patient avec identite, contact et informations medicales de base.</p>

        <form [formGroup]="form" (ngSubmit)="submit()">
          <div class="grid two-cols">
            <mat-form-field appearance="outline">
              <mat-label>Etablissement</mat-label>
              <input matInput formControlName="establishmentId">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Code patient</mat-label>
              <input matInput formControlName="patientCode">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Prenom</mat-label>
              <input matInput formControlName="firstName">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Nom</mat-label>
              <input matInput formControlName="lastName">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Date de naissance</mat-label>
              <input matInput formControlName="birthDate" type="date">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Genre</mat-label>
              <mat-select formControlName="gender">
                <mat-option value="MALE">Masculin</mat-option>
                <mat-option value="FEMALE">Feminin</mat-option>
                <mat-option value="OTHER">Autre</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Telephone</mat-label>
              <input matInput formControlName="phone">
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Adresse</mat-label>
              <input matInput formControlName="address">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Ville</mat-label>
              <input matInput formControlName="city">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Numero INS</mat-label>
              <input matInput formControlName="insNumber">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Securite sociale</mat-label>
              <input matInput formControlName="socialSecurityNumber">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Groupe sanguin</mat-label>
              <input matInput formControlName="bloodType">
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Allergies (separees par une virgule)</mat-label>
              <textarea matInput formControlName="allergiesText" rows="2"></textarea>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Contact d'urgence</mat-label>
              <input matInput formControlName="emergencyContactName">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Lien</mat-label>
              <input matInput formControlName="emergencyContactRelationship">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Telephone urgence</mat-label>
              <input matInput formControlName="emergencyContactPhone">
            </mat-form-field>
          </div>

          <p class="feedback success" *ngIf="successMessage()">{{ successMessage() }}</p>
          <p class="feedback error" *ngIf="errorMessage()">{{ errorMessage() }}</p>

          <div class="actions">
            <button mat-stroked-button type="button" (click)="reset()">Reinitialiser</button>
            <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid || isSubmitting()">
              {{ isSubmitting() ? 'Enregistrement...' : (isEditMode() ? 'Mettre a jour' : 'Creer le patient') }}
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
export class PatientFormComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly patientApiService = inject(PatientApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly patientId = this.route.snapshot.paramMap.get('id');

  readonly isSubmitting = signal(false);
  readonly isEditMode = signal(!!this.patientId);
  readonly successMessage = signal('');
  readonly errorMessage = signal('');

  readonly form = this.formBuilder.nonNullable.group({
    establishmentId: ['main-establishment', Validators.required],
    patientCode: ['PAT-001', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    birthDate: ['', Validators.required],
    gender: ['FEMALE' as PatientFormDto['gender'], Validators.required],
    email: [''],
    phone: [''],
    address: [''],
    city: [''],
    socialSecurityNumber: [''],
    insNumber: [''],
    bloodType: [''],
    allergiesText: [''],
    emergencyContactName: [''],
    emergencyContactRelationship: [''],
    emergencyContactPhone: ['']
  });

  constructor() {
    if (this.patientId) {
      this.patientApiService.getPatientById(this.patientId).subscribe({
        next: (patient) => {
          this.form.patchValue({
            establishmentId: patient.establishmentId,
            patientCode: patient.patientCode,
            firstName: patient.firstName,
            lastName: patient.lastName,
            birthDate: patient.birthDate,
            gender: patient.gender,
            email: patient.email ?? '',
            phone: patient.phone ?? '',
            address: patient.address ?? '',
            city: patient.city ?? '',
            socialSecurityNumber: patient.socialSecurityNumber ?? '',
            insNumber: patient.insNumber ?? '',
            bloodType: patient.bloodType ?? '',
            allergiesText: patient.allergies?.join(', ') ?? '',
            emergencyContactName: patient.emergencyContact?.fullName ?? '',
            emergencyContactRelationship: patient.emergencyContact?.relationship ?? '',
            emergencyContactPhone: patient.emergencyContact?.phone ?? ''
          });
        },
        error: () => this.errorMessage.set('Chargement de la fiche patient impossible.')
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

    const request$ = this.patientId
      ? this.patientApiService.updatePatient(this.patientId, this.toPayload())
      : this.patientApiService.createPatient(this.toPayload());

    request$
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: (patient) => {
          this.successMessage.set(
            this.patientId
              ? `Patient ${patient.firstName} ${patient.lastName} mis a jour avec succes.`
              : `Patient ${patient.firstName} ${patient.lastName} cree avec succes.`
          );

          if (this.patientId) {
            void this.router.navigate(['/patients', patient.id]);
            return;
          }

          this.reset();
        },
        error: () => this.errorMessage.set('Enregistrement patient impossible. Verifiez l\'API backend.')
      });
  }

  reset(): void {
    this.form.reset({
      establishmentId: 'main-establishment',
      patientCode: 'PAT-001',
      firstName: '',
      lastName: '',
      birthDate: '',
      gender: 'FEMALE',
      email: '',
      phone: '',
      address: '',
      city: '',
      socialSecurityNumber: '',
      insNumber: '',
      bloodType: '',
      allergiesText: '',
      emergencyContactName: '',
      emergencyContactRelationship: '',
      emergencyContactPhone: ''
    });
  }

  private toPayload(): PatientFormDto {
    const value = this.form.getRawValue();
    const allergies = value.allergiesText
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    return {
      establishmentId: value.establishmentId,
      patientCode: value.patientCode,
      firstName: value.firstName,
      lastName: value.lastName,
      birthDate: value.birthDate,
      gender: value.gender,
      email: value.email || undefined,
      phone: value.phone || undefined,
      address: value.address || undefined,
      city: value.city || undefined,
      socialSecurityNumber: value.socialSecurityNumber || undefined,
      insNumber: value.insNumber || undefined,
      bloodType: value.bloodType || undefined,
      allergies,
      emergencyContact: value.emergencyContactName
        ? {
            fullName: value.emergencyContactName,
            relationship: value.emergencyContactRelationship || 'Contact',
            phone: value.emergencyContactPhone || ''
          }
        : undefined,
      active: true
    };
  }
}
