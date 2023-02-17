import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'details-insights',
  template: `Details Insights

  <div class="ma3 sans-serif" [formGroup]="calcForm">
    <section>
      <h2>Scour for information</h2>
      <input matInput formControlName="tickerToScour" />
      <button mat-button (click)="scour()">Scour</button>
      <button mat-button (click)="save()">Save</button>
    </section>

    <div class="sans-serif" [formGroup]="calcForm">
      <h2>Next Earnings</h2> {{ earningsDate }}
      <h2>Heeeeey, wait a minute. Is this part of the S&P 500??</h2>
  
      <h1 class="dark-green">{{ (isInSP500 ? 'Yup' : 'Nope!') }}</h1>
    </div>
  </div>
  `,
})
export class DetailsInsightsComponent implements OnInit {
  calcForm: FormGroup;
  earningsDate = '';
  isInSP500 = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.calcForm = this.fb.group({
      newTicker: new FormControl(''),
      ticker: new FormControl(''),
      tickerToScour: new FormControl(''),
    });
  }

  save() {
    console.log(this.calcForm.controls['ticker'].value);
    const t = this.calcForm.controls['ticker'].value;
    const body = { ticker: t, earningsDate: this.earningsDate };

    this.http
      .post(`https://BunkerBrain.jesseangelo.repl.co/update`, body)
      .subscribe(() => console.log('api called'));
  }

  isSP500(ticker) {
    // console.log(this.calcForm.controls['ticker'].value);
    this.http
      .get(`https://BunkerBrain.jesseangelo.repl.co/isSP500?ticker=${ticker}`)
      .subscribe((is) => {
        this.isInSP500 = is;
      });
  }

  scour() {
    const t = this.calcForm.controls['tickerToScour'].value;
    console.log('scouring for:', t);
    this.isSP500(t);
    this.http
      .get(`https://BunkerBrain.jesseangelo.repl.co/nextearnings?ticker=${t}`, {
        responseType: 'text',
      })
      .subscribe((e) => {
        this.earningsDate = e;
      });
  }
}
