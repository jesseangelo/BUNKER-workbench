import { ApiService } from './../../services/api.service';
import { Component, Input } from '@angular/core';
import { ConvertToFinReportService } from '../../services/convert-to-fin-report.service';

@Component({
  selector: 'balance-sheet',
  template: `
    <button mat-raised-button (click)="do()">BALANCE SHEET</button>
    <financial-statement [dataSource]="data"></financial-statement>
  `,
})
export class BalanceSheetComponent {
  @Input() ticker: any;
  data = [];

  displayedColumns: string[] = ['2018', '2019', '2020', '2021', '2022'];
  constructor(
    private api: ApiService,
    private convertService: ConvertToFinReportService
  ) {}

  do() {
    this.convertService
      .convert(this.api.balanceSheet(this.ticker))
      .subscribe((d: any) => {
        this.data = d;
        console.log('balance sheet', d);
      });
  }
}
