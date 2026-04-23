import { Appointment } from './appointment.model';
import { Consultation } from './consultation.model';

export interface DashboardCard {
  label: string;
  value: number | string;
  icon: string;
  color?: string;
}

export interface AdminDashboardData {
  totalPatients: number;
  totalDoctors: number;
  totalAppointmentsToday: number;
  totalPendingAppointments: number;
  revenueMonth?: number;
}

export interface DoctorDashboardData {
  appointmentsToday: number;
  pendingConsultations: number;
  activePatients: number;
}

export interface PatientDashboardData {
  nextAppointment?: Appointment;
  activeTreatments: number;
  lastConsultations: Consultation[];
}
