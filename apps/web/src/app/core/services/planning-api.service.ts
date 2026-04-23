import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../config/environment';
import {
  DoctorAvailabilityFormDto,
  DoctorLeave,
  DoctorLeaveFormDto,
  PlanningSlot
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class PlanningApiService {
  private readonly http = inject(HttpClient);
  private readonly slotBaseUrl = `${environment.apiBaseUrl}/planning/slots`;
  private readonly leaveBaseUrl = `${environment.apiBaseUrl}/planning/leaves`;

  getDoctorPlanning(doctorId: string, from?: string, to?: string): Observable<PlanningSlot[]> {
    let params = new HttpParams().set('doctorId', doctorId);

    if (from) {
      params = params.set('from', from);
    }

    if (to) {
      params = params.set('to', to);
    }

    return this.http.get<PlanningSlot[]>(this.slotBaseUrl, { params });
  }

  createAvailability(payload: DoctorAvailabilityFormDto): Observable<PlanningSlot> {
    return this.http.post<PlanningSlot>(this.slotBaseUrl, payload);
  }

  updateAvailability(slotId: string, payload: DoctorAvailabilityFormDto): Observable<PlanningSlot> {
    return this.http.put<PlanningSlot>(`${this.slotBaseUrl}/${slotId}`, payload);
  }

  getDoctorLeaves(doctorId: string): Observable<DoctorLeave[]> {
    return this.http.get<DoctorLeave[]>(this.leaveBaseUrl, {
      params: { doctorId }
    });
  }

  createLeave(payload: DoctorLeaveFormDto): Observable<DoctorLeave> {
    return this.http.post<DoctorLeave>(this.leaveBaseUrl, payload);
  }
}
