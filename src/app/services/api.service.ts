import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  get endPoint() {
    return 'http://localhost:3000'
  }
}
