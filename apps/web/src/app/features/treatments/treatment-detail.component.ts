import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { TreatmentApiService } from '../../core/services/treatment-api.service';

@Component({
  selector: 'wm-treatment-detail',
  standalone: true,
  imports: [AsyncPipe, DatePipe, NgIf, RouterLink, MatButtonModule, MatCardModule],
  template: `
    <section class="detail-page" *ngIf="vm$ | async as vm">
      <mat-card class="detail-card" *ngIf="vm.item; else errorState">
        <div class="card-header">
          <div>
            <p class="eyebrow">Traitement</p>
            <h1>{{ vm.item.name }}</h1>
            <p class="lead">{{ vm.item.status }} - {{ vm.item.type }}</p>
          </div>

          <div class="actions">
            <a mat-stroked-button routerLink="/treatments">Retour liste</a>
            <a mat-flat-button color="primary" [routerLink]="['/treatments', vm.item.id, 'edit']">Modifier</a>
          </div>
        </div>

        <div class="detail-grid">
          <p><strong>Patient :</strong> {{ vm.item.patientId }}</p>
          <p><strong>Medecin :</strong> {{ vm.item.prescribedByDoctorId }}</p>
          <p><strong>Dosage :</strong> {{ vm.item.dosage || 'Non renseigne' }}</p>
          <p><strong>Frequence :</strong> {{ vm.item.frequency || 'Non renseignee' }}</p>
          <p><strong>Debut :</strong> {{ vm.item.startDate | date:'mediumDate' }}</p>
          <p><strong>Fin :</strong> {{ vm.item.endDate ? (vm.item.endDate | date:'mediumDate') : 'Non definie' }}</p>
          <p><strong>Instructions :</strong> {{ vm.item.instructions || 'Aucune' }}</p>
        </div>
      </mat-card>

      <ng-template #errorState>
        <mat-card class="detail-card">
          <h1>Traitement introuvable</h1>
          <p>{{ vm.feedback }}</p>
          <a mat-stroked-button routerLink="/treatments">Retour liste</a>
        </mat-card>
      </ng-template>
    </section>
  `,
  styles: [`
    .detail-card {
      border-radius: 28px;
      border: 1px solid var(--wm-border);
      background: rgba(255, 255, 255, 0.95);
      box-shadow: 0 20px 40px rgba(31, 57, 88, 0.08);
      padding: 1rem;
    }

    .card-header,
    .actions {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      align-items: start;
      flex-wrap: wrap;
    }

    .eyebrow {
      margin: 0 0 0.5rem;
      color: var(--wm-primary);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-size: 0.75rem;
    }

    .lead {
      color: var(--wm-muted);
    }

    .detail-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreatmentDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly treatmentApiService = inject(TreatmentApiService);

  readonly vm$ = this.route.paramMap.pipe(
    switchMap((params) => {
      const id = params.get('id');
      if (!id) {
        return of({ item: null, feedback: 'Identifiant traitement manquant.' });
      }

      return this.treatmentApiService.getTreatmentById(id).pipe(
        switchMap((item) => of({ item, feedback: '' })),
        catchError(() => of({ item: null, feedback: 'Impossible de charger la fiche traitement.' }))
      );
    })
  );
}
