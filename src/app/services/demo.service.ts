import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DemoService {
  apiUrl: string;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });;


  constructor(private http: HttpClient) {
    this.apiUrl = "https://jsonplaceholder.typicode.com";
  }

  getUserList() {
    return this.http.get<any>(this.apiUrl + `/users`, { headers: this.headers });
  }

}
