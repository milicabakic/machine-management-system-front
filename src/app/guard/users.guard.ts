import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {ApiService} from "../service/api.service";

@Injectable({
  providedIn: 'root'
})
export class UsersGuard implements CanActivate {

  constructor(private router: Router, private apiService: ApiService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(localStorage.getItem("can_read_users") == null){
      alert("You don't have required permission!");
      this.router.navigate(['']);
      return false;
    }

    return true;
  }

}
