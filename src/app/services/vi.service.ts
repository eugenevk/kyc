import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VIService {

  constructor(
    private http: HttpClient
  ) { }

  private viSearchEntityUrl: string = 'http://' + environment.SERVER_NAME + '/svi-sand/searches';

  getAllRecordsForEntityType(token: string, entity_type: string): Observable<any> {

    let httpHeaders = new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", "Bearer " + token)
        .set("Accept", "application/json");

    var body: any = {
      "query": {
        "type": "text",
        "language": "lucene",
        "text": "+_type:" + entity_type
      },
      "visualizations": {
        "summary": {
          "type": "table",
          "start": 1,
          "limit": 100
        }
      }
    };

    return this.http.post<any>(this.viSearchEntityUrl, body, { headers: httpHeaders });
  }
}
