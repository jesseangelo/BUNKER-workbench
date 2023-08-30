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
  @Output() onFormGroupChange = new EventEmitter<Object>();
  calcForm: FormGroup;
  earningsDate = "";
  isInSP500 = null;
  mgmt_score = 0;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.calcForm = this.fb.group({
      // pre_check_group: new FormGroup({
      eval_overview: new FormControl(""),
      gr_fcf__check: new FormControl(""),
      gr_netincome_check: new FormControl(""),
      gr_revenue_check: new FormControl(""),
      gr_eps_check: new FormControl(""),
      _check: new FormControl(""),
      roic_check: new FormControl(""),
      asset_check: new FormControl(""),
      case_per_share_check: new FormControl(""),
      divident_check: new FormControl(""),
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
      
      
      // let total = 0;
      // let count = 0;
      // for (const [key, value] of Object.entries(t)) {
      //   total++;
      //   value == true ? count++ : null;
      //   // console.log(`${key}: ${value}`);
      // }
      // this.mgmt_score = Math.round((count / total) * 100);
    });
  }
}
