import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterTimeLocation } from '../../models/register-time-location';

@Injectable({
  providedIn: 'root'
})
export class ClockService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/v1/clock';

  clockIn(registerTimeLocation: RegisterTimeLocation): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/record`, registerTimeLocation);
  }

  findRecordsByDate(userId: string, date: Date): Observable<RegisterTimeLocation[]> {
    return this.http.get<RegisterTimeLocation[]>(`${this.apiUrl}/record/${userId}/${date.toISOString()}`, {});
  }
}
