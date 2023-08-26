import { ApiService } from "./../services/api.service";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { tap } from "rxjs";

@Component({
  selector: "details-insights",
  templateUrl: "./details_insights.component.html",
  styles: [
    `
      ::ng-deep mat-list-item .mat-list-item-content {
        display: flex;
        justify-content: space-between;
      }
    `,
  ],
})
export class DetailsInsightsComponent implements OnInit {
  calcForm: FormGroup;
  earningsDate = "";
  isInSP500 = "";
  overview = null;
  roic = "";
  ticker = ""

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
    this.ticker = this.calcForm.controls["tickerToScour"].value;
    console.log("scouring for:", this.ticker);
    this.api.getCompanyOverview(this.ticker).pipe(tap(console.log)).subscribe((co: any) => {
      this.overview = co;
    });

    this.api.isSP500(this.ticker).subscribe((is: any) => {
      this.isInSP500 = is ? 'Yes' : 'No';
    });

    this.api.roic(this.ticker).subscribe((r: any) => this.roic);

    // this.api.nextEarningsDate(t).subscribe((e: any) => {
    //   this.earningsDate = e;
    // });
  }

}
