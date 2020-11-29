import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  /**
   * Stores the token and exp claim in local storage.
   *
   * @param res Response object
   */
  addToLocalStorage(res: any): void {
    localStorage.setItem('timetable-token', res.token);
    localStorage.setItem('timetable-token-exp', res.exp);
  }

  /** Removes the token and exp claim from local storage. */
  removeFromLocalStorage(): void {
    localStorage.removeItem('timetable-token');
    localStorage.removeItem('timetable-token-exp');
  }

  /** Verifies if token has expired. */
  isLoggedIn(): boolean {
    return Date.now() < Number(localStorage.getItem('timetable-token-exp'));
  }
}
