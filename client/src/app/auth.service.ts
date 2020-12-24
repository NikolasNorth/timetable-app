import { Injectable } from '@angular/core';
import {Account} from './@types/account';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private hostname: string = 'http://localhost:3000';
  private resource: string = 'v1/auth'
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) { }

  /**
   * Stores the token and exp claim in local storage.
   *
   * @param res Response object
   */
  addToLocalStorage(res: any): void {
    localStorage.setItem('timetable-token', res.token);
    localStorage.setItem('timetable-token-exp', res.exp);
    localStorage.setItem('timetable-id', res.id);
  }

  /** Removes the token and exp claim from local storage. */
  removeFromLocalStorage(): void {
    localStorage.removeItem('timetable-token');
    localStorage.removeItem('timetable-token-exp');
  }

  /** Verifies if token has expired. */
  isSignedIn(): boolean {
    return !(!this.getId() || Date.now() >= this.getTokenExpiration());
  }

  /** Returns the timetable-id from local storage. */
  getId(): string | null {
    return localStorage.getItem('timetable-id');
  }

  /** Returns the timetable token from local storage. */
  getToken(): string | null {
    return localStorage.getItem('timetable-token');
  }

  /** Returns the timetable token expiration from local storage. */
  getTokenExpiration(): number | null {
    return Number(localStorage.getItem('timetable-token-exp'));
  }

  /**
   * Submits a POST request to the v1/auth/signup to create a new user account.
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
   * Submits a GET request to v1/auth/confirm/:token to confirm a recently
   * created account.
   *
   * @param token
   */
  confirmAccount(token: string): Observable<Account> {
    const url: string = `${this.hostname}/${this.resource}/confirm/${token}`;
    return this.httpClient.get<Account>(url);
  }

  /**
   * Submits a POST request to v1/auth/signin to see if account exists.
   *
   * @param account
   *
   * @return Observable<Account>
   */
  signInAccount(account: Account): Observable<Account> {
    const url: string = `${this.hostname}/${this.resource}/signin`;
    return this.httpClient.post<Account>(url, account, this.httpOptions);
  }

  /**
   * Submits POST request to v1/auth/request-password-reset to request a
   * password request link.
   *
   * @param account
   */
  requestPasswordReset(account: Account): Observable<any> {
    const url: string = `${this.hostname}/${this.resource}/request-password-reset`;
    return this.httpClient.post<any>(url, account, this.httpOptions);
  }

  /**
   * Submits POST request to v1/auth/password-reset to reset password in
   * database.
   *
   * @param password New password
   * @param id Account ID
   * @param jwt JSON web token
   */
  resetPassword(password: string, id: string, jwt: string): Observable<any> {
    const reqBody: any = {
      sub: id,
      password: password,
      token: jwt,
    };
    const url: string = `${this.hostname}/${this.resource}/password-reset`;
    return this.httpClient.post<any>(url, reqBody, this.httpOptions);
  }
}
