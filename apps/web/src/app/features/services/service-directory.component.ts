import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { catchError, forkJoin, map, of } from 'rxjs';
import { ServiceApiService } from '../../core/services/service-api.service';

@Component({
  selector: 'wm-service-directory',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, MatCardModule, MatChipsModule, MatIconModule],
  template: `
    <section class="page" *ngIf="vm$ | async as vm">
      <header class="page-header">
        <div>
          <p class="eyebrow">Services</p>
          <h1>Referentiel des services</h1>
          <p class="lead">Specialites, services disponibles et base de navigation pour les parcours patients.</p>
        </div>
        <mat-chip>{{ vm.services.length }} services</mat-chip>
      </header>

      <p class="feedback" *ngIf="vm.feedback">{{ vm.feedback }}</p>

      <section class="grid">
        <mat-card class="item-card" *ngFor="let service of vm.services">
          <mat-card-header>
            <mat-icon mat-card-avatar>local_hospital</mat-icon>
            <mat-card-title>{{ service.name }}</mat-card-title>
            <mat-card-subtitle>{{ service.code }}</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <p><strong>Specialite :</strong> {{ vm.specialtyById[service.specialtyId] || service.specialtyId }}</p>
            <p><strong>Etablissement :</strong> {{ service.establishmentId }}</p>
            <p><strong>Description :</strong> {{ service.description || 'Non renseignee' }}</p>
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
export class ServiceDirectoryComponent {
  private readonly serviceApiService = inject(ServiceApiService);

  readonly vm$ = forkJoin({
    services: this.serviceApiService.getServices(),
    specialties: this.serviceApiService.getSpecialties()
  }).pipe(
    map(({ services, specialties }) => ({
      services,
      specialtyById: Object.fromEntries(specialties.map((specialty) => [specialty.id, specialty.name])),
      feedback: services.length ? '' : 'Aucun service retourne par l\'API.'
    })),
    catchError(() =>
      of({
        services: [],
        specialtyById: {} as Record<string, string>,
        feedback: 'API services indisponible pour le moment.'
      })
    )
  );
}
