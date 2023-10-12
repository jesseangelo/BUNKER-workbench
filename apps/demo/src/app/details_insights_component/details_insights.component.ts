import { ApiService } from './../services/api.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { distinctUntilChanged, tap } from 'rxjs';

@Component({
  selector: 'details-insights',
  templateUrl: './details_insights.component.html',
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
  earningsDate = '';
  isInSP500 = '';
  overview = null;
  roic = '';
  ticker = '';
  researchFormVals = null;
  companies = [];
  evaluation = '';
  // need a better way to handle this and update
  shares = 0;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.calcForm = this.fb.group({
      tickerToScour: new FormControl(''),
    });
    this.calcForm
      .get('tickerToScour')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        this.calcForm.get('tickerToScour').patchValue(value.toUpperCase());
      });

    this.getCompanies();
  }

  getCompanies() {
    this.api.getCompanies().subscribe((c: any) => {
      this.companies = c;
      console.log(`Companies loaded: ${this.companies}`);
    });
  }

  save() {
    // console.log(this.calcForm.controls["tickerToScour"].value);
    const t = this.calcForm.controls['tickerToScour'].value;
    const body = {
      ticker: t,
      evaluation: {
        ...this.researchFormVals,
      },
      shares_held: this.shares,
    };
    console.log('getting ready to save', body);

    this.http
      .post(`${this.api.endPoint}/update`, body)
      .subscribe(() => console.log('api called'));
  }

  scour() {
    this.ticker = this.calcForm.controls['tickerToScour'].value;
    // console.log("scouring for:", this.ticker);

    // populate
    this.companies.forEach((val) => {
      // console.log('comparing', val)
      if (val.ticker == this.ticker) {
        console.log('found', val);
        //this.calcForm.patchValue(val.evaluation)
        this.evaluation = val.evaluation;
        // don't think we need this or should be doing it here?
        console.log(val.shares_held);
        this.shares = val.shares_held;
      }
    });

    this.api
      .getCompanyOverview(this.ticker)
      .pipe(tap(console.log))
      .subscribe((co: any) => {
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

  templateFormUpdated($event) {
    // console.log('form', $event)
    this.researchFormVals = $event;
  }
}