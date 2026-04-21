import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DashboardComponent } from './dashboard.component';
import { DashboardApiService } from '../../core/services/dashboard-api.service';

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        {
          provide: DashboardApiService,
          useValue: {
            getMetrics: () => of({
              activeSessions: 7,
              securedApis: 4,
              pendingAlerts: 1
            })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
  });

  it('should render dashboard metrics', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Medical platform cockpit');
    expect(compiled.textContent).toContain('JWT login wired to Spring Boot');
    expect(compiled.textContent).toContain('Active sessions');
    expect(compiled.textContent).toContain('7');
  });
});
