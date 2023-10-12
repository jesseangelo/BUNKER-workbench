import { ApiService } from './../../services/api.service';
import { Component, Input } from '@angular/core';
import { ConvertToFinReportService } from 'src/app/services/convert-to-fin-report.service';

export interface Line {
  metric: string;
  curr_4: string;
  curr_3: string;
  curr_2: string;
  curr_1: string;
  curryr: string;
}

@Component({
  selector: 'income-statement',
  template: `
    <button mat-raised-button (click)="do()">Income Statement</button>
    <financial-statement [dataSource]="data"></financial-statement>
  `,
})
export class IncomeStatementComponent {
  @Input() ticker;
  data = [];

  displayedColumns: string[] = ['2018', '2019', '2020', '2021', '2022'];

  constructor(
    private api: ApiService,
    private convertService: ConvertToFinReportService
  ) {}

  do() {
    this.convertService
      .convert(this.api.incomeStatement(this.ticker))
      .subscribe((d: any) => {
        this.data = d;
        console.log('income', d);
      });
  }
}
