import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../config/environment';
import { MedicalRecord } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MedicalRecordApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/medical-records`;

  getPatientRecords(patientId: string): Observable<MedicalRecord[]> {
    return this.http.get<MedicalRecord[]>(`${this.baseUrl}`, {
      params: { patientId }
    });
  }

  getRecordById(recordId: string): Observable<MedicalRecord> {
    return this.http.get<MedicalRecord>(`${this.baseUrl}/${recordId}`);
  }
}
