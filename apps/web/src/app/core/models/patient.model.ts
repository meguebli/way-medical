import { BaseEntity } from './base.model';
import { Gender } from './shared-types.model';

export interface EmergencyContact {
  fullName: string;
  relationship: string;
  phone: string;
}

export interface Patient extends BaseEntity {
  establishmentId: string;
  patientCode: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  birthDate: string;
  gender: Gender;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  socialSecurityNumber?: string;
  insNumber?: string;
  bloodType?: string;
  allergies?: string[];
  emergencyContact?: EmergencyContact;
  active: boolean;
}
