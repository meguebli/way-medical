import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../config/environment';
import {
  Consultation,
  ConsultationFormDto,
  ConsultationStatus,
  MedicalAct,
  MedicalActFormDto,
  PreliminaryMeasure,
  PreliminaryMeasureFormDto,
  Prescription,
  PrescriptionItemFormDto
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class ConsultationApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/consultations`;

  getConsultations(filters?: {
    patientId?: string;
    doctorId?: string;
    serviceId?: string;
    status?: ConsultationStatus;
  }): Observable<Consultation[]> {
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

    return this.http.get<Consultation[]>(this.baseUrl, { params });
  }

  getConsultationById(consultationId: string): Observable<Consultation> {
    return this.http.get<Consultation>(`${this.baseUrl}/${consultationId}`);
  }

  createConsultation(payload: ConsultationFormDto): Observable<Consultation> {
    return this.http.post<Consultation>(this.baseUrl, payload);
  }

  updateConsultation(consultationId: string, payload: ConsultationFormDto): Observable<Consultation> {
    return this.http.put<Consultation>(`${this.baseUrl}/${consultationId}`, payload);
  }

  addPreliminaryMeasure(
    consultationId: string,
    payload: PreliminaryMeasureFormDto
  ): Observable<PreliminaryMeasure> {
    return this.http.post<PreliminaryMeasure>(`${this.baseUrl}/${consultationId}/measures`, payload);
  }

  addMedicalAct(consultationId: string, payload: MedicalActFormDto): Observable<MedicalAct> {
    return this.http.post<MedicalAct>(`${this.baseUrl}/${consultationId}/acts`, payload);
  }

  addPrescriptionItem(
    consultationId: string,
    payload: PrescriptionItemFormDto
  ): Observable<Prescription> {
    return this.http.post<Prescription>(`${this.baseUrl}/${consultationId}/prescriptions`, payload);
  }
}
