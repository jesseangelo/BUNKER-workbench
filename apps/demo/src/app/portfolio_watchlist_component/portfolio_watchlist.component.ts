import { ApiService } from './../services/api.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: "portfolio-watchlist",
  templateUrl: "./portfolio_watchlist.component.html",
})
export class PortfolioWatchlistComponent implements OnInit {
  calcForm: FormGroup;

  companies = [];
  earningsDate = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.calcForm = this.fb.group({
      newTicker: new FormControl(''),
    });

    this.getCompanies();
  }

  add() {
    console.log(this.calcForm.controls['newTicker'].value);
    const t = this.calcForm.controls['newTicker'].value;
    this.companies.push({ ticker: t });
    const body = this.companies;

    this.api
      .addCompany(t, body)
      .subscribe(() => console.log('add called', body));
  }

  getCompanies() {
    this.api.getCompanies().subscribe((c: any) => {
      this.companies = c;
      console.log(`Companies loaded: ${this.companies}`);
    });
  }
}
