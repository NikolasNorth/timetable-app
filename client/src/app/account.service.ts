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
   * Submits a POST request to the /accounts API endpoint to create a new user account.
   *
   * @param account
   *
   * @return void
   */
  createAccount(account: Account): Observable<Account> {
    // TODO
    const url = `${this.hostname}/${this.resource}`
    return this.httpClient.post<Account>(url, account, this.httpOptions);
  }
}
