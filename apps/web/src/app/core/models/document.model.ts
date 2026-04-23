import { BaseEntity } from './base.model';
import { DocumentType } from './shared-types.model';

export interface LabAnalysisRequest extends BaseEntity {
  consultationId: string;
  patientId: string;
  requestedByDoctorId: string;
  assignedTechnicianId?: string;
  examName: string;
  clinicalContext?: string;
  status: 'REQUESTED' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED';
  requestedAt: string;
  resultAvailableAt?: string;
}

export interface ImagingRequest extends BaseEntity {
  consultationId: string;
  patientId: string;
  requestedByDoctorId: string;
  examName: string;
  bodyRegion?: string;
  clinicalContext?: string;
  status: 'REQUESTED' | 'SCHEDULED' | 'DONE' | 'CANCELLED';
  requestedAt: string;
  resultAvailableAt?: string;
}

export interface MedicalDocument extends BaseEntity {
  patientId: string;
  consultationId?: string;
  uploadedByUserId: string;
  type: DocumentType;
  title: string;
  fileName: string;
  mimeType: string;
  url: string;
  hash?: string;
  size?: number;
}
