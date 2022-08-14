import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {JWT, Permission, User} from "../model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly apiUrl = environment.backendApi;
  private username: string;
  private permissions: string[];
  private userToUpdate: User;

  constructor(private httpClient:HttpClient) {
    this.username = "";
    this.permissions = [];
    this.userToUpdate = {} as User;
  }

  login(username: string, password: string): Observable<JWT> {
    return this.httpClient.post<JWT>(`${this.apiUrl}/auth/login`,{
      "username":username,
      "password":password
    });
  }

  get_users(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/api/user`, {
      headers:  new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem("jwt"))
    });
  }

  add_user(username: string, password: string, name: string, surname: string): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}/api/user`, {
      "username": username,
      "password": password,
      "name": name,
      "surname": surname
    }, {
      headers:  new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem("jwt")),
    });
  }

  delete_user(user_id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/api/user/${user_id}`, {
      headers:  new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem("jwt")),
    });
  }

  update_user(id: number, username: string, name: string, surname: string): Observable<string>{
    return this.httpClient.put<string>(`${this.apiUrl}/api/user`, {
      "id": id,
      "username": username,
      "name": name,
      "surname": surname
    }, {
      headers:  new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem("jwt")),
    });
  }

  add_permissions(username: string, permissions: string[]): Observable<string> {
    return this.httpClient.post<string>(`${this.apiUrl}/api/user/perm/all`, {
      "username": username,
      "permissions": permissions
    },{
      headers:  new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem("jwt"))
    });
  }

  get_permissions(username: string): Observable<Permission[]> {
    return this.httpClient.get<Permission[]>(`${this.apiUrl}/api/user/perm/${username}`,{
      headers:  new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem("jwt"))
    });
  }

  setUsername(username: string): void {
    this.username = username;
  }

  getUsername(): string {
    return this.username;
  }

  setPermissions(permToSet: Permission[]): void {
    permToSet.forEach(p => {
      localStorage.setItem(p.name, "true");
    });
  }

  getPermissions(): string[]{
    return this.permissions;
  }

  setUserToUpdate(user: User): void {
    this.userToUpdate = user;
  }

  getUserToUpdate(): User {
    return this.userToUpdate;
  }
}
