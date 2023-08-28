import { ApiService } from "./../services/api.service";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "dashboard-news",
  template: `
    <h2>
      <a href="https://www.moneymetals.com/copper-prices">Copper Prices</a>
    </h2>

    <h2><a href="http://clarkstreetvalue.blogspot.com">clarkstreetvalue</a></h2>

    <h2>
      fear-and-greed {{ fearGreed?.score | number : "1.0-0" }}
      {{ fearGreed?.rating }}
    </h2>

    Notes: **When and how to buy - Dashboard** Color code stuff CAPE ratio
    Buffet index? 13f alert 45 day after quarter cllse [DATAROMA Superinvestor
    Holdings Summary](https://www.dataroma.com/m/managers.php) updates or
    whatever from super investors Need to know how far from price target we are
    When to buy indicator 1. Set current position 2. Set desired amount/percent
    of portfolio 3. Will calc how much more to buy 4. How many intervals to buy
    in 5. When to buy shares to reduce cost basis by x percent
  `,
})
export class DashboardNewsComponent implements OnInit {
  fearGreed;
  constructor(private api: ApiService) {}
  ngOnInit() {
    this.api.fearGreed().subscribe((response: any) => {
      console.log(response);
      this.fearGreed = response;
    });
  }
}
