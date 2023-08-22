import { ApiService } from "../../services/api.service";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "research-template",
  templateUrl: `research_template.component.html`,
})
export class ResearchTemplateComponent implements OnInit {
  calcForm: FormGroup;
  earningsDate = "";
  isInSP500 = null;
  overview = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private api: ApiService
  ) { }

  ngOnInit() {
    // this.calcForm = this.fb.group({
    //   tickerToScour: new FormControl(""),
    // });
  }

  save() {
    // console.log(this.calcForm.controls["tickerToScour"].value);
    // const t = this.calcForm.controls["tickerToScour"].value;
    // const body = { ticker: t, earningsDate: this.earningsDate };

    // this.http
    //   .post(`${this.api.endPoint}/update`, body)
    //   .subscribe(() => console.log("api called"));
  }

  scour() {
    // const t = this.calcForm.controls["tickerToScour"].value;
    // console.log("scouring for:", t);
    // this.api.getCompanyOverview(t).subscribe((co: any) => {
    //   this.overview = co;
    // });

    // this.api.isSP500(t).subscribe((is: any) => {
    //   this.isInSP500 = is;
    // });

    // this.api.nextEarningsDate(t).subscribe((e: any) => {
    //   this.earningsDate = e;
    // });
  }
}
