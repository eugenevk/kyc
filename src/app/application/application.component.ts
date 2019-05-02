import { Application } from './application';
import { Component, Inject, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataSource } from '../application/datasource';
import { Jurisdiction } from '../jurisdiction/jurisdiction';
import { JURISDICTIONS } from '../../data/mock-jurisdictions';
import { MASMatchingResponse } from '../services/mas-matching-response';
import { MasService } from '../services/mas.service';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import { OC_Company } from '../company/oc_company';
import { Product } from '../product/product';
import { VIService } from '../services/vi.service';
import { ViyaService } from '../services/viya.service';

export interface Jurisdiction {
  code: string,
  name: string,
  country: string,
  full_name: string
}

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

  constructor (
    public dialog: MatDialog,
    private masMatchingService: MasService,
    private viService: VIService,
    private viyaService: ViyaService
  ) { }

  private application: Application = {
    id: 1,
    applicant_name: null,
    company_id: null,
    company_name: null,
    registered_address: null,
    jurisdiction_code: null,
    application_date: null,
    product_code: null,
    amount: null
  };

  private authToken: string = null;
  private errMsg: string = null;
  private jurisdiction: Jurisdiction;
  private jurisdictions: Jurisdiction[] = JURISDICTIONS.sort((j1, j2) => {
    const name1 = j1.full_name.toLowerCase();
    const name2 = j2.full_name.toLowerCase();
    if (name1 > name2) { return 1; }
    if (name1 < name2) { return -1; }
    return 0;
  });
  private masMatchingResponse: MASMatchingResponse;
  private matchFound: boolean = undefined;
  private products: Product[] = [];
  private vi_products: any[] = null;
  private rc: number = null;
  private search_mode: string;
  private search_online: boolean = true;
  private selectedJurisdiction: Jurisdiction;
  private showProgress: boolean = false;
  private source: DataSource;
  private sources: DataSource[] = [
    { key: 'oc', label: 'OpenCorporates' },
    { key: 'dnb', label: 'Dun & Bradstreet' }
  ];
  private sourceChosen: DataSource = this.sources.find(s => s.key === 'oc');
  
  @ViewChild('applicantNameInput') applicantName: ElementRef;

  apply(app: Application): void {
    console.log('Application details:', app);

    // Clear possible previous notification
    this.matchFound = undefined;
    this.showProgress = true;

    this.viyaService.getViyaToken().subscribe(
      data => {
        this.authToken = data.access_token;

        this.masMatchingService.matchAgainstSanctionsList(this.authToken, app).subscribe(
          data => {
            this.masMatchingResponse = data;
            this.matchFound = data.outputs[4].value.toLocaleLowerCase() === "true" ? true : false;
            this.rc = data.outputs[3].value > 0 ? data.outputs[3].value : null;

            // Response 200 means OK
            this.errMsg = this.rc && this.rc > 0 && this.rc !== 200 ? (this.rc === 403 ? "Maximum free API calls OpenCorporate reached" : "Unknown error for OpenCorporates API: " + this.rc) : null;
            this.showProgress = false;
    
            console.log('application.component apply() => Response from Viya matching service:', data);
          }
        )
      },
      error => {
        this.errMsg = "No access token received from Viya";

        console.error('application.component apply() => No access token received from Viya;', error)
      }
    )
  }

  clearForm(): void {
    this.application.id = 1;
    this.application.applicant_name = null;
    this.application.company_id = null;
    this.application.company_name = null;
    this.application.registered_address = null;
    this.application.jurisdiction_code = null;
    this.application.application_date = null;
    this.application.product_code = null;
    this.application.amount = null;
    this.applicantName.nativeElement.focus();
    this.errMsg = null;
    this.jurisdiction = null;
    this.matchFound = undefined;
    this.search_online = true;
    this.showProgress = false;
    this.sourceChosen = this.sources.find(s => s.key === 'oc');
  }

  compareJurFn (j1: Jurisdiction, j2: Jurisdiction): boolean {
    return j1 && j2 ? j1.code === j2.code : j1 === j2;
  }

  ngOnInit() {
    this.viyaService.getViyaToken().subscribe(
      data => {
        this.authToken = data.access_token;

        // Get all products/services defined in VI
        this.viService.getAllRecordsForEntityType(this.authToken, 'Product').subscribe(
          data => {
            // Add products to dropdown
            for (let product of data.visualizations.summary.data) {
              var new_product: Product = {
                key: product.id,
                label: product._label,
                risk_score: product.risk_score,
                amount_needed: product.amount_needed ? product.amount_needed : false
              };
              this.products.push(new_product);
            }
            console.log('Products received from VI:', data);
            console.log('Products array:', this.products);
          }
        )
      },
      error => {
        this.errMsg = "No access token received from Viya";

        console.error('application.component ngOnInit() => No access token received from Viya;', error)
      }
    )
  }

  searchCompanies(search_online: boolean, source: DataSource, application: Application): void {
    const dialogConfig = new MatDialogConfig();

    if (this.jurisdiction) {
      application.jurisdiction_code = this.jurisdiction.code;
    }

    dialogConfig.height = '80%';
    dialogConfig.width = '95%';
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      search_online,
      source,
      application
    };

    const dialogRef = this.dialog.open(CompaniesFoundDialog, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      var company: OC_Company = result ? result.company.company : null;

      if (result) {
        this.application.company_id = company.company_number;
        this.application.company_name = company.name;
        this.application.registered_address = company.registered_address_in_full;
        this.application.jurisdiction_code = company.jurisdiction_code;
        this.jurisdiction = this.jurisdictions.find((jur: any) => jur.code === company.jurisdiction_code);
      }
    });
  }
}

@Component({
  selector: 'companies-found-dialog',
  templateUrl: './companies-found-dialog.html',
})
export class CompaniesFoundDialog {

  constructor (
    public dialogRef: MatDialogRef<CompaniesFoundDialog>,
      @Inject(MAT_DIALOG_DATA) {
        search_online,
        source,
        application
      }
    ) {
      // Set parameters for dialog
      this.search_mode = search_online ? 'online' : 'offline';
      this.source_key = source.key;
      this.source_label = source.label;
      this.company = application ? application.company_name : '';
      this.jurisdiction = application ? application.jurisdiction_code : '';
  }

  private company: string;
  private company_selected: any;
  private jurisdiction: string;
  private search_mode: string;
  private source_key: string;
  private source_label: string;
  private showActionButtons: boolean = false;
  
  onSelected(selected_row: any): void {
    this.company_selected = selected_row;
  }

  onResultsReceived(records_received: boolean): void {
    this.showActionButtons = records_received;
  }

  select() {
    this.dialogRef.close({
      company: this.company_selected ? this.company_selected : null,
      message: this.company_selected ? "Company selected" : "No company selected",
      status: this.company_selected ? "OK" : "Error"
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  ngOnInit() {

  }
}
