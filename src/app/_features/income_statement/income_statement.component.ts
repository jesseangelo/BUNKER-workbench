import { ApiService } from "./../../services/api.service";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { AgGridAngular } from "ag-grid-angular";
import { CellClickedEvent, ColDef, GridReadyEvent } from "ag-grid-community";
import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "income-statement",
  template: `
    <button mat-raised-button (click)="do()">Income Statement</button>
    <!-- <ag-grid-angular
      style="width: 100%; height: 500px"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowData]="this.data"
      [rowSelection]="'multiple'"
      [animateRows]="true"
      pivotMode="true"
    ></ag-grid-angular> -->
  `,
})
export class IncomeStatementComponent {
  @Input() ticker;
  data = [];

  public columnDefs: ColDef[] = [
    // { field: '2018-12-31' },
    // { field: '2019-12-31' },
    // { field: '2020-12-31' },
    // { field: '2021-12-31' },
    // { field: '2022-12-31' },
    
    { field: "fiscalDateEnding" },
    // { field: "reportedCurrency" },
    // { field: "grossProfit" },
    // { field: "totalRevenue" },
    // { field: "costOfRevenue" },
    // { field: "costofGoodsAndServicesSold" },
    // { field: "operatingIncome" },
    // { field: "sellingGeneralAndAdministrative" },
    // { field: "researchAndDevelopment" },
    // { field: "operatingExpenses" },
    // { field: "investmentIncomeNet" },
    // { field: "netInterestIncome" },
    // { field: "interestIncome" },
    // { field: "interestExpense" },
    // { field: "nonInterestIncome" },
    // { field: "otherNonOperatingIncome" },
    // { field: "depreciation" },
    // { field: "depreciationAndAmortization" },
    // { field: "incomeBeforeTax" },
    // { field: "incomeTaxExpense" },
    // { field: "interestAndDebtExpense" },
    // { field: "netIncomeFromContinuingOperations" },
    // { field: "comprehensiveIncomeNetOfTax" },
    // { field: "ebit" },
    // { field: "ebitda" },
    // { field: "netIncome" },
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  // Data that gets displayed in the grid
  public rowData$!: Observable<any[]>;

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  displayedColumns: string[] = ['2018', '2019', '2020', '2021', '2022'];

  constructor(private http: HttpClient, private api: ApiService) {}

  do() {
    const yr = 2018;
    this.api.incomeStatement(this.ticker).pipe(
      // map((d:any) => {
      //   const data = []
      //   for(const report of d.annualReports) {
      //     console.log(report.fiscalDateEnding)
      //     const date = report.fiscalDateEnding
      //     const thisobj = {[date]: report}
      //     data.push(thisobj)
      //   }
      //   return data

      // })
    ).subscribe((d: any) => {
      this.data = d.annualReports;
      console.log("income", this.data);
    });
  }
}
