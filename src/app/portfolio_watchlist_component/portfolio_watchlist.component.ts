import { ApiService } from './../services/api.service';
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "portfolio-watchlist",
  template: `
    <div class="ma3 sans-serif" [formGroup]="calcForm">
      <section>
        <h2>Companies</h2>
        <!-- Get All 
      <button mat-button (click)="getCompanies()">GET</button>
      <br /> -->
       
        <mat-form-field class="example-full-width">
          <mat-label>New Ticker</mat-label>
          <input matInput formControlName="newTicker" />
        </mat-form-field>

        <button mat-button (click)="add()">ADD</button>
      </section>

      <section><h2>Cost Reducer</h2>
        <section><cost-reducer></cost-reducer></section>
        <div *ngFor="let t of companies">
          <mat-expansion-panel hideToggle>
            <mat-expansion-panel-header>
              <mat-panel-title>
                {{ t.ticker }}
              </mat-panel-title>
              <mat-panel-description>
                This is a summary of the content
              </mat-panel-description>
            </mat-expansion-panel-header>
            <p>Next Earnings: {{ t.earningsDate }}</p>
          </mat-expansion-panel>
        </div>
      </section>
      Notes:  Price reduction calculator Cost basis calculator  
    </div>
  `,
})
export class PortfolioWatchlistComponent implements OnInit {
  calcForm: FormGroup;

  companies = [];
  earningsDate = "";

  constructor(private fb: FormBuilder, private http: HttpClient, private api:ApiService) {}

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

    this.http
      .post(
        `${this.api.endPoint}/update?
        ticker`,
        body
      )
      .subscribe(() => console.log("add called", body));
  }

  getCompanies() {
    this.http
      .get(`${this.api.endPoint}/companies`)
      .subscribe((c: any) => {
        this.companies = c;
        console.log(`Companies loaded: ${this.companies}`);
      });
  }
}
