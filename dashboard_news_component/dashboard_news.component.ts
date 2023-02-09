import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard-news',
  template: `Dashboard News
  
  <h2><a href="https://www.moneymetals.com/copper-prices">Copper Prices</a></h2>

  <h2><a href="http://clarkstreetvalue.blogspot.com">clarkstreetvalue</a></h2>

  <h2><a href="https://www.cnn.com/markets/fear-and-greed">fear-and-greed</a></h2>
  
  `,
})
export class DashboardNewsComponent implements OnInit {
  ngOnInit() {}
}
