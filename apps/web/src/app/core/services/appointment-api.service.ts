import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../config/environment';
import {
  Appointment,
  AppointmentApprovalFormDto,
  AppointmentFormDto,
  AppointmentStatus
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class AppointmentApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/appointments`;

  getAppointments(filters?: {
    patientId?: string;
    doctorId?: string;
    serviceId?: string;
    status?: AppointmentStatus;
    from?: string;
    to?: string;
  }): Observable<Appointment[]> {
    let params = new HttpParams();

    if (filters?.patientId) {
      params = params.set('patientId', filters.patientId);
    }

    if (filters?.doctorId) {
      params = params.set('doctorId', filters.doctorId);
    }

    if (filters?.serviceId) {
      params = params.set('serviceId', filters.serviceId);
    }

    if (filters?.status) {
      params = params.set('status', filters.status);
    }

    if (filters?.from) {
      params = params.set('from', filters.from);
    }

    if (filters?.to) {
      params = params.set('to', filters.to);
    }

    return this.http.get<Appointment[]>(this.baseUrl, { params });
  }

  getAppointmentById(appointmentId: string): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.baseUrl}/${appointmentId}`);
  }

  requestAppointment(payload: AppointmentFormDto): Observable<Appointment> {
    return this.http.post<Appointment>(this.baseUrl, payload);
  }

  updateAppointment(appointmentId: string, payload: AppointmentFormDto): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.baseUrl}/${appointmentId}`, payload);
  }

  approveAppointment(payload: AppointmentApprovalFormDto): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.baseUrl}/${payload.appointmentId}/approval`, payload);
  }

  cancelAppointment(appointmentId: string, reason?: string): Observable<Appointment> {
    return this.http.patch<Appointment>(`${this.baseUrl}/${appointmentId}/cancel`, {
      cancellationReason: reason
    });
  }
}
