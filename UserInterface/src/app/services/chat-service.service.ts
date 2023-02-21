import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:6001';

  getAllMessages(userOne: string, userTwo: string) {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('firstUser', userOne);
    httpParams = httpParams.append('secondUser', userTwo);
    return this.http.get(this.baseUrl + '/messages', { params: httpParams });
  }
}
