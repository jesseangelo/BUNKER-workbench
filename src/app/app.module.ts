import { FinancialStatementComponent } from './_features/financial-statement/financial-statement.component';
import { IncomeStatementComponent } from './_features/income_statement/income_statement.component';
import { BalanceSheetComponent } from './_features/balance_sheet/balance_sheet.component';
import { ApiService } from './services/api.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NetworkInterceptor } from './services/network.interceptor';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ResearchTemplateComponent } from './_features/research_template/research_template.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { CashFlowComponent } from './_features/cash_flow/cash_flow.component';
import { NumberSuffixPipe } from './services/number-suffix.pipe';
import { AgGridModule } from 'ag-grid-angular';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

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
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatToolbarModule,
    MatDividerModule,
    MatCardModule,
    MatListModule,
    MatTableModule,
    AgGridModule,
    AppRoutingModule,
    RouterModule,
  ],
  declarations: [
    AppComponent,
    CostReducerComponent,
    DashboardNewsComponent,
    PortfolioWatchlistComponent,
    DetailsInsightsComponent,
    ResearchTemplateComponent,
    BalanceSheetComponent,
    CashFlowComponent,
    IncomeStatementComponent,
    FinancialStatementComponent,
    NumberSuffixPipe,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NetworkInterceptor,
      multi: true,
    },
  ],
})
export class AppModule {}
