import { BaseEntity } from './base.model';
import { AppointmentStatus } from './shared-types.model';

export interface Appointment extends BaseEntity {
  establishmentId: string;
  serviceId: string;
  specialtyId?: string;
  patientId: string;
  doctorId?: string;
  requestedByUserId?: string;
  approvedByUserId?: string;
  planningSlotId?: string;
  status: AppointmentStatus;
  reason?: string;
  scheduledAt: string;
  durationMinutes: number;
  approvalComment?: string;
  cancellationReason?: string;
}
