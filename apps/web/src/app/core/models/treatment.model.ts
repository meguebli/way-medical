import { BaseEntity } from './base.model';
import { TreatmentStatus, TreatmentType } from './shared-types.model';

export interface Treatment extends BaseEntity {
  patientId: string;
  prescribedByDoctorId: string;
  consultationId?: string;
  name: string;
  type: TreatmentType;
  dosage?: string;
  frequency?: string;
  instructions?: string;
  startDate: string;
  endDate?: string;
  status: TreatmentStatus;
}
