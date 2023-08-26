import { ApiService } from "./../../services/api.service";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "cash-flow",
  template: `
    cash flow
    <button mat-raised-button (click)="do()"></button>
  `,
})
export class CashFlowComponent implements OnInit {
  @Input() ticker;

  constructor(
    private api: ApiService
  ) {}

  ngOnInit() {
    
  }

  do() {
    this.api.cashFlow(this.ticker).subscribe(console.log) 
  }
  
}
