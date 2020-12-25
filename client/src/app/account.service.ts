import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
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

  getAccount(id: string): Observable<Account> {
    const url: string = `${this.hostname}/${this.resource}/${id}`;
    const token: string = localStorage.getItem('timetable-token');
    const options = {
      headers: new HttpHeaders({'Authorization': `Bearer ${token}`})
    };
    return this.httpClient.get<Account>(url, options);
  }

  getAccounts(): Observable<Account[]> {
    const url: string = `${this.hostname}/${this.resource}`;
    const token: string = localStorage.getItem('timetable-token');
    const options = {
      headers: new HttpHeaders({'Authorization': `Bearer ${token}`})
    };
    return this.httpClient.get<Account[]>(url, options);
  }

  searchAccounts(name: string, email: string): Observable<Account[]> {
    const url: string = `${this.hostname}/${this.resource}`;
    const token: string = localStorage.getItem('timetable-token');
    const options = {
      headers: new HttpHeaders({'Authorization': `Bearer ${token}`})
    };
    const body: any = {
      name: name,
      email: email
    };
    return this.httpClient.post<Account[]>(url, body, options);
  }

  changeAdminStatus(id: string, newIsAdmin: boolean): Observable<Account> {
    const url: string = `${this.hostname}/${this.resource}/${id}`;
    const token: string = localStorage.getItem('timetable-token');
    const options = {
      headers: new HttpHeaders({'Authorization': `Bearer ${token}`})
    };
    const body: any = {
      isAdmin: newIsAdmin
    };
    return this.httpClient.post<Account>(url, body, options);
  }

  changeActiveStatus(id: string, newIsActive: boolean): Observable<Account> {
    const url: string = `${this.hostname}/${this.resource}/${id}`;
    const token: string = localStorage.getItem('timetable-token');
    const options = {
      headers: new HttpHeaders({'Authorization': `Bearer ${token}`})
    };
    const body: any = {
      isActive: newIsActive
    };
    return this.httpClient.post<Account>(url, body, options);
  }
}
