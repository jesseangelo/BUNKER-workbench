import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'portfolio-watchlist',
  template: `
  <div class="ma3 sans-serif" [formGroup]="calcForm">
    <section>
      <h2>Companies</h2>
      Get All 
      <button (click)="getCompanies()">GET</button>
      <br />
      <input formControlName="newTicker" />
      <button (click)="apiTest()">ADD</button>
    </section>
    <section> 
      <div *ngFor="let t of companies">
      <mat-expansion-panel hideToggle>
        <mat-expansion-panel-header>
          <mat-panel-title>
          {{t.ticker}}
          </mat-panel-title>
          <mat-panel-description>
            This is a summary of the content
          </mat-panel-description>
        </mat-expansion-panel-header>
        <p>This is the primary content of the panel.</p>
      </mat-expansion-panel>
      </div>
    </section>
  </div>
  `,
})
export class PortfolioWatchlistComponent implements OnInit {
  calcForm: FormGroup;

  companies = [];
  earningsDate = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.calcForm = this.fb.group({
      newTicker: new FormControl(''),
    });
  }

  apiTest() {
    console.log(this.calcForm.controls['newTicker'].value);
    const t = this.calcForm.controls['newTicker'].value;
    this.companies.push({ ticker: t });
    const body = this.companies;

    this.http
      .post(
        `https://BunkerBrain.jesseangelo.repl.co/update?
        ticker`,
        body
      )
      .subscribe(() => console.log('api called'));
  }

  getCompanies() {
    this.http
      .get(`https://BunkerBrain.jesseangelo.repl.co/companies`)
      .subscribe((c: any) => {
        this.companies = c;
        console.log(this.companies);
      });
  }
}
