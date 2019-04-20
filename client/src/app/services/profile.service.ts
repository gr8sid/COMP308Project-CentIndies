import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private user: User;
  private authToken: any = null;

  //private endpoint = 'https://comp308-w2019-lesson10a.herokuapp.com/api/contact-list/';

  private endpoint = 'http://localhost:3000/api/profile-edit/';

 // private endpoint = 'https://expres-portfolio-meanstack-sid.herokuapp.com/api/project-list/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  };

  constructor(
    private http: HttpClient,
    private jwtService: JwtHelperService
  ) {
    this.user = new User();
  }

  public getUserList(): Observable<any> {
    this.loadToken();
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', this.authToken);
    return this.http.get<any>(this.endpoint, this.httpOptions);
  }

  public getUser(user: User): Observable<any> {
    this.loadToken();
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', this.authToken);
    return this.http.get<any>(this.endpoint + 'edit/' + user.id, this.httpOptions);
  }

  public editUser(user: User): Observable<any> {
    this.loadToken();
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', this.authToken);
    return this.http.post<any>(this.endpoint + 'edit/' + user.id, user, this.httpOptions);
  }

  public userDetails(user: User): Observable<any> {
    this.loadToken();
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', this.authToken);
    return this.http.post<any>(this.endpoint + 'details/' + user.id, user, this.httpOptions);
  }


  public loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
}
