import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../pages/community/components/posts/post-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private baseURL = "http://localhost:5000";

  constructor(private httpClient: HttpClient) { }

  getUserAuth(): Observable<any>{
    return this.httpClient.get<User>(`${this.baseURL}/user/auth/coki/ecommerce`);
  }

  login(Auth: User): Observable<any>{
    return this.httpClient.post(`${this.baseURL}/user/login/ecommerce`, Auth);
  }
}
