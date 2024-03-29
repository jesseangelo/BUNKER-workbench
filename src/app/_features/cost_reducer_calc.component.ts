import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'cost-reducer',
  templateUrl: './cost_reducer_calc.component.html',
})
export class CostReducerComponent implements OnInit {
  calcForm: FormGroup | undefined;
  currentCostBasis: number | undefined;

  moreShares: any;
  atNewPrice: any;
  finalCostBasis: any;

  newSpend: number | undefined;
  newCostBasis: number | undefined;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.calcForm = this.fb.group({
      shares: new FormControl(''),
      atCost: new FormControl(''),
      moreShares: new FormControl(''),
      atNewPrice: new FormControl(''),
      ticker: new FormControl(''),
    });

    this.calcForm.valueChanges.subscribe((vals) => {
      this.currentCostBasis = +vals.atCost * +vals.shares;
      // console.log('vals are ', vals);

      const allShares = +vals.shares + +vals.moreShares;
      this.newSpend = +vals.moreShares * +vals.atNewPrice;
      const allPrice = this.currentCostBasis + this.newSpend;

      this.newCostBasis = allPrice / allShares;

      // 10 * 5 = 50
      // 10 * 7 = 70
      // 20 @ 120
      // 120 / 20 = 6
    });
  }
}
