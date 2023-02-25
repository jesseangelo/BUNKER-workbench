import { ApiService } from './services/api.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CostReducerComponent } from './_features/cost_reducer_calc.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DashboardNewsComponent } from './dashboard_news_component/dashboard_news.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PortfolioWatchlistComponent } from './portfolio_watchlist_component/portfolio_watchlist.component';
import { DetailsInsightsComponent } from './details_insights_component/details_insights.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
  ],
  declarations: [
    AppComponent,
    CostReducerComponent,
    DashboardNewsComponent,
    PortfolioWatchlistComponent,
    DetailsInsightsComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
