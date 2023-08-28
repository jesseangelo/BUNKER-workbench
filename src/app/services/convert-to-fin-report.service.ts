import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConvertToFinReportService {

  constructor() { }
  public convert(dataSub) {
    return dataSub.pipe(
      map((response: any) => {
        const mydata = []
        const current = response.annualReports[0];
        const curr_1 = response.annualReports[1]
        const curr_2 = response.annualReports[2]
        const curr_3 = response.annualReports[3]
        const curr_4 = response.annualReports[4]

        const keys = Object.keys(response.annualReports[0])

        for (let i = 0; i < keys.length; i++) {
          const d = {
            metric: Object.keys(current)[i],
            curr_4: curr_4[Object.keys(current)[i]],
            curr_3: curr_3[Object.keys(current)[i]],
            curr_2: curr_2[Object.keys(current)[i]],
            curr_1: curr_1[Object.keys(current)[i]],
            curryr: current[Object.keys(current)[i]]
          }
          mydata.push(d)
        }
        // console.log('data obj is', this.data)
        return mydata
      })
    )
  }
}
