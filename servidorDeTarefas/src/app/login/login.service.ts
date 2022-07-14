import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Login } from "./login";

@Injectable({
  providedIn:'root'
})

export class LoginService {
  baseUrl = 'http://127.0.0.1:8000/users/api/login'

  constructor(private http:HttpClient) {}

  login(login:Login): Observable<any> {
    return this.http.post(this.baseUrl, login)
  }
}