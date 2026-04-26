import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimeLocationRecord } from '../../models/register-time-location';

@Injectable({
  providedIn: 'root'
})
export class ClockService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/v1/clock';

  clockIn(timeLocationRecord: TimeLocationRecord): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/record`, timeLocationRecord);
  }

  findRecordsByDate(userId: string, date: Date): Observable<TimeLocationRecord[]> {
    return this.http.get<TimeLocationRecord[]>(`${this.apiUrl}/record/${userId}/${date.toISOString()}`, {});
  }
}
