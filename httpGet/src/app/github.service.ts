import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

import {map, catchError} from 'rxjs/operators'

import { Repos } from "./repos";

@Injectable({
  providedIn:'root'
})
export class GitHubService {
  baseUrl: string = "https://api.github.com/";

  constructor(private http: HttpClient) {};

  getRepos(userName: string, PageOn:string, SortOn:string): Observable<any> {
    const params = new HttpParams()
    .set('page', PageOn)
    .set('sort', SortOn);

    console.log(params.toString());

    return this.http.get(this.baseUrl+ 'users/'+ userName+ '/repos', {params:params})
  }
}
