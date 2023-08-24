import { ApiService } from "./../services/api.service";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "details-insights",
  template: `
    <div class="ma3 sans-serif" [formGroup]="calcForm">
      <section>
        <h2>Research</h2>
        <div>
          <mat-form-field class="example-full-width mr3">
            <mat-label>Ticker</mat-label>
            <input matInput formControlName="tickerToScour" />
          </mat-form-field>
          <button
            mat-raised-button
            color="primary"
            class="ml3"
            (click)="scour()"
          >
            Scour
          </button>
          <button mat-button color="accent" class="ml3" (click)="save()">
            Save
          </button>
        </div>
      </section>

      <div class="sans-serif" [formGroup]="calcForm">
        <h3>Key Metrics</h3>
        <mat-list>
          <mat-list-item>
            <h4 class="f5">ROIC</h4>
            {{ roic }}
          </mat-list-item>
          <mat-divider></mat-divider>

          <mat-list-item>
            <h4 class="f5">
              Is S&P 500?<span class="dark-green">{{ isInSP500 }}</span>
            </h4>
          </mat-list-item>
          <mat-divider></mat-divider>

          <mat-list-item>
            <h4 class="f5">Market Cap</h4>
            <h4></h4>
          </mat-list-item>
          <mat-divider></mat-divider>

          <mat-list-item>
            <h4 class="f5">Overview:&nbsp;</h4>
            <p>
              {{ overview?.Description }} This is an example description blah
              blah
            </p>
          </mat-list-item>
          <mat-divider></mat-divider>

        </mat-list>
      </div>
      <br />
      <research-template></research-template>
    </div>
  `,
})
export class DetailsInsightsComponent implements OnInit {
  calcForm: FormGroup;
  earningsDate = "";
  isInSP500 = "";
  overview = null;
  roic = "";

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
    // this.api.getCompanyOverview(t).subscribe((co: any) => {
    //   this.overview = co;
    // });

    this.api.isSP500(t).subscribe((is: any) => {
      this.isInSP500 = is;
    });

    this.api.roic(t).subscribe((r: any) => this.roic);

    // this.api.nextEarningsDate(t).subscribe((e: any) => {
    //   this.earningsDate = e;
    // });
  }
}
