import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../config/environment';
import { ImagingRequest, LabAnalysisRequest, MedicalDocument } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DocumentApiService {
  private readonly http = inject(HttpClient);
  private readonly documentBaseUrl = `${environment.apiBaseUrl}/documents`;
  private readonly labBaseUrl = `${environment.apiBaseUrl}/lab-requests`;
  private readonly imagingBaseUrl = `${environment.apiBaseUrl}/imaging-requests`;

  getDocuments(patientId: string): Observable<MedicalDocument[]> {
    return this.http.get<MedicalDocument[]>(this.documentBaseUrl, {
      params: { patientId }
    });
  }

  getLabRequests(patientId?: string): Observable<LabAnalysisRequest[]> {
    let params = new HttpParams();

    if (patientId) {
      params = params.set('patientId', patientId);
    }

    return this.http.get<LabAnalysisRequest[]>(this.labBaseUrl, { params });
  }

  getImagingRequests(patientId?: string): Observable<ImagingRequest[]> {
    let params = new HttpParams();

    if (patientId) {
      params = params.set('patientId', patientId);
    }

    return this.http.get<ImagingRequest[]>(this.imagingBaseUrl, { params });
  }
}
