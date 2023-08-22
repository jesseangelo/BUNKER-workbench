import { ApiService } from "./../services/api.service";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "details-insights",
  template: `
    <div class="ma3 sans-serif" [formGroup]="calcForm">
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
      </div>

      Notes: Numbers Why and what Moat Management Thesis Valuation model
      
      <research-template></research-template>
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
