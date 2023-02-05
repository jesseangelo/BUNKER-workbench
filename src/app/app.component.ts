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
    //this.apiTest()
    this.calcForm = this.fb.group({
      enterTicker: new FormControl(''),
      shares: new FormControl(''),
      atCost: new FormControl(''),
      moreShares: new FormControl(''),
      atNewPrice: new FormControl(''),
      ticker: new FormControl(''),
    });

    this.calcForm.valueChanges.subscribe((vals) => {
      this.currentCostBasis = +vals.atCost * +vals.shares;
      // console.log('vals are ', vals);

      const allShares = +vals.shares + +vals.moreShares;
      this.newSpend = +vals.moreShares * +vals.atNewPrice;
      const allPrice = this.currentCostBasis + this.newSpend;

      this.newCostBasis = allPrice / allShares;

      // 10 * 5 = 50
      // 10 * 7 = 70
      // 20 @ 120
      // 120 / 20 = 6
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
    console.log(this.calcForm.controls['enterTicker'].value);
    const t = this.calcForm.controls['enterTicker'].value;
    this.companies.push({ticker: t});
    const body = this.companies

    this.http
      .post(
        `https://BunkerBrain.jesseangelo.repl.co/update?
        ticker`,
        body
      )
      .subscribe(() => console.log('api called'));
  }

  getCompanies() {
    this.http.get(`https://BunkerBrain.jesseangelo.repl.co/companies`).subscribe((c: any) => {
      this.companies = c;
      console.log(this.companies)
  })
  }
}
