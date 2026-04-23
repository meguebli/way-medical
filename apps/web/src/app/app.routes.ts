import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './shared/layout/main-layout.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      /* ── Dashboard (role-based redirect) ──────────────── */
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'dashboard/patient',
        loadComponent: () =>
          import('./features/dashboard/patient-dashboard.component').then(m => m.PatientDashboardComponent)
      },
      {
        path: 'dashboard/doctor',
        loadComponent: () =>
          import('./features/dashboard/doctor-dashboard.component').then(m => m.DoctorDashboardComponent)
      },
      {
        path: 'dashboard/admin',
        loadComponent: () =>
          import('./features/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
      },

      /* ── Patients ─────────────────────────────────────── */
      {
        path: 'patients',
        loadComponent: () =>
          import('./features/patients/patient-list.component').then(m => m.PatientListComponent)
      },
      {
        path: 'patients/new',
        loadComponent: () =>
          import('./features/patients/patient-form.component').then(m => m.PatientFormComponent)
      },
      {
        path: 'patients/:id',
        loadComponent: () =>
          import('./features/patients/patient-detail.component').then(m => m.PatientDetailComponent)
      },
      {
        path: 'patients/:id/edit',
        loadComponent: () =>
          import('./features/patients/patient-form.component').then(m => m.PatientFormComponent)
      },

      /* ── Appointments ─────────────────────────────────── */
      {
        path: 'appointments',
        loadComponent: () =>
          import('./features/appointments/appointment-list.component').then(m => m.AppointmentListComponent)
      },
      {
        path: 'appointments/new',
        loadComponent: () =>
          import('./features/appointments/appointment-booking.component').then(m => m.AppointmentBookingComponent)
      },
      {
        path: 'appointments/:id',
        loadComponent: () =>
          import('./features/appointments/appointment-detail.component').then(m => m.AppointmentDetailComponent)
      },
      {
        path: 'appointments/:id/edit',
        loadComponent: () =>
          import('./features/appointments/appointment-form.component').then(m => m.AppointmentFormComponent)
      },

      /* ── Consultations ────────────────────────────────── */
      {
        path: 'consultations',
        loadComponent: () =>
          import('./features/consultations/consultation-list.component').then(m => m.ConsultationListComponent)
      },
      {
        path: 'consultations/new',
        loadComponent: () =>
          import('./features/consultations/consultation-form.component').then(m => m.ConsultationFormComponent)
      },
      {
        path: 'consultations/:id',
        loadComponent: () =>
          import('./features/consultations/consultation-detail.component').then(m => m.ConsultationDetailComponent)
      },
      {
        path: 'consultations/:id/edit',
        loadComponent: () =>
          import('./features/consultations/consultation-form.component').then(m => m.ConsultationFormComponent)
      },

      /* ── Treatments ───────────────────────────────────── */
      {
        path: 'treatments',
        loadComponent: () =>
          import('./features/treatments/treatment-list.component').then(m => m.TreatmentListComponent)
      },
      {
        path: 'treatments/new',
        loadComponent: () =>
          import('./features/treatments/treatment-form.component').then(m => m.TreatmentFormComponent)
      },
      {
        path: 'treatments/:id',
        loadComponent: () =>
          import('./features/treatments/treatment-detail.component').then(m => m.TreatmentDetailComponent)
      },
      {
        path: 'treatments/:id/edit',
        loadComponent: () =>
          import('./features/treatments/treatment-form.component').then(m => m.TreatmentFormComponent)
      },

      /* ── Services ────────────────────────────────────── */
      {
        path: 'services',
        loadComponent: () =>
          import('./features/services/service-directory.component').then(m => m.ServiceDirectoryComponent)
      },

      /* ── Scheduling ───────────────────────────────────── */
      {
        path: 'schedule',
        loadComponent: () =>
          import('./features/planning/doctor-schedule.component').then(m => m.DoctorScheduleComponent)
      },
      {
        path: 'planning',
        loadComponent: () =>
          import('./features/planning/planning-overview.component').then(m => m.PlanningOverviewComponent)
      },

      /* ── Billing ──────────────────────────────────────── */
      {
        path: 'billing',
        loadComponent: () =>
          import('./features/billing/billing-overview.component').then(m => m.BillingOverviewComponent)
      },

      /* ── Admin ────────────────────────────────────────── */
      {
        path: 'admin/establishments',
        loadComponent: () =>
          import('./features/admin/establishments.component').then(m => m.EstablishmentsComponent)
      },
      {
        path: 'admin/users',
        loadComponent: () =>
          import('./features/admin/users-roles.component').then(m => m.UsersRolesComponent)
      },
      {
        path: 'admin/activity',
        loadComponent: () =>
          import('./features/admin/activity-monitoring.component').then(m => m.ActivityMonitoringComponent)
      },

      /* ── Patient-only ─────────────────────────────────── */
      {
        path: 'medical-record',
        loadComponent: () =>
          import('./features/patients/patient-detail.component').then(m => m.PatientDetailComponent)
      },
      {
        path: 'lab-results',
        loadComponent: () =>
          import('./features/patients/patient-detail.component').then(m => m.PatientDetailComponent)
      },
      {
        path: 'prescriptions',
        loadComponent: () =>
          import('./features/consultations/consultation-list.component').then(m => m.ConsultationListComponent)
      },
      {
        path: 'medical-acts',
        loadComponent: () =>
          import('./features/consultations/consultation-list.component').then(m => m.ConsultationListComponent)
      },
    ]
  },
  { path: '**', redirectTo: '' }
];
