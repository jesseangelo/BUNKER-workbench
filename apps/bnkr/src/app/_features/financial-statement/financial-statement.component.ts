import { Component, Input } from '@angular/core';

export interface Line {
  metric: string;
  curr_4: string;
  curr_3: string;
  curr_2: string;
  curr_1: string;
  curryr: string;
}

@Component({
  selector: 'financial-statement',
  styleUrls: ['financial-statement.component.css'],
  templateUrl: 'financial-statement.component.html',
})
export class FinancialStatementComponent {
  displayedColumns: string[] = [
    'col-metric',
    'col-curr-4',
    'col-curr-3',
    'col-curr-2',
    'col-curr-1',
    'col-curryr',
  ];
  @Input() dataSource: Line[];
}
