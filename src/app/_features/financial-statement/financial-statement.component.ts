import {Component} from '@angular/core';
import {MatTableModule} from '@angular/material/table';

export interface Line {
  metric: string;
  curr_4: string;
  curr_3: string;
  curr_2: string;
  curr_1: string;
  curryr: string;
}

const ELEMENT_DATA: Line[] = [
  {
    metric: 'fiscalDateEnding',
    curr_4: '2018-12-31',
    curr_3: '2019-12-31',
    curr_2: '2020-12-31',
    curr_1: '2021-12-31',
    curryr: '2022-12-31'
  },
  {
    metric: 'reportedCurrency',
    curr_4: 'USD',
    curr_3: 'USD',
    curr_2: 'USD',
    curr_1: 'USD',
    curryr: 'USD'
  },
  {
    metric: 'grossProfit',
    curr_4: '36936000000',
    curr_3: '31533000000',
    curr_2: '30865000000',
    curr_1: '31486000000',
    curryr: '32687000000'
  },
  {
    metric: 'totalRevenue',
    curr_4: '79591000000',
    curr_3: '57714000000',
    curr_2: '55179000000',
    curr_1: '57350000000',
    curryr: '60530000000'
  },
  {
    metric: 'costOfRevenue',
    curr_4: '42655000000',
    curr_3: '26181000000',
    curr_2: '24314000000',
    curr_1: '25865000000',
    curryr: '27842000000'
  },
  {
    metric: 'costofGoodsAndServicesSold',
    curr_4: '42655000000',
    curr_3: '591000000',
    curr_2: '439000000',
    curr_1: '300000000',
    curryr: '385000000'
  },
  {
    metric: 'operatingIncome',
    curr_4: '10838000000',
    curr_3: '9004000000',
    curr_2: '4609000000',
    curr_1: '4786000000',
    curryr: '6408000000'
  },
  {
    metric: 'sellingGeneralAndAdministrative',
    curr_4: '19366000000',
    curr_3: '18724000000',
    curr_2: '20561000000',
    curr_1: '18745000000',
    curryr: '18609000000'
  },
  {
    metric: 'researchAndDevelopment',
    curr_4: '5379000000',
    curr_3: '5910000000',
    curr_2: '6262000000',
    curr_1: '6488000000',
    curryr: '6567000000'
  },
  {
    metric: 'operatingExpenses',
    curr_4: '26098000000',
    curr_3: '27484000000',
    curr_2: '30966000000',
    curr_1: '26700000000',
    curryr: '26279000000'
  },
  {
    metric: 'investmentIncomeNet',
    curr_4: 'None',
    curr_3: 'None',
    curr_2: 'None',
    curr_1: 'None',
    curryr: 'None'
  },
  {
    metric: 'netInterestIncome',
    curr_4: '-723000000',
    curr_3: '-1344000000',
    curr_2: '-1288000000',
    curr_1: '-1155000000',
    curryr: '-1216000000'
  },
  {
    metric: 'interestIncome',
    curr_4: '264000000',
    curr_3: '349000000',
    curr_2: '105000000',
    curr_1: '52000000',
    curryr: '162000000'
  },
  {
    metric: 'interestExpense',
    curr_4: '723000000',
    curr_3: '1344000000',
    curr_2: '1288000000',
    curr_1: '1155000000',
    curryr: '1216000000'
  },
  {
    metric: 'nonInterestIncome',
    curr_4: 'None',
    curr_3: 'None',
    curr_2: '-92000000',
    curr_1: '337000000',
    curryr: '365000000'
  },
  {
    metric: 'otherNonOperatingIncome',
    curr_4: '-1152000000',
    curr_3: '968000000',
    curr_2: '156000000',
    curr_1: '225000000',
    curryr: '443000000'
  },
  {
    metric: 'depreciation',
    curr_4: '3127000000',
    curr_3: '4209000000',
    curr_2: '4227000000',
    curr_1: '3888000000',
    curryr: '2407000000'
  },
  {
    metric: 'depreciationAndAmortization',
    curr_4: '1353000000',
    curr_3: '1850000000',
    curr_2: '2468000000',
    curr_1: '2529000000',
    curryr: '2395000000'
  },
  {
    metric: 'incomeBeforeTax',
    curr_4: '11347000000',
    curr_3: '9491000000',
    curr_2: '4230000000',
    curr_1: '5867000000',
    curryr: '1013000000'
  },
  {
    metric: 'incomeTaxExpense',
    curr_4: '2619000000',
    curr_3: '60000000',
    curr_2: '-1360000000',
    curr_1: '124000000',
    curryr: '-626000000'
  },
  {
    metric: 'interestAndDebtExpense',
    curr_4: '723000000',
    curr_3: '1344000000',
    curr_2: '1288000000',
    curr_1: '1155000000',
    curryr: '1216000000'
  },
  {
    metric: 'netIncomeFromContinuingOperations',
    curr_4: '8723000000',
    curr_3: '7146000000',
    curr_2: '3932000000',
    curr_1: '4712000000',
    curryr: '1783000000'
  },
  {
    metric: 'comprehensiveIncomeNetOfTax',
    curr_4: '8252000000',
    curr_3: '10324000000',
    curr_2: '4850000000',
    curr_1: '10582000000',
    curryr: '8134000000'
  },
  {
    metric: 'ebit',
    curr_4: '12070000000',
    curr_3: '10835000000',
    curr_2: '5518000000',
    curr_1: '7022000000',
    curryr: '2229000000'
  },
  {
    metric: 'ebitda',
    curr_4: '13423000000',
    curr_3: '12685000000',
    curr_2: '7986000000',
    curr_1: '9551000000',
    curryr: '4624000000'
  },
  {
    metric: 'netIncome',
    curr_4: '8728000000',
    curr_3: '9431000000',
    curr_2: '5590000000',
    curr_1: '5743000000',
    curryr: '1639000000'
  }
];

/**
 * @title Styling columns using their auto-generated column names
 */
@Component({
  selector: 'financial-statement',
  styleUrls: ['financial-statement.component.css'],
  templateUrl: 'financial-statement.component.html',
  standalone: true,
  imports: [MatTableModule],
})
export class FinancialStatementComponent {
  displayedColumns: string[] = ['col-metric', 'col-curr-4', 'col-curr-3', 'col-curr-2', 'col-curr-1', 'col-curryr'];
  dataSource = ELEMENT_DATA;
}

// const data = [];
// const current = response.annualReports[0];
// const curr_1 = response.annualReports[1]
// const curr_2 = response.annualReports[2]
// const curr_3 = response.annualReports[3]
// const curr_4 = response.annualReports[4]

// const keys = Object.keys(response.annualReports[0])
// // keys

// for(let i = 0; i < keys.length; i++) {
//   // keys[i]
//   const d = {
//     metric: Object.keys(current)[i],
//     curr_4: curr_4[Object.keys(current)[i]],
//     curr_3: curr_3[Object.keys(current)[i]],
//     curr_2: curr_2[Object.keys(current)[i]],
//     curr_1: curr_1[Object.keys(current)[i]],
//     curryr: current[Object.keys(current)[i]]
//   }
//   data.push(d)
// }