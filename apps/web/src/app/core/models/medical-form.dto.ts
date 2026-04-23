import {
  AppointmentStatus,
  ConsultationStatus,
  Gender,
  LeaveStatus,
  MedicalActType,
  PreliminaryMeasureType,
  TreatmentStatus,
  TreatmentType,
  UserRole,
} from './shared-types.model';

export interface EmergencyContactFormDto {
  fullName: string;
  relationship: string;
  phone: string;
}

export interface EstablishmentFormDto {
  name: string;
  code: string;
  address: string;
  city: string;
  country: string;
  phone?: string;
  email?: string;
  active: boolean;
}

export interface ServiceFormDto {
  establishmentId: string;
  specialtyId: string;
  name: string;
  code: string;
  description?: string;
  active: boolean;
}

export interface DoctorProfileFormDto {
  establishmentId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: Extract<UserRole, 'DOCTOR'>;
  serviceIds: string[];
  specialtyIds: string[];
  licenseNumber?: string;
  active: boolean;
}

export interface PatientFormDto {
  establishmentId: string;
  patientCode: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: Gender;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  socialSecurityNumber?: string;
  insNumber?: string;
  bloodType?: string;
  allergies: string[];
  emergencyContact?: EmergencyContactFormDto;
  active: boolean;
}

export interface AppointmentFormDto {
  establishmentId: string;
  serviceId: string;
  specialtyId?: string;
  patientId: string;
  doctorId?: string;
  scheduledAt: string;
  durationMinutes: number;
  reason?: string;
  requestedByUserId?: string;
  status: AppointmentStatus;
}

export interface AppointmentApprovalFormDto {
  appointmentId: string;
  approvedByUserId: string;
  status: Extract<AppointmentStatus, 'APPROVED' | 'CANCELLED' | 'REJECTED'>;
  approvalComment?: string;
  cancellationReason?: string;
}

export interface PreliminaryMeasureFormDto {
  type: PreliminaryMeasureType;
  value: string;
  unit?: string;
  recordedAt?: string;
}

export interface MedicalActFormDto {
  type: MedicalActType;
  title: string;
  description?: string;
  executedAt?: string;
}

export interface PrescriptionItemFormDto {
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export interface ConsultationFormDto {
  appointmentId: string;
  patientId: string;
  doctorId: string;
  serviceId: string;
  status: ConsultationStatus;
  chiefComplaint?: string;
  diagnosis?: string;
  clinicalNotes?: string;
  consultationDate: string;
  preliminaryMeasures: PreliminaryMeasureFormDto[];
  medicalActs: MedicalActFormDto[];
  prescriptions: PrescriptionItemFormDto[];
}

export interface TreatmentFormDto {
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

export interface LabAnalysisRequestFormDto {
  consultationId: string;
  patientId: string;
  requestedByDoctorId: string;
  assignedTechnicianId?: string;
  examName: string;
  clinicalContext?: string;
}

export interface ImagingRequestFormDto {
  consultationId: string;
  patientId: string;
  requestedByDoctorId: string;
  examName: string;
  bodyRegion?: string;
  clinicalContext?: string;
}

export interface DoctorAvailabilityFormDto {
  doctorId: string;
  serviceId: string;
  startAt: string;
  endAt: string;
  recurrenceRule?: string;
  notes?: string;
}

export interface DoctorLeaveFormDto {
  doctorId: string;
  startAt: string;
  endAt: string;
  reason?: string;
  status: LeaveStatus;
}

export interface BillingFilterFormDto {
  establishmentId?: string;
  serviceId?: string;
  doctorId?: string;
  patientId?: string;
  from?: string;
  to?: string;
  status?: 'PENDING' | 'PAID' | 'CANCELLED';
}
