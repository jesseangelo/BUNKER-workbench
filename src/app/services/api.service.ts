import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get endPoint() {
    return "http://localhost:3000";
  }
  
  isAlive() {
    return true;
    // return this.http.get(`${this.endPoint}/healthCheck);
  } 

  getCompanyOverview(ticker) {
    return this.http.get(`${this.endPoint}/companyOverview?ticker=${ticker}`);
  }

  isSP500(ticker) {
    return this.http.get(`${this.endPoint}/isSP500?ticker=${ticker}`);
  }

  nextEarningsDate(ticker) {
    return this.http.get(`${this.endPoint}/nextearnings?ticker=${ticker}`, {
      responseType: "text",
    });
  }

  getCompanies() {
    return this.http.get(`${this.endPoint}/companies`);
  }

  // test
  addCompany(ticker, content) {
    return this.http.post(
      `${this.endPoint}/update?
        ${ticker}`,
      content
    );
  }

  fearGreed() {
    return this.http.get(`${this.endPoint}/fearGreed`);
  }
}
