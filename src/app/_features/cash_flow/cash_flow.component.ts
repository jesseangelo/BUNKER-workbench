import { ApiService } from "./../../services/api.service";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { AgGridAngular } from "ag-grid-angular";
import { CellClickedEvent, ColDef, GridReadyEvent } from "ag-grid-community";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "cash-flow",
  template: `
    <button mat-raised-button (click)="do()">Cash Flow</button>
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
export class CashFlowComponent {
  @Input() ticker;
  data = [];

  public columnDefs: ColDef[] = [
    { field: "fiscalDateEnding" },
    { field: "reportedCurrency" },
    { field: "operatingCashflow" },
    { field: "paymentsForOperatingActivities" },
    { field: "proceedsFromOperatingActivities" },
    { field: "changeInOperatingLiabilities" },
    { field: "changeInOperatingAssets" },
    { field: "depreciationDepletionAndAmortization" },
    { field: "capitalExpenditures" },
    { field: "changeInReceivables" },
    { field: "changeInInventory" },
    { field: "profitLoss" },
    { field: "cashflowFromInvestment" },
    { field: "cashflowFromFinancing" },
    { field: "proceedsFromRepaymentsOfShortTermDebt" },
    { field: "paymentsForRepurchaseOfCommonStock" },
    { field: "paymentsForRepurchaseOfEquity" },
    { field: "paymentsForRepurchaseOfPreferredStock" },
    { field: "dividendPayout" },
    { field: "dividendPayoutCommonStock" },
    { field: "dividendPayoutPreferredStock" },
    { field: "proceedsFromIssuanceOfCommonStock" },
    { field: "proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet" },
    { field: "proceedsFromIssuanceOfPreferredStock" },
    { field: "proceedsFromRepurchaseOfEquity" },
    { field: "proceedsFromSaleOfTreasuryStock" },
    { field: "changeInCashAndCashEquivalents" },
    { field: "changeInExchangeRate" },
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
    this.api.cashFlow(this.ticker).subscribe((d: any) => {
      this.data = d.annualReports;
      console.log("cash flow", this.data);
    });
  }
}
