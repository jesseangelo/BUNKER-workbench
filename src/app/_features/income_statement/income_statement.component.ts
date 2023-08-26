import { ApiService } from "./../../services/api.service";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { AgGridAngular } from "ag-grid-angular";
import { CellClickedEvent, ColDef, GridReadyEvent } from "ag-grid-community";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "income-statement",
  template: `
    <button mat-raised-button (click)="do()">Income Statement</button>
    <ag-grid-angular
      style="width: 100%; height: 500px"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowData]="this.data"
      [rowSelection]="'multiple'"
      [animateRows]="true"
    ></ag-grid-angular>
  `,
})
export class IncomeStatementComponent {
  @Input() ticker;
  data = [];

  public columnDefs: ColDef[] = [
    { field: "fiscalDateEnding" },
    { field: "reportedCurrency" },
    { field: "grossProfit" },
    { field: "totalRevenue" },
    { field: "costOfRevenue" },
    { field: "costofGoodsAndServicesSold" },
    { field: "operatingIncome" },
    { field: "sellingGeneralAndAdministrative" },
    { field: "researchAndDevelopment" },
    { field: "operatingExpenses" },
    { field: "investmentIncomeNet" },
    { field: "netInterestIncome" },
    { field: "interestIncome" },
    { field: "interestExpense" },
    { field: "nonInterestIncome" },
    { field: "otherNonOperatingIncome" },
    { field: "depreciation" },
    { field: "depreciationAndAmortization" },
    { field: "incomeBeforeTax" },
    { field: "incomeTaxExpense" },
    { field: "interestAndDebtExpense" },
    { field: "netIncomeFromContinuingOperations" },
    { field: "comprehensiveIncomeNetOfTax" },
    { field: "ebit" },
    { field: "ebitda" },
    { field: "netIncome" },
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

  constructor(private http: HttpClient, private api: ApiService) {}

  do() {
    this.api.incomeStatement(this.ticker).subscribe((d: any) => {
      this.data = d.annualReports;
      console.log("income", this.data);
    });
  }
}
