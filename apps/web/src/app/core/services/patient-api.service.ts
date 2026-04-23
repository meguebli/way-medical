import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../config/environment';
import { PatientFormDto } from '../models';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/patients`;

  getPatients(search?: string, serviceId?: string): Observable<Patient[]> {
    let params = new HttpParams();

    if (search) {
      params = params.set('search', search);
    }

    if (serviceId) {
      params = params.set('serviceId', serviceId);
    }

    return this.http.get<Patient[]>(this.baseUrl, { params });
  }

  getPatientById(patientId: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.baseUrl}/${patientId}`);
  }

  createPatient(payload: PatientFormDto): Observable<Patient> {
    return this.http.post<Patient>(this.baseUrl, payload);
  }

  updatePatient(patientId: string, payload: PatientFormDto): Observable<Patient> {
    return this.http.put<Patient>(`${this.baseUrl}/${patientId}`, payload);
  }

  archivePatient(patientId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${patientId}`);
  }
}
