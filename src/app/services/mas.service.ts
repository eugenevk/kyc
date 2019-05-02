import { Application } from '../application/application';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MASMatchingResponse } from './mas-matching-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasService {

  constructor(
    private http: HttpClient
  ) { }

  private masMatchingServiceUrl: string = 'http://' + environment.SERVER_NAME + 
                                          '/microanalyticScore/modules/' + environment.MAS_MATCHING_SERVICE +
                                          '/steps/' + environment.MAS_MATCHING_STEP;

  matchAgainstSanctionsList(token: string, app: Application): Observable<MASMatchingResponse> {

    let httpHeaders = new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", "Bearer " + token)
        .set("Accept", "application/json");

    var input: any = 
        {
          "inputs": [
            {
              "name": "company_id_",
              "type": "string",
              "value": app.company_id
            },
            {
              "name": "jurisdiction_",
              "type": "string",
              "value": app.jurisdiction_code
            },
            {
              "name": "person_name_",
              "type": "string",
              "value": app.applicant_name
            }
          ]
        };
        
    return this.http.post<MASMatchingResponse>(this.masMatchingServiceUrl, input, { headers: httpHeaders });
  }
}
