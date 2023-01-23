import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from  '@angular/common/http';
import * as puppeteer from 'puppeteer';
// import puppeteer from 'puppeteer/lib/esm/puppeteer/puppeteer';
// import puppeteer from 'puppeteer/lib/cjs/puppeteer/puppeteer';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  calcForm;
  currentCostBasis;

  moreShares;
  atNewPrice;
  finalCostBasis;

  newSpend;
  newCostBasis;

  constructor(private fb: FormBuilder, private http: HttpClient ) {}

  ngOnInit() {
    // this.pup()
    this.calcForm = this.fb.group({
      shares: new FormControl(''),
      atCost: new FormControl(''),
      moreShares: new FormControl(''),
      atNewPrice: new FormControl(''),
      ticker: new FormControl('')
    });

    this.calcForm.valueChanges.subscribe((vals) => {
      this.currentCostBasis = +vals.atCost * +vals.shares;
      // console.log('vals are ', vals);

      const allShares = +vals.shares + +vals.moreShares;
      this.newSpend = +vals.moreShares * +vals.atNewPrice;
      const allPrice = this.currentCostBasis + this.newSpend;

      this.newCostBasis = allPrice / allShares;

      // 10 * 5 = 50
      // 10 * 7 = 70
      // 20 @ 120
      // 120 / 20 = 6
    });
  }

  apiTest() {
    this.http.get('https://BunkerBrain.jesseangelo.repl.co').subscribe(console.log);
  }

  async pup() {
  //async pup() {
    await console.log('ppmop')
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    // await page.goto("https://roic.ai/company/EPAM");
    // // await page.screenshot({path: 'testpngshot.png'})
    // const ttm_roic = await page.evaluate(() => {
    //     return Array.from(document.querySelectorAll("div.flex:nth-child(22) > div:nth-child(2) > div:nth-child(17)")).map(x => x.textContent)
    // })
    // console.log(ttm_roic)

    // await browser.close();
  }
}
