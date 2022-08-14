import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MachinesGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(localStorage.getItem("can_start_machines") == null && localStorage.getItem("can_restart_machines") == null
       && localStorage.getItem("can_stop_machines") == null){
      alert("You don't have required permission!");
      this.router.navigate(['']);
      return false;
    }

    return true;
  }

}
