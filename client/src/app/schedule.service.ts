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

  createSchedule(name: string, desc: string, isPrivate: boolean): Observable<Schedule> {
    const url: string = `${this.hostname}/${this.resource}`;
    const schedule: any = {
      name: name,
      description: desc,
      isPrivate: isPrivate,
      authorId: localStorage.getItem('timetable-token'),
    };
    return this.httpClient.post<Schedule>(url, schedule, this.httpOptions);
  }
}
