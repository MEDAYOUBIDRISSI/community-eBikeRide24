import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

const TOTAL_PAGES = 7;
export interface User
{
    _id ?: number;
    nom?:string;
    prenom?:string;
    cne?:string;
    tel?:string;
    dateNaissance?:Date;
    adresse?:string;
    email?:string;
    password?:string;
    typeUser?:string;
    salaire?:number;
    dateEmbouche?:Date;
    etat?:boolean;
    imgProfile?:string;
}
export class NewsPost{

  typePost:string;
  post?:string;
  Images?:string[];
  user:User;
  usersTag?:User[];
  comments?:{userComment:User,comment:string}[];
  reacteds?:User[];
  affiliateDrivers?:User[];
  titlePost?:string;
  from?:string;
  to?:string;
  dateTripe?:string;
}

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  private baseURL = "http://localhost:5000";
  constructor(private httpClient: HttpClient) {}

  load(page: number, pageSize: number): Observable<NewsPost[]> {
    const startIndex = ((page - 1) % TOTAL_PAGES) * pageSize;
    const listNews=this.httpClient
    .get<NewsPost[]>(`${this.baseURL}/post/all`)
    .pipe(
      map(news => news.splice(startIndex, pageSize)),
      delay(1500),
    );
    console.log(listNews)
    return listNews
  }

  getUserAuth(_id: any): Observable<any>{
    return this.httpClient.get<User>(`${this.baseURL}/user/auth/${_id}`);
  }
  updateProfile(_id: number, User: User): Observable<any>{
    return this.httpClient.put(`${this.baseURL}/user/update?UserID=${_id}`, User);
  }

  createPost(post: NewsPost): Observable<any>{
    return this.httpClient.post(`${this.baseURL}/post/create`, post);
  }
} 
