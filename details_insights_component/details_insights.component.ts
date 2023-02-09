import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'details-insights',
  template: `Details Insights
  What


  <section>
    <h2>Scour for information</h2>
    <input formControlName="tickerToScour" />
    <button (click)="scour()">Scour</button>
    
  </section>

  <div class="ma3 sans-serif" [formGroup]="calcForm">
    <h2>Next Earnings</h2>
    {{ earningsDate }}
    <h2>Heeeeey, wait a minute. Is this part of the S&P 500??</h2>
    Ticker
   {{ isInSP500 }}
 
  </div>
  `,
})
export class DetailsInsightsComponent implements OnInit {
  calcForm: FormGroup;
  earningsDate = ''
  isInSP500 = null


  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.calcForm = this.fb.group({
      newTicker: new FormControl(''),
      ticker: new FormControl(''),
      tickerToScour: new FormControl('')
    });
  }

  isSP500(ticker) {
    // console.log(this.calcForm.controls['ticker'].value);
    this.http
      .get(
        `https://BunkerBrain.jesseangelo.repl.co/isSP500?ticker=${ticker}`
      )
      .subscribe((is) => {
        this.isInSP500 = is;
      });
  }

  scour() {
    const t = this.calcForm.controls['tickerToScour'].value;
    console.log('scouring for:', t)
    this.isInSP500(t)
    this.http.get(
      `https://BunkerBrain.jesseangelo.repl.co/nextearnings?ticker=${t}`, {responseType: 'text'}
      )
      .subscribe((e) => {
        this.earningsDate = e
      });

  }
}