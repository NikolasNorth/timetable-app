import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Schedule} from './@types/schedule';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private hostname: string = 'http://localhost:3000';
  private resource: string = 'v1/schedules';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
  ) { }

  createSchedule(schedule: Schedule): Observable<Schedule> {
    const url: string = `${this.hostname}/${this.resource}`;
    this.httpOptions = {
      headers: this.httpOptions.headers.append(
        'Authorization',
        `Bearer ${this.authService.getToken()}`
      )
    }
    return this.httpClient.post<Schedule>(url, schedule, this.httpOptions);
  }

  getSchedule(id: string): Observable<Schedule> {
    const url: string = `${this.hostname}/${this.resource}/${id}`;
    return this.httpClient.get<Schedule>(url);
  }

  getPublicSchedules(): Observable<Schedule[]> {
    const url: string = `${this.hostname}/${this.resource}`;
    return this.httpClient.get<Schedule[]>(url);
  }

  editSchedule(schedule: Schedule): Observable<Schedule> {
    const url: string = `${this.hostname}/${this.resource}/${schedule._id}`;
    return this.httpClient.post<Schedule>(url, schedule, this.httpOptions);
  }

  deleteSchedule(id: string): Observable<any> {
    const url: string = `${this.hostname}/${this.resource}/${id}`;
    this.httpOptions = {
      headers: this.httpOptions.headers.append(
        'Authorization',
        `Bearer ${this.authService.getToken()}`
      )
    }
    return this.httpClient.delete<any>(url, this.httpOptions);
  }
}
