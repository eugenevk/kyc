import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';
import { ViyaResponse } from './viya-response';

@Injectable({
  providedIn: 'root'
})

export class ViyaService implements OnInit {

  constructor(
    private http: HttpClient
  ) { }

  private getAuthTokenUrl: string = 'http://' + environment.SERVER_NAME + '/SASLogon/oauth/token';

  getViyaToken(): Observable<ViyaResponse> {
    let httpHeaders = new HttpHeaders()
        .set("Content-Type", "application/x-www-form-urlencoded")
        // .set("Authorization", "Basic a3ljOk9yaW9uMTIz")
        .set("Authorization", "Basic " + btoa(environment.GET_AUTH_TOKEN_USERNAME + ":" + environment.GET_AUTH_TOKEN_PASSWORD))
        .set("Accept", "application/json");

    let httpParams = new HttpParams()
        .set('grant_type', environment.GRANT_TYPE)
        .set('username', environment.USER_NAME)
        .set('password', environment.PASSWORD);

    return this.http.get<ViyaResponse>(this.getAuthTokenUrl, { headers: httpHeaders, params: httpParams });
  }

  ngOnInit() {
  }
}
