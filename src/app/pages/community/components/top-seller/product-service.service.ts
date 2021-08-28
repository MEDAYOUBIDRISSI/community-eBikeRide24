import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private baseURL = "http://localhost:5000";
  constructor(private httpClient: HttpClient) {}

  getTopSeller(): Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.baseURL}/statistic/ProductSalesForPublication`);
  }

  getPlayers(): Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.baseURL}/statistic/getPlayers`);
  }
}
