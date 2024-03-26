import { Component, OnInit } from '@angular/core';
import { repeat } from 'rxjs';
import { ApiService } from './services/api.service';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'bnkr-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  apiIsConnected = '';
  loading$ = this.loader.loading$;
  activeLink = '/portfolio-watchlist';

  constructor(private api: ApiService, public loader: LoadingService) {}

  ngOnInit() {
    this.api
      .isAlive()
      .pipe(repeat({ delay: 100000 }))
      .subscribe((connected: boolean) => {
        // console.log("con", connected);
        this.apiIsConnected = connected ? 'Connected' : 'Disconnected';
      });
  }
}
