import { BaseEntity } from './base.model';
import {
  ConsultationStatus,
  MedicalActType,
  PreliminaryMeasureType,
} from './shared-types.model';

export interface PreliminaryMeasure extends BaseEntity {
  consultationId: string;
  patientId: string;
  recordedByUserId: string;
  type: PreliminaryMeasureType;
  value: string;
  unit?: string;
  recordedAt: string;
}

export interface Consultation extends BaseEntity {
  appointmentId: string;
  patientId: string;
  doctorId: string;
  serviceId: string;
  medicalRecordId?: string;
  status: ConsultationStatus;
  chiefComplaint?: string;
  diagnosis?: string;
  clinicalNotes?: string;
  consultationDate: string;
}

export interface MedicalAct extends BaseEntity {
  consultationId: string;
  patientId: string;
  performedByUserId: string;
  type: MedicalActType;
  title: string;
  description?: string;
  serviceId?: string;
  doctorId?: string;
  executedAt?: string;
}

export interface Prescription extends BaseEntity {
  consultationId: string;
  patientId: string;
  doctorId: string;
  notes?: string;
  issuedAt: string;
}

export interface PrescriptionItem {
  id: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}
