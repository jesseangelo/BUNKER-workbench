import { ApiService } from "../../services/api.service";
import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { tap } from "rxjs";

@Component({
  selector: "research-template",
  templateUrl: `research_template.component.html`,
  styles: [
    `
      .mat-card div {
        display: flex;
        justify-content: space-between;
      }
    `,
  ],
})
export class ResearchTemplateComponent implements OnInit {
  @Input() overview;
  @Input() existingData;
  @Output() onFormGroupChange = new EventEmitter<Object>();
  calcForm: FormGroup;
  earningsDate = "";
  isInSP500 = null;
  mgmt_score = 0;
  sanity_score = 0;
  mos_score = 0;
  total_score = 0;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.calcForm = this.fb.group({
      // pre_check_group: new FormGroup({
      eval_overview: new FormControl(""),
      gr_fcf__check: new FormControl(""),
      gr_netincome_check: new FormControl(""),
      gr_revenue_check: new FormControl(""),
      gr_eps_check: new FormControl(""),
      roic_check: new FormControl(""),
      asset_check: new FormControl(""),
      case_per_share_check: new FormControl(""),
      dividend_check: new FormControl(""),
      eval_financial: new FormControl(""),

      de_check: new FormControl(""),
      cr_check: new FormControl(""),
      gro_check: new FormControl(""),
      insb_check: new FormControl(""),
      integ_check: new FormControl(""),
      margin_check: new FormControl(""),
      debt_check: new FormControl(""),
      eval_mgmt: new FormControl(""),

      pe_vs_industry_check: new FormControl(""),
      price_to_book_check: new FormControl(""),
      price_to_fcf_check: new FormControl(""),
      peg_ratio_check: new FormControl(""),
      eval_mos: new FormControl(""),
      eval_thesis: new FormControl(""),
    });

    this.calcForm.valueChanges.pipe().subscribe((t) => {
      this.onFormGroupChange.emit(t);
      this.calcMgmtScore()
      this.calcSanityScore();
      this.calcMOSScore();
      this.total_score = this.mos_score + this.mgmt_score + this.sanity_score;

    });

    // console.log('ex data', this.existingData)
    this.calcForm.patchValue(this.existingData)
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

  }

  calcMgmtScore() {
    let count = 0;
    const keys = ['de_check', 'cr_check', 'roic_check',
      'gro_check',
      'insb_check',
      'integ_check',
      'margin_check',
      'debt_check',
    ].forEach(k => {
      // console.log(k, this.calcForm.controls[k].value)
      if (this.calcForm.controls[k].value) {
        count++;
      }
    })

    this.mgmt_score = Math.round((count / 8) * 100);
  }

  calcSanityScore() {
    let count = 0;
    const keys = ['gr_fcf__check',
    'gr_netincome_check',
    'gr_revenue_check',
    'gr_eps_check',
    'roic_check',
    'asset_check',
    'case_per_share_check',
    'dividend_check',
    ].forEach(k => {
      // console.log(k, this.calcForm.controls[k].value)
      if (this.calcForm.controls[k].value) {
        count++;
      }
    })

    this.sanity_score = Math.round((count / 8) * 100);
  }

  calcMOSScore() {

    let count = 0;
    const keys = ['pe_vs_industry_check',
    'price_to_book_check',
    'price_to_fcf_check',
    'peg_ratio_check'
    ].forEach(k => {
      // console.log(k, this.calcForm.controls[k].value)
      if (this.calcForm.controls[k].value) {
        count++;
      }
    })

    this.mos_score = Math.round((count / 4) * 100);

    



  }

}
