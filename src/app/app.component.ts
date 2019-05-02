import { Component, Output } from '@angular/core';
import { ViyaService } from './services/viya.service';
import { ViyaResponse } from './services/viya-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor (
    private viyaService: ViyaService
  ) { }
  
  private title: string = 'Welcome to ACME Bank';
  private viyaConnection: string = "Disconnected";
  private viyaResponse: ViyaResponse;

  ngOnInit(): void {
    // Test Viya connection with RACE image
    this.viyaService.getViyaToken().subscribe(
      data => {
        this.viyaResponse = data;
        console.log('Response from Viya:', data);
        this.viyaConnection = data ? "Connected" : "Disconnected";
      }
    )
  }
}
