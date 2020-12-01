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

  /**
   * Submits a POST request to the /accounts/signup to create a new user account.
   *
   * @param account
   *
   * @return Observable<Account>
   */
  signUpAccount(account: Account): Observable<Account> {
    const url: string = `${this.hostname}/${this.resource}/signup`;
    return this.httpClient.post<Account>(url, account, this.httpOptions);
  }

  /**
   * Submits a GET request to /accounts/confirm/:token to confirm a recently
   * created account.
   *
   * @param token
   */
  confirmAccount(token: string): Observable<Account> {
    const url: string = `${this.hostname}/${this.resource}/confirm/${token}`;
    return this.httpClient.get<Account>(url);
  }

  /**
   * Submits a POST request to /accounts/signin to see if account exists.
   *
   * @param account
   *
   * @return Observable<Account>
   */
  signInAccount(account: Account): Observable<Account> {
    const url: string = `${this.hostname}/${this.resource}/signin`;
    return this.httpClient.post<Account>(url, account, this.httpOptions);
  }

  requestPasswordReset(account: Account): Observable<any> {
    const url: string = `${this.hostname}/${this.resource}/request-password-reset`;
    return this.httpClient.post<any>(url, account, this.httpOptions);
  }

  resetPassword(password: string, id: string, jwt: string): Observable<any> {
    const reqBody: any = {
      sub: id,
      password: password,
      token: jwt,
    };
    const url: string = `${this.hostname}/${this.resource}/password-reset`;
    return this.httpClient.post<any>(url, reqBody, this.httpOptions);
  }

  accessProtectedRoute(): Observable<any> {
    const url: string = `${this.hostname}/${this.resource}/protected`;
    const token: string = localStorage.getItem('timetable-token');
    const options = {
      headers: new HttpHeaders({'Authorization': `Bearer ${token}`})
    };
    return this.httpClient.get<any>(url, options);
  }
}
