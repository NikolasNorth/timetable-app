import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Account} from './@types/account';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private hostname: string = 'http://localhost:3000';
  private resource: string = 'v1/accounts'
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) { }

  accessProtectedRoute(): Observable<any> {
    const url: string = `${this.hostname}/${this.resource}/protected`;
    const token: string = localStorage.getItem('timetable-token');
    const options = {
      headers: new HttpHeaders({'Authorization': `Bearer ${token}`})
    };
    return this.httpClient.get<any>(url, options);
  }

  getAccount(id: string): Observable<Account> {
    const url: string = `${this.hostname}/${this.resource}/${id}`;
    const token: string = localStorage.getItem('timetable-token');
    const options = {
      headers: new HttpHeaders({'Authorization': `Bearer ${token}`})
    };
    return this.httpClient.get<Account>(url, options);
  }
}
