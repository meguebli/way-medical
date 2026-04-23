import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserApiService } from './user-api.service';

export interface DashboardMetrics {
  activeSessions: number;
  securedApis: number;
  pendingAlerts: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardApiService {
  private readonly userApiService = inject(UserApiService);

  getMetrics(): Observable<DashboardMetrics> {
    return this.userApiService.getUsers().pipe(
      map((users) => ({
        activeSessions: users.filter((user) => user.active).length,
        securedApis: 3,
        pendingAlerts: users.filter((user) => user.role === 'DOCTOR').length
      }))
    );
  }
}
