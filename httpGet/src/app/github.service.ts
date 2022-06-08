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
  getRepos(userName: string): Observable<any> {
    return this.http.get(this.baseUrl+ 'users/'+ userName+ '/repos')
  }
}
