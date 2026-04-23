import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../config/environment';
import { Treatment, TreatmentFormDto, TreatmentStatus } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TreatmentApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/treatments`;

  getTreatments(patientId?: string, status?: TreatmentStatus): Observable<Treatment[]> {
    let params = new HttpParams();

    if (patientId) {
      params = params.set('patientId', patientId);
    }

    if (status) {
      params = params.set('status', status);
    }

    return this.http.get<Treatment[]>(this.baseUrl, { params });
  }

  getTreatmentById(treatmentId: string): Observable<Treatment> {
    return this.http.get<Treatment>(`${this.baseUrl}/${treatmentId}`);
  }

  createTreatment(payload: TreatmentFormDto): Observable<Treatment> {
    return this.http.post<Treatment>(this.baseUrl, payload);
  }

  updateTreatment(treatmentId: string, payload: TreatmentFormDto): Observable<Treatment> {
    return this.http.put<Treatment>(`${this.baseUrl}/${treatmentId}`, payload);
  }

  updateTreatmentStatus(treatmentId: string, status: TreatmentStatus): Observable<Treatment> {
    return this.http.patch<Treatment>(`${this.baseUrl}/${treatmentId}/status`, { status });
  }
}
