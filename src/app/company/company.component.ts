import { Component, Input, OnInit, Output } from '@angular/core';
import { OC_Company } from './oc_company';
import { DNB_Company } from './dnb_company';
import { CompanyService } from './company.service';
import { EventEmitter } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Application } from '../application/application';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]  
})
export class CompanyComponent implements OnInit {

  constructor(
    private companyService: CompanyService
  ) { }

  @Input() company: string;
  @Input() jurisdiction: string;
  @Input() search_mode: string;
  @Input() source_key: string;

  @Output() selected_company = new EventEmitter();
  @Output() results_received = new EventEmitter();

  // private companies: Company[];
  private columnsToDisplay: string[] = ['select', 'name', 'company_number', 'jurisdiction_code', 'company_type', 'inactive', 'expandCollapse'];
  private dataSource = new MatTableDataSource();
  private expandedElement: OC_Company | null;
  private resultReceived: boolean = false;
  private selection = new SelectionModel<OC_Company>(true, []);
  private totalFound: number = null;

  getCompanies(mode: string, source_key: string, company: string, jurisdiction: string): void {
    if (source_key === 'oc') {
      this.companyService.getCompanies(mode, source_key, company, jurisdiction).subscribe(
        data => {
          this.resultReceived = true;
          this.dataSource.data = data.results.companies;
          this.totalFound = data.results.total_count;
          this.results_received.emit(true); // To be able to hide action buttons on popup dialog until records are received
        })
    } else {
      if (source_key === 'dnb') {
        this.companyService.getCompanies(mode, source_key, company, jurisdiction).subscribe(
          data => {
            var companies: DNB_Company[] = data.OrderProductResponses;

            this.resultReceived = true;
            this.dataSource.data = companies;
            this.totalFound = data.total_count;
            this.results_received.emit(true); // To be able to hide action buttons on popup dialog until records are received
            
            console.log('Company data received from ' + source_key + ' of ' + this.totalFound + ' companies (' + mode + '):', this.dataSource.data);
          })
        }
    }
  }

  ngOnInit() {
    this.getCompanies(this.search_mode, this.source_key, this.company, this.jurisdiction);
  }

  select(selected_row: any): void {
    this.selected_company.emit(selected_row);
  }
}
