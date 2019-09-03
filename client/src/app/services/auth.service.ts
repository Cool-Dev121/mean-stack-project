import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) { }

 registerUser(user){
   let headers = new HttpHeaders();
   headers.append('Content-Type', 'application/json');
   return this.http.post('http://localhost:8080/authentication/register', user, {headers: headers})
   .map(res => res);
 }

 authenticateUser(user){
   let headers = new HttpHeaders();
   headers.append('Content-type', 'application/json');
   return this.http.post('http://localhost:8080/authentication/authenticate', user, {headers: headers})
   .map(res => res);
 }

 getProfile(){
  this.loadToken();
  let headers = new HttpHeaders({
    'Content-type':  'application/json',
    'Authorization' : 'Bearer ' + this.authToken
    });
 
  console.log('authToken: ', this.authToken);
  console.log('headers: ', headers);
  return this.http.get('http://localhost:8080/authentication/profile',{headers: headers})
  .map(res => res);
  }

 storeUserData(token, user){
   localStorage.setItem('id_token', token);
   localStorage.setItem('user', JSON.stringify(user));
   this.authToken = token;
   this.user = user;
 }

 loadToken(){
   const token = localStorage.getItem('id_token');
   this.authToken = token;
 }

 loggedIn(){
   return tokenNotExpired('id_token');
 }

  logOut(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
