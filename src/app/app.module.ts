import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CostReducerComponent } from './cost_reducer_calc.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DashboardNewsComponent } from '../../dashboard_news_component/dashboard_news.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PortfolioWatchlistComponent } from '../../portfolio_watchlist_component/portfolio_watchlist.component';
import { DetailsInsightsComponent } from '../../details_insights_component/details_insights.component';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, HttpClientModule, MatTabsModule],
  declarations: [AppComponent, CostReducerComponent, DashboardNewsComponent, PortfolioWatchlistComponent, DetailsInsightsComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
