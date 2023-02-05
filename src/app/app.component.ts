import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  calcForm: FormGroup;
  currentCostBasis;

  moreShares;
  atNewPrice;
  finalCostBasis;

  newSpend;
  newCostBasis;

  companies = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.calcForm = this.fb.group({
      newTicker: new FormControl(''),
      ticker: new FormControl('')
    });

    
  }

  isSP500() {
    console.log(this.calcForm.controls['ticker'].value);
    this.http
      .get(
        `https://BunkerBrain.jesseangelo.repl.co/isSP500?ticker=${this.calcForm.controls['ticker'].value}`
      )
      .subscribe(console.log);
  }

  apiTest() {
    console.log(this.calcForm.controls['newTicker'].value);
    const t = this.calcForm.controls['newTicker'].value;
    this.companies.push({ ticker: t });
    const body = this.companies;

    this.http
      .post(
        `https://BunkerBrain.jesseangelo.repl.co/update?
        ticker`,
        body
      )
      .subscribe(() => console.log('api called'));
  }

  getCompanies() {
    this.http
      .get(`https://BunkerBrain.jesseangelo.repl.co/companies`)
      .subscribe((c: any) => {
        this.companies = c;
        console.log(this.companies);
      });
  }
}
