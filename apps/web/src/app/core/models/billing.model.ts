import { BaseEntity } from './base.model';
import { BillingStatus } from './shared-types.model';

export interface BillingItem extends BaseEntity {
  patientId: string;
  appointmentId?: string;
  consultationId?: string;
  serviceId: string;
  label: string;
  amount: number;
  currency: string;
  status: BillingStatus;
  billedAt: string;
}
