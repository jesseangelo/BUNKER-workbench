import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}

  isLoading: BehaviorSubject<boolean>;

  get endPoint() {
    // syn deployment
    return "http://192.168.0.62:8080"
    // return "http://localhost:8080"
    // return "http://bnkr-env.eba-gakhxzk2.us-west-2.elasticbeanstalk.com"
  }
  
  isAlive() {
    // return of(true);
    return this.http.get(`${this.endPoint}/healthCheck`)
      .pipe(
        catchError(() =>  of(false))
      )
    };

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

  roic(ticker) {
    return this.http.get(`${this.endPoint}/roic?ticker=${ticker}`, {
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

  balanceSheet(ticker) {
    console.log('getting balance sheet for', ticker)
    return this.http.get(`${this.endPoint}/balanceSheet?ticker=${ticker}`)
  }

  cashFlow(ticker) {
    return this.http.get(`${this.endPoint}/cashFlow?ticker=${ticker}`)
  }

  incomeStatement(ticker) {
    return this.http.get(`${this.endPoint}/incomeStatement?ticker=${ticker}`)
  }

  // baseGet(URL) {
  //   this.isLoading.next(true);
  //   return this.http.get(URL).pipe()
  // }
}
