import { ApiService } from "./../services/api.service";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "research-template",
  template: `
  Get to no as fast as possible. Why go with your 10th best idea?

Am I capable of understanding?

<aside> 💡 Who are these guys? - 15 mins investor pres,

Summary profile (brief overview of the company)

Overview of the industry

What is the story?

Guru buying?

Activist involvement?

Insider buying?

</aside>

<aside> 💡

</aside>

SCOUR - What do you find?

Moat?

Scour check - google them, annual report

Is there anything weird financially?

Growth consistency: 1. Equity 2. EPS 3. Sales (or gross profit) 4. Cash flow

Any numbers that stick out? What is the overall trend?

Dividend? How sustainable?

Quality of assets on balance sheet? Declining revenue

<aside> 💡

</aside>

Management

profiles of executives

Objective and subjective metrics. This section is very important

Do they have integrity and shareholders in mind? Clear vision?

Objective and subjective metrics. This section is very important

[ ] Debt to Equity ratio < 1?
[ ] Current Ratio > 1.5
[ ] ROIC > 10%
[ ] Consistent Growth?
[ ] Insider buying?
[ ] Integrity level of management
[ ] Stable margins
[ ] low long term debt > 3 yrs revenue? Or net debt / fcf
Net Debt / Free Cash Flow This ratio shows you how many years it would take the company to pay down all its debt when it would use all available free cash flow.

<aside> 💡

</aside>

MOS

Valuation - It’s much better to be vaguely right than precisely wrong

[ ] P/E Industry avg
[ ] Price to Book < 1.5
[ ] Price to FCF < 15
[ ] Cash per share = assets - liabilities
[ ] Dividend?
[ ] PEG ratio (p/e / growth rate) < 1
[ ] EPS 10 yr Growth
[ ] Rev 10 yr growth
[ ] ROIC 10 yr avg
[ ] Growing EPS?
[ ] Growing FCF?
[ ] Growing net income
[ ] Growing Revenue?
[ ] Quality of assets
P/E Industry avg		Preferred metric by company?
Price to Book < 1.5		EPS
Price to FCF < 15		FCF
Cash per share		
= assets - liabilities		Revenue
Dividend?		Net income?
PEG ratio (p/e / growth rate) < 1		
EPS 10 yr Growth		Quality of assets
Rev 10 yr growth		
ROIC 10 yr avg		
<aside> 💡

</aside>

Thesis (when will value be recognized?)

Sector, Sentiment, and Catalysts

Cyclicality of sector

Cyclicality of economy in general

Risk/Reward

Prospects for future growth in market and business

Event large/global and small

<aside> 💡

</aside>

Notes

Phil Town Valuation Checklist
Historical growth rate is reasonably consistent look for a constant rise
7-10 year projected growth rate is reasonably predictable We only get paid for cash flow in the future. You should know that industry and business will be around for a long time. Using the past growth, but also moat and context of industry. Should be pretty simple and obvious - jumping over a 6 inch bar.
P/E ratio for a bull market sale in 10 years is reasonable and historical Falls within normal range, but we'd likely SELL during a bull market
MARR is 15%
Find the TTM EPS Is this reasonable or inflated somehow? Did they just sell half their business or acquire another company? Where does it come from exactly? Has it grown?
Find FCF per share TTM Any factors affecting this?
Find owner's cashflow TTM Don't ignore latest data, use TTM
VALUE IT - Calculate MOS, PBT, Cap rate
MOS on website
PBT on website
Owner's cash flow at 10 cap rate (owner's earning / market cap)
operating cash flow: 406.16M (from cash flow statement)
maintaince cap ex (investing activities for maintenence may have to read, can take total and subtract growth to get this) 48M
operating cash flow - maintenance cap ex = 406 - 48 = 358
market cap: 12.952B
cap rate is owner's cash / market cap; 358 / 1,295 = 27.64%


    <div class="ma3 sans-serif" [formGroup]="calcForm">
    src/app/details_insights_component/details_insights.component.ts
      Capable of understanding
      
      SCOUR

      Management
      

      MOS / Price

      Thesis
      <section>
        <h2>Scour for information</h2>
        <mat-form-field class="example-full-width">
          <mat-label>Ticker to Scour</mat-label>
          <input matInput formControlName="tickerToScour" />
        </mat-form-field>
        <button mat-button (click)="scour()">Scour</button>
        <button mat-button (click)="save()">Save</button>
      </section>

      <div class="sans-serif" [formGroup]="calcForm">
        <h2>Next Earnings</h2>
        {{ earningsDate }}
        <h2>Heeeeey, wait a minute. Is this part of the S&P 500??</h2>

        <h1 class="dark-green">{{ isInSP500 ? "Yup" : "Nope!" }}</h1>

        <p>{{ overview?.Description }}</p>

        src/app/details_insights_component/details_insights.component.ts
      </div>

      Notes: Numbers Why and what Moat Management Thesis Valuation model
    </div>
  `,
})
export class DetailsInsightsComponent implements OnInit {
  calcForm: FormGroup;
  earningsDate = "";
  isInSP500 = null;
  overview = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.calcForm = this.fb.group({
      tickerToScour: new FormControl(""),
    });
  }

  save() {
    console.log(this.calcForm.controls["tickerToScour"].value);
    const t = this.calcForm.controls["tickerToScour"].value;
    const body = { ticker: t, earningsDate: this.earningsDate };

    this.http
      .post(`${this.api.endPoint}/update`, body)
      .subscribe(() => console.log("api called"));
  }

  scour() {
    const t = this.calcForm.controls["tickerToScour"].value;
    console.log("scouring for:", t);
    this.api.getCompanyOverview(t).subscribe((co: any) => {
      this.overview = co;
    });

    this.api.isSP500(t).subscribe((is: any) => {
      this.isInSP500 = is;
    });

    this.api.nextEarningsDate(t).subscribe((e: any) => {
      this.earningsDate = e;
    });
  }
}
