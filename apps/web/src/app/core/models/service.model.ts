import { BaseEntity } from './base.model';

export interface Specialty extends BaseEntity {
  name: string;
  code: string;
  description?: string;
}

export interface MedicalService extends BaseEntity {
  establishmentId: string;
  specialtyId: string;
  name: string;
  code: string;
  description?: string;
  active: boolean;
}
