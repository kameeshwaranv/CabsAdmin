import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  private isLoggedIn: boolean;
  constructor() { }

  set loginStatus(status: boolean) {
    this.isLoggedIn = status;
  }
  get loginStatus(): boolean {
    return this.isLoggedIn;
  }
}
