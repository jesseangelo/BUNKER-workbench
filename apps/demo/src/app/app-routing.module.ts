import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ROUTES, RouterModule, Routes } from '@angular/router';
import { DashboardNewsComponent } from './dashboard_news_component/dashboard_news.component';
import { PortfolioWatchlistComponent } from './portfolio_watchlist_component/portfolio_watchlist.component';
import { DetailsInsightsComponent } from './details_insights_component/details_insights.component';

const routes: Routes = [
  { path: 'dashboard-news', component: DashboardNewsComponent },
  { path: 'portfolio-watchlist', component: PortfolioWatchlistComponent },
  { path: 'details-insights', component: DetailsInsightsComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
