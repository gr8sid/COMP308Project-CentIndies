import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from '../models/survey';
import { User } from '../models/user';
import { Answer } from '../models/answer';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private user: User;
  private authToken: any = null;

  //private endpoint = 'https://comp308-w2019-lesson10a.herokuapp.com/api/contact-list/';

  private endpoint = 'http://localhost:3000/api/take-survey/';
  private endpoint2 = 'http://localhost:3000/api/take-survey/answer-list/';

 // private endpoint = 'https://expres-portfolio-meanstack-sid.herokuapp.com/api/survey-list/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'
    })
  };

  constructor(private http: HttpClient) {
    this.user = new User();
  }

  public getAnswerList(): Observable<any> {
    return this.http.get<any>(this.endpoint2);
   }

  public addAnswer(ans: Answer, survey: Survey): Observable<any> {
    // this.loadToken();
    // this.httpOptions.headers = this.httpOptions.headers.set('Authorization', this.authToken);
    return this.http.post<any>(this.endpoint + 'add/' + survey._id, ans);
}


  // public loadToken() {
  //   const token = localStorage.getItem('id_token');
  //   this.authToken = token;
  // }


}
