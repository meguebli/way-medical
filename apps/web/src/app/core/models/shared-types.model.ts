export type UserRole =
  | 'ADMIN'
  | 'DOCTOR'
  | 'MEDICAL_STAFF'
  | 'LAB_TECHNICIAN'
  | 'PATIENT';

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type AppointmentStatus =
  | 'REQUESTED'
  | 'PENDING_APPROVAL'
  | 'APPROVED'
  | 'CANCELLED'
  | 'REJECTED'
  | 'NO_SHOW'
  | 'COMPLETED';

export type ConsultationStatus =
  | 'DRAFT'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'ARCHIVED';

export type TreatmentStatus = 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'CANCELLED';

export type LeaveStatus = 'REQUESTED' | 'APPROVED' | 'REJECTED' | 'CANCELLED';

export type PlanningSlotStatus = 'AVAILABLE' | 'BOOKED' | 'BLOCKED' | 'LEAVE';

export type PreliminaryMeasureType =
  | 'TEMPERATURE'
  | 'BLOOD_PRESSURE'
  | 'WEIGHT'
  | 'HEIGHT'
  | 'HEART_RATE'
  | 'OXYGEN_SATURATION';

export type MedicalActType =
  | 'CONSULTATION'
  | 'PARAMEDICAL_ACT'
  | 'PRESCRIPTION'
  | 'LAB_ANALYSIS'
  | 'IMAGING'
  | 'PROCEDURE';

export type TreatmentType = 'MEDICATION' | 'THERAPY' | 'FOLLOW_UP';

export type DocumentType =
  | 'PRESCRIPTION'
  | 'LAB_REPORT'
  | 'IMAGING_REPORT'
  | 'MEDICAL_CERTIFICATE'
  | 'OTHER';

export type BillingStatus = 'PENDING' | 'PAID' | 'CANCELLED';
