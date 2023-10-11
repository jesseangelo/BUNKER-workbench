import { ApiService } from "./../services/api.service";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "portfolio-watchlist",
  template: `
    <div class="ma3 sans-serif" [formGroup]="calcForm">
      <section>
        <h2>Companies</h2>

        <mat-form-field class="example-full-width">
          <mat-label>New Ticker</mat-label>
          <input matInput formControlName="newTicker" />
        </mat-form-field>

        <button mat-button (click)="add()">ADD</button>
      </section>

      <section>
        <h2>Cost Reducer</h2>
        <section><cost-reducer></cost-reducer></section>
      </section>
      <section>
        <h2>Companies</h2>
        <div *ngFor="let t of companies">
          <a [attr.href]="'/details-insights/' + t.ticker">{{ t.ticker }}</a>
          Holding {{ t.shares_held }} Buy Price {{ t.evaluation.target_price }}
        </div>
      </section>
    </div>
  `,
})
export class PortfolioWatchlistComponent implements OnInit {
  calcForm: FormGroup;

  companies = [];
  earningsDate = "";

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.calcForm = this.fb.group({
      newTicker: new FormControl(""),
    });

    this.getCompanies();
  }

  add() {
    console.log(this.calcForm.controls["newTicker"].value);
    const t = this.calcForm.controls["newTicker"].value;
    this.companies.push({ ticker: t });
    const body = this.companies;

    this.api
      .addCompany(t, body)
      .subscribe(() => console.log("add called", body));
  }

  getCompanies() {
    this.api.getCompanies().subscribe((c: any) => {
      this.companies = c;
      console.log(`Companies loaded: ${this.companies}`);
    });
  }
}
