import { BaseEntity } from './base.model';
import { LeaveStatus, PlanningSlotStatus } from './shared-types.model';

export interface PlanningSlot extends BaseEntity {
  doctorId: string;
  serviceId: string;
  startAt: string;
  endAt: string;
  status: PlanningSlotStatus;
  recurrenceRule?: string;
  notes?: string;
}

export interface DoctorLeave extends BaseEntity {
  doctorId: string;
  startAt: string;
  endAt: string;
  reason?: string;
  status: LeaveStatus;
}
