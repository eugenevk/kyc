import { AppComponent } from './app.component';
import { ApplicationComponent } from './application/application.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CompaniesFoundDialog } from './application/application.component';
import { CompanyComponent } from './company/company.component';
import { CurrencyMaskModule } from '../../node_modules/ng2-currency-mask';
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from '../../node_modules/ng2-currency-mask/src/currency-mask.config';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule,
         ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule }    from '@angular/common/http';
import { JurisdictionComponent } from './jurisdiction/jurisdiction.component';
import { MatAutocompleteModule,
         MatButtonModule,
         MatButtonToggleModule,
         MatCardModule,
         MatCheckboxModule,
         MatChipsModule,
         MatDatepickerModule,
         MatDialogModule,
         MatExpansionModule,
         MatGridListModule,
         MatIconModule,
         MatInputModule,
         MatListModule,
         MatMenuModule,
         MatNativeDateModule,
         MatPaginatorModule,
         MatProgressBarModule,
         MatProgressSpinnerModule,
         MatRadioModule,
         MatRippleModule,
         MatSelectModule,
         MatSidenavModule,
         MatSliderModule,
         MatSlideToggleModule,
         MatSnackBarModule,
         MatSortModule,
         MatTableModule,
         MatTabsModule,
         MatToolbarModule,
         MatTooltipModule,
         MatStepperModule } from '@angular/material';
import { MessagesComponent } from './messages/messages.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgModule } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { MasComponent } from './mas/mas.component';

export const currencyMaskConfig: CurrencyMaskConfig = {
  align: 'left',
  allowNegative: false,
  decimal: ',',
  precision: 2,
  prefix: '€ ',
  suffix: '',
  thousands: '.'
};

@NgModule({
  declarations: [
    AppComponent,
    ApplicationComponent,
    CompaniesFoundDialog,
    CompanyComponent,
    JurisdictionComponent,
    MessagesComponent,
    ProductComponent,
    MasComponent
  ],
  entryComponents: [
    CompaniesFoundDialog
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CurrencyMaskModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    MDBBootstrapModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: CURRENCY_MASK_CONFIG,
      useValue: currencyMaskConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
