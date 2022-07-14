import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject, Subject } from "rxjs";

import { Task } from "./task";

@Injectable({providedIn:'root'})
export class TaskService{
  baseUrl = 'http://127.0.0.1:8000/tasks/api'

  constructor(private http:HttpClient) {}
   headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set("Authorization",`Token ${localStorage['token']}`)

  postTask(addTask:Task){
    return this.http.post(this.baseUrl, addTask, {'headers':this.headers})
  }

  getAllTask(): Observable<any> {
    return this.http.get(this.baseUrl, {headers:this.headers})
  }

  getTask(id:number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}/`, {'headers':this.headers})
  }

  patchTask(id: number, patackTask:Task) {
    return this.http.patch(`${this.baseUrl}/${id}/`,patackTask,{'headers':this.headers})
  }

  deleteTask(id:number) {
    return this.http.delete(`${this.baseUrl}/${id}/`, {'headers':this.headers});
  }
}

