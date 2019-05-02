import { Component, OnInit } from '@angular/core';
import { Jurisdiction } from './jurisdiction';

@Component({
  selector: 'app-jurisdiction',
  templateUrl: './jurisdiction.component.html',
  styleUrls: ['./jurisdiction.component.scss']
})

export class JurisdictionComponent implements OnInit {

  constructor() { }

  jurisdiction: Jurisdiction = {
    code: "",
    name: "",
    country: "",
    full_name: ""
  };

  ngOnInit() {
  }

}
