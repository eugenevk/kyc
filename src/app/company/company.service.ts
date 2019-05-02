import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private http: HttpClient
  ) { }

  private getCompaniesUrl: string;

  getCompanies(mode: string, source_key: string, company_search_name: string, jurisdiction_search_code: string): Observable<any> {
    if (mode === 'offline') {
      if (source_key === 'oc') {
        return this.http.get("../../assets/companies_found_oc.json");
      } else {
        if (source_key === 'dnb') {
          return this.http.get("../../assets/companies_found_dnb.json");
        }
      }
    } else {
      if (source_key === 'oc') {
        this.getCompaniesUrl = 'https://' + environment.OC_URL + '/companies/search?q=' + company_search_name + (jurisdiction_search_code ? '&jurisdiction_code=' + jurisdiction_search_code : '');
        
        console.log('Url=', this.getCompaniesUrl);

        return this.http.get(this.getCompaniesUrl)
      }
    }
  }
}
