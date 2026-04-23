import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { catchError, map, of } from 'rxjs';
import { PlanningApiService } from '../../core/services/planning-api.service';

@Component({
  selector: 'wm-planning-overview',
  standalone: true,
  imports: [AsyncPipe, DatePipe, NgFor, NgIf, MatCardModule, MatChipsModule, MatIconModule],
  template: `
    <section class="page" *ngIf="vm$ | async as vm">
      <header class="page-header">
        <div>
          <p class="eyebrow">Planning</p>
          <h1>Disponibilites et creneaux</h1>
          <p class="lead">Vue de planning reliee au service Angular dedie, prete pour l'edition future.</p>
        </div>
        <mat-chip>{{ vm.total }} creneaux</mat-chip>
      </header>

      <p class="feedback" *ngIf="vm.feedback">{{ vm.feedback }}</p>

      <section class="grid">
        <mat-card class="item-card" *ngFor="let slot of vm.slots">
          <mat-card-header>
            <mat-icon mat-card-avatar>calendar_month</mat-icon>
            <mat-card-title>{{ slot.status }}</mat-card-title>
            <mat-card-subtitle>{{ slot.startAt | date:'medium' }}</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <p><strong>Medecin :</strong> {{ slot.doctorId }}</p>
            <p><strong>Service :</strong> {{ slot.serviceId }}</p>
            <p><strong>Fin :</strong> {{ slot.endAt | date:'medium' }}</p>
            <p><strong>Notes :</strong> {{ slot.notes || 'Aucune note' }}</p>
          </mat-card-content>
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

    .item-card {
      border-radius: 24px;
      border: 1px solid var(--wm-border);
      background: rgba(255, 255, 255, 0.94);
      box-shadow: 0 16px 32px rgba(31, 57, 88, 0.08);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanningOverviewComponent {
  private readonly planningApiService = inject(PlanningApiService);

  readonly vm$ = this.planningApiService.getDoctorPlanning('doctor-001').pipe(
    map((slots) => ({
      slots,
      total: slots.length,
      feedback: slots.length ? '' : 'Aucun creneau retourne par l\'API.'
    })),
    catchError(() =>
      of({
        slots: [],
        total: 0,
        feedback: 'API planning indisponible pour le moment.'
      })
    )
  );
}
