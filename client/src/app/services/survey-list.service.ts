import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


import { Survey } from '../models/survey';
import { User } from '../models/user';
import { SurveyTitle } from '../models/surveyTitle';
@Injectable({
  providedIn: 'root'
})
export class SurveyListService {

  private user: User;
  private authToken: any = null;

  //private endpoint = 'https://comp308-w2019-lesson10a.herokuapp.com/api/contact-list/';

  private endpoint = 'https://centindies-comp308-project.herokuapp.com/api/survey-list/';
  private endpoint2 = 'https://centindies-comp308-project.herokuapp.com/api/answer-list/';
  private endpoint3 = 'https://centindies-comp308-project.herokuapp.com/api/survey-title/';

 // private endpoint = 'https://expres-portfolio-meanstack-sid.herokuapp.com/api/survey-list/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  };

  constructor(private http: HttpClient) {
    this.user = new User();
  }

  public getSurveyList(): Observable<any> {
    return this.http.get<any>(this.endpoint, this.httpOptions);
  }

  public getAnswerList(): Observable<any> {
   return this.http.get<any>(this.endpoint2, this.httpOptions);
  }

  public getMySurvey(username: string): Observable<any> {
    this.loadToken();
    return this.http.get<any>(this.endpoint + username, this.httpOptions);
  }

  public addSurvey(survey: Survey): Observable<any> {
    return this.http.post<any>(this.endpoint + 'add', survey, this.httpOptions);
  }

  public getSurvey(survey: Survey): Observable<any> {

    return this.http.get<any>(this.endpoint + 'edit/' + survey._id, this.httpOptions);
  }

  public editSurvey(survey: Survey): Observable<any> {
    this.loadToken();
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', this.authToken);
    return this.http.post<any>(this.endpoint + 'edit/' + survey._id, survey, this.httpOptions);
  }

  public surveyDetails(survey: Survey): Observable<any> {
    this.loadToken();
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', this.authToken);
    return this.http.post<any>(this.endpoint + 'details/' + survey._id, survey, this.httpOptions);
  }

  public deleteSurvey(survey: Survey): Observable<any> {
    this.loadToken();
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', this.authToken);
    return this.http.get<any>(this.endpoint + 'delete/' + survey._id, this.httpOptions);
  }

  public getSurveyTitleList(): Observable<any> {
    this.loadToken();
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', this.authToken);
    return this.http.get<any>(this.endpoint3, this.httpOptions);
   }
  public addSurveyTitle(surveyTitle: SurveyTitle): Observable<any> {
    this.loadToken();
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', this.authToken);
    return this.http.post<any>(this.endpoint3 + 'add', surveyTitle, this.httpOptions);
  }

  public loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

}
