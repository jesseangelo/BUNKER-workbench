import { ApiService } from './../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

export interface PeriodicElement {
  position: number;
  ticker: string;
  shares_held: number;
  target_price: number;
}

@Component({
  selector: 'portfolio-watchlist',
  templateUrl: './portfolio_watchlist.component.html',
})
export class PortfolioWatchlistComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  companies = [];
  displayedColumns: string[] = ['ticker', 'shares_held', 'target_price', 'adjust_holdings'];
  dataSource = new MatTableDataSource<any>();

  constructor(private api: ApiService) {}

  ngOnInit() {
    // this.getCompanies();
    this.api.getCompanies().subscribe((c: any) => {
      this.companies = c;
      this.dataSource.data = c;
      console.log(`Companies loaded: `);
      console.log(this.companies[0]);
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  // add() {
  //   console.log(this.calcForm.controls['newTicker'].value);
  //   const t = this.calcForm.controls['newTicker'].value;
  //   this.companies.push({ ticker: t });
  //   const body = this.companies;

  //   this.api
  //     .addCompany(t, body)
  //     .subscribe(() => console.log('add called', body));
  // }
}
