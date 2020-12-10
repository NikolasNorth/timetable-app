import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Schedule} from './@types/schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private hostname: string = 'http://localhost:3000';
  private resource: string = 'v1/schedules';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private httpClient: HttpClient) { }

  createSchedule(schedule: Schedule): Observable<Schedule> {
    const url: string = `${this.hostname}/${this.resource}`;
    return this.httpClient.post<Schedule>(url, schedule, this.httpOptions);
  }
}
