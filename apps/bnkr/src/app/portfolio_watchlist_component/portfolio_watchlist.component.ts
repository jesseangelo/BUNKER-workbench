import { ApiService } from './../services/api.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';

export interface PeriodicElement {
  position: number;
  ticker: string;
  shares_held: number;
  target_price: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, ticker: 'EPAM', shares_held: 12, target_price: 23 }
  // {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
];

@Component({
  selector: "portfolio-watchlist",
  templateUrl: "./portfolio_watchlist.component.html",
})
export class PortfolioWatchlistComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'holding', 'target'];
  dataSource = ELEMENT_DATA;

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
