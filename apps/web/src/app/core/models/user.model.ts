import { BaseEntity } from './base.model';
import { UserRole } from './shared-types.model';

export interface AppUser extends BaseEntity {
  establishmentId: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  phone?: string;
  role: UserRole;
  active: boolean;
}

export interface Doctor extends AppUser {
  role: 'DOCTOR';
  serviceIds: string[];
  specialtyIds: string[];
  licenseNumber?: string;
}

export interface MedicalStaff extends AppUser {
  role: 'MEDICAL_STAFF';
  serviceIds: string[];
}

export interface LabTechnician extends AppUser {
  role: 'LAB_TECHNICIAN';
  laboratoryName?: string;
}

export interface AdminUser extends AppUser {
  role: 'ADMIN';
}

export interface PatientUser extends AppUser {
  role: 'PATIENT';
  patientId: string;
}

export type User = AppUser;
