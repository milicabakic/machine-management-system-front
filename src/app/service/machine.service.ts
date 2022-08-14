import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ErrorMessage, Machine, User} from "../model";

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  private readonly apiUrl = environment.backendApi;

  constructor(private httpClient:HttpClient) { }

  get_machines(): Observable<Machine[]> {
    return this.httpClient.get<Machine[]>(`${this.apiUrl}/api/machine`, {
      headers:  new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem("jwt"))
    });
  }

  add_machine(name: string): Observable<Machine> {
    return this.httpClient.post<Machine>(`${this.apiUrl}/api/machine`, {
      "name": name
    }, {
      headers:  new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem("jwt")),
    });
  }

  destroy_machine(machine_id: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/api/machine/${machine_id}`, {
      headers:  new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem("jwt")),
    });
  }

  get_errors(): Observable<ErrorMessage[]> {
    return this.httpClient.get<ErrorMessage[]>(`${this.apiUrl}/api/errors`, {
      headers:  new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem("jwt"))
    });
  }

  start_machine(machine_id: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/api/machine/start/${machine_id}`, {
      headers:  new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem("jwt")),
      responseType: "text"
    });
  }

  restart_machine(machine_id: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/api/machine/restart/${machine_id}`, {
      headers:  new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem("jwt")),
      responseType: "text"
    });
  }

  stop_machine(machine_id: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/api/machine/stop/${machine_id}`, {
      headers:  new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem("jwt")),
      responseType: "text"
    });
  }

  schedule_action(machine_id: number, action: string, date: Date): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/api/machine/schedule/${machine_id}`, {
      "action": action,
      "date": date
    },{
      headers:  new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem("jwt")),
      responseType: "text"
    });
  }

  search_machines(name: string, status: string, date_from: Date, date_to: Date): Observable<Machine[]> {
    return this.httpClient.post<Machine[]>(`${this.apiUrl}/api/machine/search`, {
      "name": name,
      "status": status,
      "dateFrom": date_from,
      "dateTo": date_to
    },{
      headers:  new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem("jwt")),
    });
  }
}
