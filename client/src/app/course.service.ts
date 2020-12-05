import { Injectable } from '@angular/core';
import {Course} from './@types/course';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private hostname: string = 'http://localhost:3000';
  private resource: string = 'v1/courses';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private httpClient: HttpClient) { }

  searchCourses(title: string, subject: string, code: string, component: string): Observable<Course[]> {
    let url: string = `${this.hostname}/${this.resource}?`;
    if (title) url += `title=${title}&`;
    if (subject) url += `subject=${subject}&`;
    if (code) url += `code=${code}&`
    if (component) url += `component=${component}&`
    if (url.slice(-1) === '&') url = url.slice(0, -1);
    if (url.slice(-1) === '?') url = url.slice(0, -1);
    console.log(url);
    return this.httpClient.get<Course[]>(url);
  }
}
