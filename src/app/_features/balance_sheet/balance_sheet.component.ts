import { ApiService } from "./../../services/api.service";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "balance-sheet",
  template: `
    balance sheet
    <button mat-raised-button (click)="do()">BALANCE SHEET</button>
    <!-- <table matTable [dataSource]="this.data"></table> -->
  `,
})
export class BalanceSheetComponent implements OnInit {
  @Input() ticker;
  data = [];

  constructor(private api: ApiService) {}

  ngOnInit() {}

  do() {
    this.api.balanceSheet(this.ticker).subscribe((d: any) => {
      this.data = d.AnnualReports;
      console.log('balance', this.data)
    });
  }
}
