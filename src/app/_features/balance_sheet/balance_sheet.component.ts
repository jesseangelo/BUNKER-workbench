import { ApiService } from "./../../services/api.service";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { AgGridAngular } from "ag-grid-angular";
import { CellClickedEvent, ColDef, GridReadyEvent } from "ag-grid-community";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "balance-sheet",
  template: `
    <button mat-raised-button (click)="do()">BALANCE SHEET</button>
    <!-- <table matTable [dataSource]="this.data"></table> -->
    <ag-grid-angular
      style="width: 100%; height: 500px"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowData]="this.data"
      [rowSelection]="'multiple'"
      [animateRows]="true"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  `,
})
export class BalanceSheetComponent implements OnInit {
  @Input() ticker;
  data = [];

  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    {field: "fiscalDateEnding"},
    {field: "reportedCurrency"},
    {field: "totalAssets"},
    {field: "totalCurrentAssets"},
    {field: "cashAndCashEquivalentsAtCarryingValue"},
    {field: "cashAndShortTermInvestments"},
    {field: "inventory"},
    {field: "currentNetReceivables"},
    {field: "totalNonCurrentAssets"},
    {field: "propertyPlantEquipment"},
    {field: "accumulatedDepreciationAmortizationPPE"},
    {field: "intangibleAssets"},
    {field: "intangibleAssetsExcludingGoodwill"},
    {field: "goodwill"},
    {field: "investments"},
    {field: "longTermInvestments"},
    {field: "shortTermInvestments"},
    {field: "otherCurrentAssets"},
    {field: "otherNonCurrentAssets"},
    {field: "totalLiabilities"},
    {field: "totalCurrentLiabilities"},
    {field: "currentAccountsPayable"},
    {field: "deferredRevenue"},
    {field: "currentDebt"},
    {field: "shortTermDebt"},
    {field: "totalNonCurrentLiabilities"},
    {field: "capitalLeaseObligations"},
    {field: "longTermDebt"},
    {field: "currentLongTermDebt"},
    {field: "longTermDebtNoncurrent"},
    {field: "shortLongTermDebtTotal"},
    {field: "otherCurrentLiabilities"},
    {field: "otherNonCurrentLiabilities"},
    {field: "totalShareholderEquity"},
    {field: "treasuryStock"},
    {field: "retainedEarnings"},
    {field: "commonStock"},
    {field: "commonStockSharesOutstanding"},
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

  // Example load data from server
  onGridReady(params: GridReadyEvent) {
    // this.rowData$ = this.http.get<any[]>(
    //   "https://www.ag-grid.com/example-assets/row-data.json"
    // );
  }

  ngOnInit() {}

  do() {
    this.api.balanceSheet(this.ticker).subscribe((d: any) => {
      this.data = d.annualReports;
      console.log("balance", this.data);
    });
  }
}
