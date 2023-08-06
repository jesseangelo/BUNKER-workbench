import { Component, OnInit } from '@angular/core';
import { ApiService } from "./services/api.service";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  apiIsConnected = false;
  
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.isAlive().subscribe((connected: boolean) => {
      this.apiIsConnected = connected ? 'Connected' : 'Disconnected';
    }
  }
}
