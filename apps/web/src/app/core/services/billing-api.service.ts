import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../config/environment';
import { BillingFilterFormDto, BillingItem } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BillingApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/billing`;

  getBillingItems(filters?: BillingFilterFormDto): Observable<BillingItem[]> {
    let params = new HttpParams();

    if (filters?.establishmentId) {
      params = params.set('establishmentId', filters.establishmentId);
    }

    if (filters?.serviceId) {
      params = params.set('serviceId', filters.serviceId);
    }

    if (filters?.doctorId) {
      params = params.set('doctorId', filters.doctorId);
    }

    if (filters?.patientId) {
      params = params.set('patientId', filters.patientId);
    }

    if (filters?.from) {
      params = params.set('from', filters.from);
    }

    if (filters?.to) {
      params = params.set('to', filters.to);
    }

    if (filters?.status) {
      params = params.set('status', filters.status);
    }

    return this.http.get<BillingItem[]>(this.baseUrl, { params });
  }
}
