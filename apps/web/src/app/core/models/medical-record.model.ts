import { BaseEntity } from './base.model';

export interface MedicalRecord extends BaseEntity {
  patientId: string;
  establishmentId: string;
  serviceId: string;
  primaryDoctorId?: string;
  medicalHistory?: string;
  chronicConditions?: string[];
  allergies?: string[];
  notes?: string;
}
