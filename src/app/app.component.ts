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

  apiTest() {
    console.log(this.calcForm.controls['ticker'].value);
    this.http
      .get(
        `https://BunkerBrain.jesseangelo.repl.co/isSP500?ticker=${this.calcForm.controls['ticker'].value}`
      )
      .subscribe(console.log);
  }

  getCompanies() {
    this.http.get(`https://BunkerBrain.jesseangelo.repl.co/companies`).subscribe(console.log)
  }
}
