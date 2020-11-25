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
   * Submits a POST request to the /accounts/create to create a new user account.
   *
   * @param account
   *
   * @return Observable<Account>
   */
  createAccount(account: Account): Observable<Account> {
    const url = `${this.hostname}/${this.resource}/create`;
    return this.httpClient.post<Account>(url, account, this.httpOptions);
  }

  /**
   * Submits a POST request to /accounts/find to see if account exists.
   *
   * @param account
   *
   * @return Observable<Account>
   */
  findAccount(account: Account): Observable<Account> {
    const url = `${this.hostname}/${this.resource}/find`;
    return this.httpClient.post<Account>(url, account, this.httpOptions);
  }
}
