import { ApiService } from "./../../services/api.service";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "income-statement",
  template: `
    income statemetn
    <button mat-raised-button (click)="do()"></button>
  `,
})
export class IncomeStatementComponent implements OnInit {
  @Input() ticker;

  constructor(
    private api: ApiService
  ) {}

  ngOnInit() {
    
  }

  do() {
    this.api.incomeStatement(this.ticker).subscribe(console.log) 
  }
  
}
