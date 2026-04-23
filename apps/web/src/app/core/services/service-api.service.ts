import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../config/environment';
import { MedicalService, ServiceFormDto, Specialty } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ServiceApiService {
  private readonly http = inject(HttpClient);
  private readonly serviceBaseUrl = `${environment.apiBaseUrl}/services`;
  private readonly specialtyBaseUrl = `${environment.apiBaseUrl}/specialties`;

  getServices(establishmentId?: string): Observable<MedicalService[]> {
    let params = new HttpParams();

    if (establishmentId) {
      params = params.set('establishmentId', establishmentId);
    }

    return this.http.get<MedicalService[]>(this.serviceBaseUrl, { params });
  }

  getServiceById(serviceId: string): Observable<MedicalService> {
    return this.http.get<MedicalService>(`${this.serviceBaseUrl}/${serviceId}`);
  }

  createService(payload: ServiceFormDto): Observable<MedicalService> {
    return this.http.post<MedicalService>(this.serviceBaseUrl, payload);
  }

  updateService(serviceId: string, payload: ServiceFormDto): Observable<MedicalService> {
    return this.http.put<MedicalService>(`${this.serviceBaseUrl}/${serviceId}`, payload);
  }

  getSpecialties(): Observable<Specialty[]> {
    return this.http.get<Specialty[]>(this.specialtyBaseUrl);
  }
}
